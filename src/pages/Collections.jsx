import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

// ---------------- IMAGES ----------------
import aurora from "../assets/collections/aurora.png";
import midnight from "../assets/collections/midnight.jpg";
import stone from "../assets/collections/stone.webp";
import ivory from "../assets/collections/ivory.avif";
import carbon from "../assets/collections/carbon.jpg";
import ash from "../assets/collections/ash.png";
import collectionsBg from "../assets/collections/large-format.jpg";
import secondBg from "../assets/about/33.jpg";

// ---------------- DATA ----------------
const COLLECTIONS = [
  {
    id: 1,
    name: "Aurora White",
    size: "400x400",
    series: "Classic",
    finish: "Glossy",
    category: "Elevation Tiles",
    image: aurora,
  },
  {
    id: 2,
    name: "Midnight Black",
    size: "500x500",
    series: "Premium",
    finish: "Matte",
    category: "Full Body Tiles",
    image: midnight,
  },
  {
    id: 3,
    name: "Stone Grey",
    size: "800x2400",
    series: "Signature",
    finish: "Satin",
    category: "Parking Tiles",
    image: stone,
  },
  {
    id: 4,
    name: "Ivory Sand",
    size: "400x400",
    series: "Classic",
    finish: "Matte",
    category: "Heavy Duty Parking Tiles",
    image: ivory,
  },
  {
    id: 5,
    name: "Carbon Slate",
    size: "500x500",
    series: "Premium",
    finish: "Glossy",
    category: "Terracotta Jalli Cement Based Laying Equipments",
    image: carbon,
  },
  {
    id: 6,
    name: "Ash Concrete",
    size: "800x2400",
    series: "Signature",
    finish: "Matte",
    category: "Wooden Strips",
    image: ash,
  },
];

// ---------------- FILTER CONFIG (SOURCE OF TRUTH) ----------------
const CATEGORIES = [
  "All",
  "Elevation Tiles",
  "Full Body Tiles",
  "Parking Tiles",
  "Heavy Duty Parking Tiles",
  "Terracotta Jalli Cement Based Laying Equipments",
  "Wooden Strips",
];

const SIZE_OPTIONS = ["All", "400x400", "500x500", "800x2400", "1200x4800"];
const SERIES_OPTIONS = ["All", "Classic", "Premium", "Signature", "Luxury"];
const FINISH_OPTIONS = [
  "All",
  "Glossy",
  "Matte",
  "Satin",
  "Carving",
  "Velvet",
  "Rainbow",
  "Glossy 3D",
  "Wallpaper",
  "Moscow",
];

const Collections = () => {
  const gridRef = useRef(null);

  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [series, setSeries] = useState("All");
  const [finish, setFinish] = useState("All");

  // ---------------- FILTER ----------------
  const filteredCollections = useMemo(() => {
    return COLLECTIONS.filter((item) => {
      return (
        (category === "All" || item.category === category) &&
        (size === "All" || item.size === size) &&
        (series === "All" || item.series === series) &&
        (finish === "All" || item.finish === finish)
      );
    });
  }, [category, size, series, finish]);

  // ---------------- GSAP GRID ANIMATION ----------------
  // useEffect(() => {
  //   if (!gridRef.current) return;

  //   gsap.fromTo(
  //     gridRef.current.children,
  //     { opacity: 0, y: 40 },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.6,
  //       ease: "power3.out",
  //       stagger: 0.08,
  //     },
  //   );
  // }, [filteredCollections]);

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
          className="
          hidden lg:block
          fixed top-16 h-screen
          border-r border-white/20
          bg-black/30
          backdrop-blur-lg
          p-8
          overflow-hidden
          z-20
        "
        >
          <h2 className="text-white text-xl font-semibold mb-6">Filters</h2>

          {/* SIZE */}
          <div className="space-y-5 mb-6">
            <h3 className="text-white text-lg">Size</h3>
            <div className="grid grid-cols-2 gap-3">
              {SIZE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSize(opt)}
                  className={`
                w-full py-3 rounded-xl text-sm font-medium transition
                ${
                  size === opt
                    ? "bg-white text-black shadow-lg"
                    : "bg-black/20 text-white border border-white/20 hover:border-white/40"
                }
              `}
                >
                  {opt === "All" ? "ALL" : opt.replace("x", " x ") + " MM"}
                </button>
              ))}
            </div>
          </div>

          {/* SERIES */}
          <div className="space-y-5 mb-6">
            <h3 className="text-white text-lg">Series</h3>
            <div className="grid grid-cols-2 gap-3">
              {SERIES_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSeries(opt)}
                  className={`
                w-full py-3 rounded-xl text-sm font-medium transition
                ${
                  series === opt
                    ? "bg-white text-black shadow-lg"
                    : "bg-black/20 text-white border border-white/20 hover:border-white/40"
                }
              `}
                >
                  {opt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* FINISH */}
          <div className="space-y-5">
            <h3 className="text-white text-lg">Finish</h3>
            <div className="grid grid-cols-2 gap-3">
              {FINISH_OPTIONS.map((opt) => (
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
        <main className="h-screen overflow-y-auto overscroll-contain relative z-10" onWheel={(e) => e.stopPropagation()}>
          {/* ================= HERO ================= */}
          <section className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="max-w-6xl mx-auto text-center text-white space-y-10">
              <h1 className="text-4xl md:text-7xl font-semibold">
                Collections
              </h1>

              <FilterGroup
                label="Category"
                options={CATEGORIES}
                value={category}
                setValue={setCategory}
              />
            </div>
          </section>

          {/* ================= RESULTS ================= */}
          <section className="relative px-6">
            <div className="max-w-7xl ml-[20%]">
              {filteredCollections.length === 0 ? (
                <p className="text-white/70">No collections found.</p>
              ) : (
                <div
                  ref={gridRef}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16"
                >
                  {filteredCollections.map((item) => (
                    <div key={item.id} className="group">
                      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                        <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-medium">
                          {item.finish}
                        </div>
                      </div>

                      <div className="mt-5 space-y-1 text-white">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-xs uppercase tracking-widest opacity-80">
                          {item.size} • {item.series}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
     
    </section>
  );
};

// ---------------- BIG BUTTON FILTER GROUP ----------------
const FilterGroup = ({ label, options, value, setValue, align = "center" }) => {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : align === "right"
        ? "items-end text-right"
        : "items-center text-center";

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      <p className="text-xs uppercase tracking-widest opacity-70">{label}</p>

      <div
        className={`
          flex flex-wrap gap-3
          ${align === "left" ? "justify-start" : ""}
          ${align === "center" ? "justify-center" : ""}
          ${align === "right" ? "justify-end" : ""}
        `}
      >
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setValue(opt)}
            className={`
              px-9 py-3 rounded-full text-sm font-medium transition-all duration-300
              ${
                value === opt
                  ? "bg-white text-black shadow-lg scale-105"
                  : "bg-white/10 text-white hover:bg-white/20"
              }
            `}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Collections;
