import { useEffect, useRef } from "react";

const CatalogueThumbnailsPanel = ({
  pdf,
  totalPages,
  currentPage,
  onSelectPage,
  onClose,
  isOpen,
}) => {
  const listRef = useRef(null);
  const initializedRef = useRef(false);
  const renderedPagesRef = useRef(new Set());

  /* ================= CREATE SKELETONS ONCE ================= */
  useEffect(() => {
    if (!pdf || initializedRef.current) return;
    initializedRef.current = true;

    listRef.current.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const wrapper = document.createElement("div");
      wrapper.className = "flex flex-col items-center gap-1";

      const skeleton = document.createElement("div");
      skeleton.className = "thumb-skeleton w-[120px] h-[160px] rounded shadow";
      skeleton.dataset.page = i;

      const label = document.createElement("span");
      label.className = "text-[10px] text-gray-400";
      label.innerText = i;

      wrapper.appendChild(skeleton);
      wrapper.appendChild(label);
      listRef.current.appendChild(wrapper);
    }
  }, [pdf, totalPages]);

  /* ================= RENDER EACH THUMB ONLY ONCE ================= */
  useEffect(() => {
    if (!pdf) return;

    const renderThumb = async (pageNum) => {
      // 🔒 HARD GUARD
      if (renderedPagesRef.current.has(pageNum)) return;
      renderedPagesRef.current.add(pageNum);

      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 0.18 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      canvas.dataset.page = pageNum;
      canvas.className =
        "bg-white shadow cursor-pointer border border-transparent transition";

      canvas.onclick = () => onSelectPage(pageNum);

      const wrapper = listRef.current.children[pageNum - 1];
      const skeleton = wrapper.querySelector(".thumb-skeleton");

      // skeleton may already be replaced
      if (skeleton) skeleton.replaceWith(canvas);
    };

    // fire-and-forget, no await
    for (let i = 1; i <= totalPages; i++) {
      renderThumb(i);
    }
  }, [pdf, totalPages, onSelectPage]);

  /* ================= ACTIVE BORDER + AUTO SCROLL ================= */
  useEffect(() => {
    if (!listRef.current) return;

    listRef.current.querySelectorAll("canvas").forEach((canvas) => {
      const pageNum = Number(canvas.dataset.page);

      if (pageNum === currentPage || pageNum === currentPage + 1) {
        canvas.classList.add("border-black");
        canvas.classList.remove("border-transparent");

        canvas.parentElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      } else {
        canvas.classList.remove("border-black");
        canvas.classList.add("border-transparent");
      }
    });
  }, [currentPage]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const forwardWheel = (e) => {
      list.scrollTop += e.deltaY;
    };

    list.addEventListener("wheel", forwardWheel, { passive: true });

    return () => {
      list.removeEventListener("wheel", forwardWheel);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-y-0 left-0 top-16 z-40 w-64 bg-neutral-100 border-r shadow-lg
  flex flex-col transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      aria-hidden={!isOpen}
    >
      {/* HEADER */}
      <div className="h-12 px-4 flex items-center justify-between text-xs tracking-widest">
        <span>THUMBNAILS</span>
        <button onClick={onClose}>✕</button>
      </div>

      {/* LIST */}
      <div
        ref={listRef}
        style={{ overscrollBehavior: "contain" }}
        className="flex-1 overflow-y-auto p-3 flex flex-col gap-4"
      />
    </div>
  );
};

export default CatalogueThumbnailsPanel;
