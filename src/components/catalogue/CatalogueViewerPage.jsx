import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import pdfjsLib from "../../pdfWorker";
import CatalogueControls from "./CatalogueControls";
import CatalogueThumbnailsPanel from "./CatalogueThumbnailsPanel";
import { RxCross2 } from "react-icons/rx";

const PDF_URL = "/pdfs/lp-cat_repaired.pdf";

const CatalogueViewerPage = () => {
  const pageCache = useRef(new Map());
  const [prepProgress, setPrepProgress] = useState(0);
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

  const preRenderAllPages = async (doc) => {
    const CACHE_SCALE = 1; // 👈 balance quality vs memory

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);

      const bitmap = await renderPageToCache(page, CACHE_SCALE);

      pageCache.current.set(i, bitmap);

      setPrepProgress(i);

      // 🔥 yield to browser (prevents freeze)
      await new Promise((r) => requestAnimationFrame(r));
    }
  };

  const leftCanvasRef = useRef(null);
  const rightCanvasRef = useRef(null);

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

      const zoomIn = () => setScaleMultiplier((s) => Math.min(s + 0.1, 2));

      const zoomOut = () => setScaleMultiplier((s) => Math.max(s - 0.1, 0.6));

      const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      };

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

    // COVER PAGE (single)
    if (pageIndex === 1) {
      renderPage(1, leftCanvasRef, leftRenderTask, 0.6);
      return;
    }

    // SPREAD PAGES
    renderPage(pageIndex, leftCanvasRef, leftRenderTask, 0.45);

    if (pageIndex + 1 <= totalPages) {
      renderPage(pageIndex + 1, rightCanvasRef, rightRenderTask, 0.45);
    }
  }, [pdf, pageIndex, ready, totalPages]);

  /* ================= NAV ================= */
  const next = () => {
    if (pageIndex === 1) {
      setDirection("next");
      setPageIndex(2);
      return;
    }

    if (pageIndex + 2 <= totalPages) {
      setDirection("next");
      setPageIndex((p) => p + 2);
    }
  };

  const prev = () => {
    if (pageIndex === 2) {
      setDirection("prev");
      setPageIndex(1);
      return;
    }

    if (pageIndex - 2 >= 1) {
      setDirection("prev");
      setPageIndex((p) => p - 2);
    }
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
          <p className="text-lg">
            {loadedMB} / {totalMB} MB
          </p>
          <p className="text-sm text-center">
            Please wait... <br />
            Preparing pages {prepProgress} / {totalPages}
          </p>

          <div className="w-64 h-[2px] bg-neutral-300 mt-4">
            <div
              className="h-full bg-black transition-all"
              style={{
                width: totalMB ? `${(loadedMB / totalMB) * 100}%` : "0%",
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
        <button onClick={() => window.close()}><RxCross2 className="text-black text-3xl cursor-pointer"/></button>
      </div>

      {/* ================= BOOK VIEW ================= */}
      <div
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center perspective-[1800px]"
      >
        {/* PREV */}
        <button
          onClick={prev}
          className="absolute left-6 bottom-1/2 text-7xl text-black/50 hover:text-black"
        >
          
        </button>

        {/* BOOK */}
        {pageIndex === 1 ? (
          /* COVER */
          <canvas ref={leftCanvasRef} className="bg-white shadow-2xl" />
        ) : (
          /* SPREAD */
          <div className="relative flex gap-4">
            <canvas ref={leftCanvasRef} className="bg-white shadow-2xl" />

            <motion.div
              key={pageIndex}
              initial={{
                rotateY: direction === "next" ? 90 : -90,
              }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{
                transformOrigin:
                  direction === "next" ? "left center" : "right center",
              }}
              className="bg-white shadow-2xl"
            >
              <canvas ref={rightCanvasRef} />
            </motion.div>
          </div>
        )}

        {/* NEXT */}
        <button
          onClick={next}
          className="absolute right-6 bottom-1/2 text-7xl text-black/50 hover:text-black"
        >
          ›
        </button>
      </div>
      <CatalogueControls
        pageIndex={pageIndex}
        totalPages={totalPages}
        onJumpToPage={jumpToPage}
        onNext={next}
        onPrev={prev}
        onToggleGrid={() => setShowThumbnails((v) => !v)}
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
