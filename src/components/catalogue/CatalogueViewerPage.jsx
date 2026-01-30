import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import pdfjsLib from "../../pdfWorker";
import CatalogueControls from "./CatalogueControls";

const PDF_URL = "/pdfs/lp-cat_repaired.pdf";

const CatalogueViewerPage = () => {
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

  /* ================= LOAD PDF ================= */
  useEffect(() => {
    const task = pdfjsLib.getDocument({
      url: PDF_URL,
      onProgress: ({ loaded, total }) => {
        if (total) {
          setLoadedMB(toMB(loaded));
          setTotalMB(toMB(total));
        }
      },
    });

    task.promise.then((doc) => {
      setPdf(doc);
      setTotalPages(doc.numPages);
      setTimeout(() => setReady(true), 300);
    });
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

      const scale = Math.min(
        maxWidth / viewport.width,
        maxHeight / viewport.height,
      );

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

  return (
    <div className="fixed inset-0 top-16 bg-neutral-300 flex flex-col">
      {/* ================= LOADER ================= */}
      {!ready && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-neutral-200">
          <p className="mb-2 text-sm">Loading catalogue</p>
          <p className="text-lg">
            {loadedMB} / {totalMB} MB
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
      <div className="h-12 bg-neutral-200 flex items-center justify-between px-4 text-xs">
        <span>
          {pageIndex} – {Math.min(pageIndex + 1, totalPages)} / {totalPages}
        </span>
        <button onClick={() => window.close()}>✕</button>
      </div>

      {/* ================= BOOK VIEW ================= */}
      <div
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center perspective-[1800px]"
      >
        {/* PREV */}
        <button
          onClick={prev}
          className="absolute left-6 text-5xl text-black/50 hover:text-black"
        >
          ‹
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
          className="absolute right-6 text-5xl text-black/50 hover:text-black"
        >
          ›
        </button>
      </div>
      <CatalogueControls />
    </div>
  );
};

export default CatalogueViewerPage;
