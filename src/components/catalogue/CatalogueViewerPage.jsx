import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import pdfjsLib from "../../pdfWorker";
import CatalogueControls from "./CatalogueControls";
import CatalogueThumbnailsPanel from "./CatalogueThumbnailsPanel";
import { RxCross2 } from "react-icons/rx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const PDF_URL = "/pdfs/lp-cat_repaired.pdf";

const CatalogueViewerPage = () => {
  const pageCache = useRef(new Map());
  const [prepProgress, setPrepProgress] = useState(0);
  const [viewMode, setViewMode] = useState("spread");

  const renderPageToCache = async (page, scale = 1) => {
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: ctx,
      viewport,
    }).promise;

    return canvas;
  };

  const leftCanvasRef = useRef(null);
  const rightCanvasRef = useRef(null);
  const rightPageWrapperRef = useRef(null);

  const leftRenderTask = useRef(null);
  const rightRenderTask = useRef(null);
  const containerRef = useRef(null);

  const [pdf, setPdf] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loadedMB, setLoadedMB] = useState(0);
  const [totalMB, setTotalMB] = useState(0);
  const [ready, setReady] = useState(false);
  const [direction, setDirection] = useState("next");

  const toMB = (b) => (b / (1024 * 1024)).toFixed(1);

  // CONTROLS USESTATES
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  const [showThumbnails, setShowThumbnails] = useState(false);

  const downloadPDF = async (url, onProgress) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch PDF");

    const total = Number(res.headers.get("Content-Length"));
    let loaded = 0;

    const reader = res.body.getReader();
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      loaded += value.length;

      onProgress(loaded, total);
    }

    // Merge chunks
    const pdfBytes = new Uint8Array(loaded);
    let offset = 0;

    for (const chunk of chunks) {
      pdfBytes.set(chunk, offset);
      offset += chunk.length;
    }

    return pdfBytes;
  };

  /* ================= LOAD PDF ================= */
  useEffect(() => {
    let cancelled = false;

    const loadPDF = async () => {
      try {
        const pdfBytes = await downloadPDF(PDF_URL, (loaded, total) => {
          if (cancelled || !total) return;

          setLoadedMB((loaded / 1024 / 1024).toFixed(1));
          setTotalMB((total / 1024 / 1024).toFixed(1));
        });

        if (cancelled) return;

        const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
        const doc = await loadingTask.promise;

        if (cancelled) return;

        setPdf(doc);
        setTotalPages(doc.numPages);

        // 🔥 STAGE 1: WARM UP pdf.js (page 1 ONLY)
        const warmPage = await doc.getPage(1);
        await renderPageToCache(warmPage, 1);
        pageCache.current.set(1, warmPage);

        // Allow UI to update
        await new Promise((r) => setTimeout(r, 50));

        // 🔥 STAGE 2: REAL PROGRESS RENDER
        for (let i = 2; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const bitmap = await renderPageToCache(page, 1);
          pageCache.current.set(i, bitmap);

          setPrepProgress(i);

          // Yield so loader updates smoothly
          await new Promise((r) => setTimeout(r, 16));
        }

        setReady(true);

        if (cancelled) return;
        setReady(true); // ✅ hides loader
      } catch (err) {
        console.error("PDF load failed", err);
      }
    };

    loadPDF();

    return () => {
      cancelled = true;
    };
  }, []);
  const hasRightPage = viewMode === "spread" && pageIndex + 1 <= totalPages;

  /* ================= RENDER PAGE PAIR ================= */
  useEffect(() => {
    if (!pdf || !ready) return;

    const renderPage = async (
      pageNum,
      canvasRef,
      taskRef,
      maxWidthRatio = 0.45,
    ) => {
      if (!canvasRef.current) return;

      if (taskRef.current) {
        try {
          taskRef.current.cancel();
        } catch {}
      }

      const page = await pdf.getPage(pageNum);

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      // Limits
      const maxWidth = containerWidth * maxWidthRatio;
      const maxHeight = containerHeight * 0.8; // IMPORTANT

      const viewport = page.getViewport({ scale: 1 });

      const scale =
        Math.min(maxWidth / viewport.width, maxHeight / viewport.height) *
        scaleMultiplier;

      const scaledViewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      taskRef.current = page.render({
        canvasContext: ctx,
        viewport: scaledViewport,
      });
    };

    // SINGLE PAGE MODE
    if (viewMode === "single") {
      renderPage(pageIndex, leftCanvasRef, leftRenderTask, 0.6);
      return;
    }

    // SPREAD MODE
    // spread mode
    renderPage(pageIndex, leftCanvasRef, leftRenderTask, 0.45);

    if (pageIndex + 1 <= totalPages) {
      renderPage(pageIndex + 1, rightCanvasRef, rightRenderTask, 0.45);
    }

    renderPage(pageIndex, leftCanvasRef, leftRenderTask, 0.45);

    if (hasRightPage) {
      renderPage(pageIndex + 1, rightCanvasRef, rightRenderTask, 0.45);
    }
  }, [pdf, pageIndex, ready, totalPages, viewMode]);

  useEffect(() => {
    if (viewMode === "single" && rightCanvasRef.current) {
      const ctx = rightCanvasRef.current.getContext("2d");
      ctx &&
        ctx.clearRect(
          0,
          0,
          rightCanvasRef.current.width,
          rightCanvasRef.current.height,
        );
    }
  }, [viewMode]);

  useEffect(() => {
    if (viewMode !== "spread") return;

    setPageIndex((p) => {
      // page 1 is allowed
      if (p === 1) return 1;

      // force LEFT page
      return p % 2 === 0 ? p - 1 : p;
    });
  }, [viewMode]);

  const animatePageFlipNext = (onComplete) => {
    const page = rightPageWrapperRef.current;
    if (!page) return;

    gsap.killTweensOf(page);

    // reset
    gsap.set(page, {
      transformOrigin: "center center",
      rotationY: 0,
      x: 0,
      zIndex: 20,
    });

    gsap.to(page, {
      rotationY: -180,
      x: "-100%", // 👈 THIS makes it land on left page
      duration: 0.9,
      ease: "power2.inOut",
      onComplete,
    });
  };

  /* ================= NAV ================= */
  const next = () => {
    setDirection("next");

    setPageIndex((p) => {
      if (viewMode === "single") {
        return Math.min(p + 1, totalPages);
      }

      // spread mode
      if (p === 1) return 3;

      const nextPage = p + 2;
      return nextPage <= totalPages ? nextPage : p;
    });
  };

  const prev = () => {
    setDirection("prev");

    setPageIndex((p) => {
      if (viewMode === "single") {
        return Math.max(p - 1, 1);
      }

      // spread mode
      if (p <= 3) return 1;

      return p - 2;
    });
  };

  useEffect(() => {
    const handleKey = (e) => {
      // Prevent conflict when typing in input
      if (
        document.activeElement &&
        document.activeElement.tagName === "INPUT"
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        next();
      }

      if (e.key === "ArrowLeft") {
        prev();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [next, prev]);

  const jumpToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    if (page === 1) {
      setPageIndex(1);
      return;
    }

    // make it spread-safe (even page)
    setPageIndex(page % 2 === 0 ? page : page - 1);
  };

  return (
    <div className="fixed inset-0 top-16 bg-neutral-300 flex flex-col">
      {/* ================= LOADER ================= */}
      {!ready && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-neutral-200">
          <p className="mb-2 text-sm">Loading catalogue</p>
          {/* <p className="text-lg">
            {loadedMB} / {totalMB} MB
          </p> */}
          <p className="text-sm text-center">
            Please wait... <br />
            Preparing pages {prepProgress} / {totalPages}
          </p>

          <div className="w-64 h-[2px] bg-neutral-300 mt-4">
            <div
              className="h-full bg-black transition-all"
              style={{
                width: totalMB ? `${(prepProgress / totalPages) * 100}%` : "0%",
              }}
            />
          </div>
        </div>
      )}

      {/* ================= TOP BAR ================= */}
      <div className="h-12 flex items-center justify-end px-4 text-lg">
        {/* <span>
          {pageIndex} – {Math.min(pageIndex + 1, totalPages)} / {totalPages}
        </span> */}
        <button onClick={() => window.close()}>
          <RxCross2 className="text-black text-3xl cursor-pointer" />
        </button>
      </div>

      {/* ================= BOOK VIEW ================= */}
      <div
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center perspective-[1800px]"
      >
        {/* PREV */}
        <button
          onClick={prev}
          className="absolute left-6 bottom-1/2 text-[40px] text-black/50 hover:text-black"
        >
          <FaAngleLeft />
        </button>

        {/* BOOK */}
        {viewMode === "single" ? (
          <canvas ref={leftCanvasRef} className="bg-white shadow-2xl" />
        ) : (
          <div className="relative flex gap-1">
    {/* LEFT PAGE (always exists) */}
    <canvas
      ref={leftCanvasRef}
      className="bg-white shadow-2xl"
    />

    {/* RIGHT PAGE (ONLY if it exists) */}
    {hasRightPage && (
      <div className="relative bg-white shadow-2xl">
        <canvas ref={rightCanvasRef} />
      </div>
    )}
  </div>
        )}

        {/* NEXT */}
        <button
          onClick={next}
          className="absolute right-6 bottom-1/2 text-[40px] text-black/50 hover:text-black"
        >
          <FaAngleRight />
        </button>
      </div>
      <CatalogueControls
        pageIndex={pageIndex}
        totalPages={totalPages}
        onJumpToPage={jumpToPage}
        onNext={next}
        onPrev={prev}
        onToggleGrid={() => setShowThumbnails((v) => !v)}
        viewMode={viewMode}
        onToggleViewMode={() =>
          setViewMode((m) => (m === "single" ? "spread" : "single"))
        }
      />

      <CatalogueThumbnailsPanel
        pdf={pdf}
        totalPages={totalPages}
        currentPage={pageIndex}
        isOpen={showThumbnails}
        onSelectPage={(p) => {
          jumpToPage(p);
        }}
        onClose={() => setShowThumbnails(false)}
      />
    </div>
  );
};

export default CatalogueViewerPage;
