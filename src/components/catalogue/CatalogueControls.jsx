const CatalogueControls = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-white shadow-lg rounded-xl px-4 py-2 text-sm text-gray-700">

        {/* PAGE INDICATOR */}
        <div className="flex items-center gap-1">
          <input
            type="text"
            value="3"
            readOnly
            className="w-8 text-center bg-transparent outline-none"
          />
          <span>/</span>
          <span>621</span>
        </div>

        <div className="w-px h-5 bg-gray-300" />

        {/* GRID */}
        <button className="p-2 hover:bg-gray-100 rounded-md">
          ⬛⬛
        </button>

        {/* ZOOM IN */}
        <button className="p-2 hover:bg-gray-100 rounded-md text-lg">
          ＋
        </button>

        {/* ZOOM OUT */}
        <button className="p-2 hover:bg-gray-100 rounded-md text-lg">
          −
        </button>

        {/* FULLSCREEN */}
        <button className="p-2 hover:bg-gray-100 rounded-md">
          ⛶
        </button>

        {/* SHARE */}
        <button className="p-2 hover:bg-gray-100 rounded-md">
          ↗
        </button>

        {/* MORE */}
        <button className="p-2 hover:bg-gray-100 rounded-md">
          ⋯
        </button>
      </div>
    </div>
  );
};

export default CatalogueControls;
