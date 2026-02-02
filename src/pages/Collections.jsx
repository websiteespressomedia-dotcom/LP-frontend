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
    <section className="relative min-h-screen top-8 overflow-hidden">
      {/* ================= FIXED BACKGROUND ================= */}
      <div className="fixed inset-0 -z-10">
        <img
          src={collectionsBg}
          alt="Collections Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-6xl mx-auto text-center text-white space-y-14 z-10">
          <h1 className="text-4xl md:text-7xl font-semibold tracking-wide">
            Collections
          </h1>

          <FilterGroup
            label="Category"
            options={CATEGORIES}
            value={category}
            setValue={setCategory}
          />

          {/* SIZE / SERIES / FINISH – 3 COLUMN LAYOUT */}
          {/* ================= FILTER PANEL ================= */}
          <div className="mt-8 max-w-7xl mx-auto">
            <div
              className="
                relative
                rounded-[32px]
                border border-white/20
                bg-black/30
                backdrop-blur-xs
                p-12
              "
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_2fr] gap-12 items-start">
                {/* ================= LEFT: SIZE ================= */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">
                    Choose By Size
                  </h3>
                  <div className="h-px bg-white/20" />

                  <div className="grid grid-cols-1 gap-4">
                    {SIZE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSize(opt)}
                        className={`
                 py-3 mx-8 rounded-xl text-sm font-medium transition-all
                ${
                  size === opt
                    ? "bg-white text-black shadow-lg"
                    : "bg-black/20 text-white border border-white/20 hover:border-white/40"
                }
              `}
                      >
                        {opt === "All"
                          ? "ALL"
                          : `${opt.replace("x", " x ")} MM`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="hidden md:block w-px bg-white/20 h-full" />

                {/* ================= CENTER: SERIES ================= */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">
                    Choose By Series
                  </h3>
                  <div className="h-px bg-white/20" />

                  <div className="grid grid-cols-1 gap-4">
                    {SERIES_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSeries(opt)}
                        className={`
                py-3 rounded-xl mx-8 text-sm font-medium transition-all
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

                {/* DIVIDER */}
                <div className="hidden md:block w-px bg-white/20 h-full" />

                {/* ================= RIGHT: FINISH ================= */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">
                    Choose By Finish
                  </h3>
                  <div className="h-px bg-white/20" />

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {FINISH_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setFinish(opt)}
                        className={`
                px-2 py-3 rounded-xl text-xs font-medium uppercase tracking-wide
                transition-all
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
              </div>
            </div>
          </div>

          {/* <button
            onClick={() =>
              document
                .getElementById("collections-results")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:bg-gray-200 transition"
          >
            View Collections
          </button> */}
        </div>
      </section>

      {/* ================= RESULTS SECTION ================= */}
      <section id="collections-results" className="relative px-6 py-24">
        <div
          className="
    absolute inset-0
    bg-white/20
    backdrop-blur-lg
     border-white/30
  "
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          {filteredCollections.length === 0 ? (
            <p className="text-gray-500">No collections found.</p>
          ) : (
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16"
            >
              {filteredCollections.map((item) => (
                <div
                  key={item.id}
                  className="group transition-all duration-500"
                >
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

                  <div className="mt-5 space-y-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-xs uppercase tracking-widest text-white">
                      {item.size} • {item.series}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
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
