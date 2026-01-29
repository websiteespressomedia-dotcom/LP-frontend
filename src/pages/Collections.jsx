// import { useEffect, useMemo, useRef, useState } from "react";
// import gsap from "gsap";

// // ---------------- IMAGES ----------------
// import aurora from "../assets/collections/aurora.png";
// import midnight from "../assets/collections/midnight.jpg";
// import stone from "../assets/collections/stone.webp";
// import ivory from "../assets/collections/ivory.avif";
// import carbon from "../assets/collections/carbon.jpg";
// import ash from "../assets/collections/ash.png";

// // ---------------- DATA ----------------
// const COLLECTIONS = [
//   {
//     id: 1,
//     name: "Aurora White",
//     size: "600x600",
//     series: "Classic",
//     finish: "Glossy",
//     image: aurora,
//   },
//   {
//     id: 2,
//     name: "Midnight Black",
//     size: "600x1200",
//     series: "Premium",
//     finish: "Matte",
//     image: midnight,
//   },
//   {
//     id: 3,
//     name: "Stone Grey",
//     size: "800x800",
//     series: "Signature",
//     finish: "Satin",
//     image: stone,
//   },
//   {
//     id: 4,
//     name: "Ivory Sand",
//     size: "600x600",
//     series: "Classic",
//     finish: "Matte",
//     image: ivory,
//   },
//   {
//     id: 5,
//     name: "Carbon Slate",
//     size: "600x1200",
//     series: "Premium",
//     finish: "Glossy",
//     image: carbon,
//   },
//   {
//     id: 6,
//     name: "Ash Concrete",
//     size: "800x800",
//     series: "Signature",
//     finish: "Matte",
//     image: ash,
//   },
// ];

// // ---------------- FILTER OPTIONS ----------------
// const sizes = ["All", ...new Set(COLLECTIONS.map((i) => i.size))];
// const seriesList = ["All", ...new Set(COLLECTIONS.map((i) => i.series))];
// const finishes = ["All", ...new Set(COLLECTIONS.map((i) => i.finish))];

// const Collections = () => {
//   const gridRef = useRef(null);

//   const [search, setSearch] = useState("");
//   const [size, setSize] = useState("All");
//   const [series, setSeries] = useState("All");
//   const [finish, setFinish] = useState("All");

//   // ---------------- FILTER LOGIC ----------------
//   const filteredCollections = useMemo(() => {
//     return COLLECTIONS.filter((item) => {
//       const matchName = item.name
//         .toLowerCase()
//         .includes(search.toLowerCase());
//       const matchSize = size === "All" || item.size === size;
//       const matchSeries = series === "All" || item.series === series;
//       const matchFinish = finish === "All" || item.finish === finish;

//       return matchName && matchSize && matchSeries && matchFinish;
//     });
//   }, [search, size, series, finish]);

//   // ---------------- GSAP ANIMATION ----------------
//   useEffect(() => {
//     if (!gridRef.current) return;

//     gsap.fromTo(
//       gridRef.current.children,
//       { opacity: 0, y: 40 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.6,
//         ease: "power3.out",
//         stagger: 0.08,
//       }
//     );
//   }, [filteredCollections]);

//   return (
//     <section className="min-h-screen bg-white px-6 py-24">
//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="mb-16">
//           <h1 className="text-4xl md:text-5xl font-semibold mb-6">
//             Collections
//           </h1>

//           <input
//             type="text"
//             placeholder="Search collections..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full md:w-1/2 px-5 py-3 border border-gray-300 rounded-full outline-none focus:border-black transition"
//           />

//           <div className="flex flex-wrap gap-4 mt-6">
//             <FilterSelect label="Size" value={size} onChange={setSize} options={sizes} />
//             <FilterSelect label="Series" value={series} onChange={setSeries} options={seriesList} />
//             <FilterSelect label="Finish" value={finish} onChange={setFinish} options={finishes} />
//           </div>
//         </div>

//         {/* GRID */}
//         {filteredCollections.length === 0 ? (
//           <p className="text-gray-500">No collections found.</p>
//         ) : (
//           <div
//             ref={gridRef}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
//           >
//             {filteredCollections.map((item) => (
//               <div
//                 key={item.id}
//                 className="group relative rounded-3xl overflow-hidden cursor-pointer"
//               >
//                 {/* IMAGE */}
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
//                 />

//                 {/* OVERLAY */}
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

