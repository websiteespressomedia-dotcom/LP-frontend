import { useEffect, useMemo, useRef, useState } from "react";
import { generateTiles, getAspectRatioStyle } from "../helpers/tileHelper";
import { MAIN_CATEGORIES, SIZE_CONFIG } from "../config/tileConfig";
import { Link } from "react-router-dom";

// ---------------- IMAGES ----------------
import collectionsBg from "../assets/collections/large-format.jpg";

const Collections = () => {
  const gridRef = useRef(null);

  const [categoryId, setCategoryId] = useState("All");
  const [sizeMm, setSizeMm] = useState(null);
  const [finish, setFinish] = useState("All");

  const baseTiles = useMemo(() => {
    return generateTiles({
      categoryId,
      sizeMm,
    });
  }, [categoryId, sizeMm]);

  const availableFinishes = useMemo(() => {
    const set = new Set(baseTiles.map((t) => t.finish));
    return ["All", ...Array.from(set)];
  }, [baseTiles]);

  const tiles = useMemo(() => {
    if (finish === "All") return baseTiles;
    return baseTiles.filter((t) => t.finish === finish);
  }, [baseTiles, finish]);

  const groupedTiles = useMemo(() => {
    const groups = {};

    tiles.forEach((tile) => {
      if (!groups[tile.sizeMm]) {
        groups[tile.sizeMm] = [];
      }
      groups[tile.sizeMm].push(tile);
    });

    return groups;
  }, [tiles]);

  return (
    <section className="fixed min-h-screen inset-0 overflow-hidden">
      {/* ================= FIXED BACKGROUND ================= */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img
          src={collectionsBg}
          alt="Collections Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* ================= PAGE GRID ================= */}

      {/* ================= LEFT FILTER SIDEBAR ================= */}
      <aside
        onWheel={(e) => e.stopPropagation()}
        className="
          hidden lg:block
          fixed top-16 h-[calc(100vh-4rem)]
          border-r border-white/20
          bg-black/30
          backdrop-blur-lg
          p-8 w-2xs
          overflow-auto
          z-20
        "
      >
        <h2 className="text-white text-xl font-semibold mb-6">Filters</h2>

        {/* SIZE */}
        <div className="space-y-5 mb-6">
          <h3 className="text-white text-lg">Size (mm)</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSizeMm(null)}
              className={`
              w-full py-3 rounded-xl text-sm transition
              ${
                sizeMm === null
                  ? "bg-white text-black shadow-lg"
                  : "bg-black/20 text-white border border-white/20 hover:border-white/40"
              }
            `}
            >
              All
            </button>

            {SIZE_CONFIG.filter(
              (size) =>
                categoryId === "All" || size.categories.includes(categoryId),
            ).map((size) => (
              <button
                key={size.mm}
                onClick={() => setSizeMm(size.mm)}
                className={`py-3 rounded-xl text-sm transition ${
                  sizeMm === size.mm
                    ? "bg-white text-black shadow-lg"
                    : "bg-black/20 text-white border border-white/20"
                }`}
              >
                {size.mm}
              </button>
            ))}
          </div>
        </div>

        {/* ================= FINISH ================= */}
        <div className="space-y-5 mt-8">
          <h3 className="text-white text-lg">Finish</h3>

          <div className="grid grid-cols-2 gap-3">
            {availableFinishes.map((opt) => (
              <button
                key={opt}
                onClick={() => setFinish(opt)}
                className={`
                py-3 rounded-xl text-xs uppercase tracking-wide transition
                ${
                  finish === opt
                    ? "bg-white text-black shadow-lg"
                    : "bg-black/20 text-white border border-white/20 hover:border-white/40"
                }
              `}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ================= RIGHT CONTENT ================= */}
      <main
        className="h-[calc(100vh-4rem)] mt-16 overflow-y-auto overscroll-contain relative z-10"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* ================= HERO ================= */}
        <section className="min-h-[40vh] flex items-center justify-center px-6 pt-30">
          <div className="max-w-6xl mx-auto text-center text-white space-y-10">
            <h1 className="text-4xl md:text-7xl font-semibold">Collections</h1>

            <FilterGroup
              label="Category"
              options={[{ id: "All", name: "All" }, ...MAIN_CATEGORIES]}
              value={categoryId}
              setValue={(val) => {
                setCategoryId(val);
                setSizeMm(null);
              }}
            />
          </div>
        </section>

        {/* ================= RESULTS ================= */}
        <section className="relative px-6 py-20">
          <div className="max-w-7xl lg:ml-[20%]">
            {tiles.length === 0 ? (
              <p className="text-white/70">No tiles found.</p>
            ) : (
              Object.entries(
                tiles.reduce((acc, tile) => {
                  if (!acc[tile.sizeMm]) acc[tile.sizeMm] = [];
                  acc[tile.sizeMm].push(tile);
                  return acc;
                }, {}),
              ).map(([size, sizeTiles]) => (
                <div key={size} className="mb-24">
                  {/* SIZE TITLE */}
                  <h2 className="text-white text-xl font-semibold mb-10">
                    {size} MM
                  </h2>

                  {/* NEW GRID FOR THIS SIZE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {sizeTiles.map((tile) => (
                      <Link key={tile.id} to={`/collections/${tile.sizeMm}/${tile.name.toLowerCase().replace(/\s+/g, "-")}`} target="_blank" className="group">
                        <div
                          className="relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu"
                          style={getAspectRatioStyle(tile.sizeMm)}
                        >
                          <img
                            src={tile.image}
                            alt={tile.name}
                            className="absolute inset-0 w-full h-full scale-[101%] object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div className="mt-4 text-white flex justify-between">
                          <h3 className="text-sm font-semibold">{tile.name}</h3>
                          <h3 className="text-sm text-white/70 font-semibold pr-2">
                            {tile.sizeMm}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </section>
  );
};

// ---------------- BIG BUTTON FILTER GROUP ----------------
const FilterGroup = ({ label, options, value, setValue }) => {
  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <p className="text-xs uppercase tracking-widest opacity-70">{label}</p>

      <div className="flex flex-wrap gap-3 justify-center">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setValue(opt.id)}
            className={`px-9 py-3 rounded-full text-sm transition ${
              value === opt.id
                ? "bg-white text-black"
                : "bg-white/10 text-white"
            }`}
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Collections;
