import { useState } from "react";
import { TfiLayoutGrid2 } from "react-icons/tfi";
const CatalogueControls = ({
  pageIndex,
  totalPages,
  onJumpToPage,
  onToggleGrid,
   viewMode,
  onToggleViewMode,
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(pageIndex);

  const sanitize = (val) => {
    if (val === "") return "";
    let num = Number(val);
    if (isNaN(num)) return "";
    return Math.min(Math.max(num, 1), totalPages);
  };

  const commit = () => {
    const num = sanitize(value);
    if (num) {
      onJumpToPage(num);
    }
    setEditing(false);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-white shadow-lg rounded-xl px-4 py-2 text-sm text-gray-700">
        {/* PAGE CONTROL */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setValue(pageIndex);
            setEditing(true);
          }}
        >
          {/* PAGE DISPLAY / INPUT */}
          {!editing ? (
            <span className="min-w-[48px] text-center">
              {pageIndex} / {totalPages}
            </span>
          ) : (
            <input
              autoFocus
              type="number"
              min="1"
              max={totalPages}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commit();
                if (e.key === "Escape") setEditing(false);
              }}
              onBlur={commit}
              className="w-16 text-center border-b border-gray-400 outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>

        <div className="w-px h-5 bg-gray-300" />

        {/* GRID (later) */}
        <button
          onClick={onToggleGrid}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          <TfiLayoutGrid2 className="cursor-pointer text-black " />
        </button>
<button
  onClick={onToggleViewMode}
  className="px-3 py-1 text-xs border rounded"
>
  {viewMode === "single" ? "Spread View" : "Single Page"}
</button>


       
      </div>
    </div>
  );
};

export default CatalogueControls;