//                 {/* CONTENT */}
//                 <div className="absolute inset-0 flex flex-col justify-end p-8 text-white opacity-0 group-hover:opacity-100 transition">
//                   <h3 className="text-2xl font-semibold mb-2">
//                     {item.name}
//                   </h3>
//                   <p className="text-sm opacity-90">
//                     {item.size} • {item.series} • {item.finish}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// // ---------------- FILTER SELECT ----------------
// const FilterSelect = ({ label, value, onChange, options }) => (
//   <select
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     className="px-4 py-2 border border-gray-300 rounded-full text-sm outline-none focus:border-black transition"
//   >
//     {options.map((opt) => (
//       <option key={opt} value={opt}>
//         {label}: {opt}
//       </option>
//     ))}
//   </select>
// );

// export default Collections;

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
// import { ChevronDown } from "react-icons/fi";

// ---------------- IMAGES ----------------
import aurora from "../assets/collections/aurora.png";
import midnight from "../assets/collections/midnight.jpg";
import stone from "../assets/collections/stone.webp";
import ivory from "../assets/collections/ivory.avif";
import carbon from "../assets/collections/carbon.jpg";
import ash from "../assets/collections/ash.png";
import { BiChevronDown } from "react-icons/bi";

// ---------------- DATA ----------------
const COLLECTIONS = [
  { id: 1, name: "Aurora White", size: "600x600", series: "Classic", finish: "Glossy", image: aurora },
  { id: 2, name: "Midnight Black", size: "600x1200", series: "Premium", finish: "Matte", image: midnight },
  { id: 3, name: "Stone Grey", size: "800x800", series: "Signature", finish: "Satin", image: stone },
  { id: 4, name: "Ivory Sand", size: "600x600", series: "Classic", finish: "Matte", image: ivory },
  { id: 5, name: "Carbon Slate", size: "600x1200", series: "Premium", finish: "Glossy", image: carbon },
  { id: 6, name: "Ash Concrete", size: "800x800", series: "Signature", finish: "Matte", image: ash },
];

// ---------------- OPTIONS ----------------
const sizes = ["All", ...new Set(COLLECTIONS.map((i) => i.size))];
const seriesList = ["All", ...new Set(COLLECTIONS.map((i) => i.series))];
const finishes = ["All", ...new Set(COLLECTIONS.map((i) => i.finish))];

const Collections = () => {
  const gridRef = useRef(null);

  const [search, setSearch] = useState("");
  const [size, setSize] = useState("All");
  const [series, setSeries] = useState("All");
  const [finish, setFinish] = useState("All");

  const isAllSizes = size === "All";

  // ---------------- FILTER ----------------
  const filteredCollections = useMemo(() => {
    return COLLECTIONS.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (size === "All" || item.size === size) &&
        (series === "All" || item.series === series) &&
        (finish === "All" || item.finish === finish)
      );
    });
  }, [search, size, series, finish]);

  // ---------------- GSAP ----------------
  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
      }
    );
  }, [filteredCollections, size]);

  return (
    <section className="min-h-screen bg-white px-6 py-24">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16 space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Collections
          </h1>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-5 py-3 border border-gray-300 rounded-full outline-none focus:border-black transition"
          />

          {/* FILTERS */}
          <div className="flex flex-wrap gap-4">
            <FilterDropdown label="Size" value={size} setValue={setSize} options={sizes} />
            <FilterDropdown label="Series" value={series} setValue={setSeries} options={seriesList} />
            <FilterDropdown label="Finish" value={finish} setValue={setFinish} options={finishes} />
          </div>
        </div>

        {/* GRID */}
        {filteredCollections.length === 0 ? (
          <p className="text-gray-500">No collections found.</p>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
          >
            {filteredCollections.map((item) => (
              <div key={item.id} className="space-y-4">

                {/* IMAGE TILE (NO RADIUS) */}
                <div className={`${isAllSizes ? "h-[420px]" : ""} overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full transition-transform duration-700 hover:scale-105 ${
                      isAllSizes ? "h-full object-cover" : "object-contain"
                    }`}
                  />
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="text-lg font-medium">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.size} • {item.series} • {item.finish}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ---------------- DROPDOWN WITH OUTSIDE CLICK ----------------
const FilterDropdown = ({ label, value, setValue, options }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-full hover:border-black transition text-sm"
      >
        <span className="text-gray-500">{label}:</span>
        <span className="font-medium">{value}</span>
        <BiChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
              className={`block w-full text-left px-5 py-2 text-sm hover:bg-gray-100 ${
                opt === value ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;

