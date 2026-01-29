// import { useRef, useState } from "react";
// import gsap from "gsap";

// const services = [
//   {
//     id: 1,
//     title: "Tile Design & Innovation",
//     description:
//       "Our design team creates modern tile concepts inspired by global architecture, interior trends, and timeless aesthetics.",
//     image: "/services/design.jpg",
//   },
//   {
//     id: 2,
//     title: "Manufacturing Excellence",
//     description:
//       "Advanced production technology ensures precision, durability, and consistency across every tile we manufacture.",
//     image: "/services/manufacturing.jpg",
//   },
//   {
//     id: 3,
//     title: "Quality Assurance",
//     description:
//       "Every tile undergoes strict quality testing to meet international standards of strength, finish, and reliability.",
//     image: "/services/quality.jpg",
//   },
//   {
//     id: 4,
//     title: "Custom Solutions",
//     description:
//       "We deliver customized tile solutions tailored for residential, commercial, and architectural projects.",
//     image: "/services/custom.jpg",
//   },
// ];

// const WhatWeDo = () => {
//   const [activeId, setActiveId] = useState(null);
//   const contentRefs = useRef({});

//   const toggle = (id) => {
//     // close currently open
//     if (activeId && contentRefs.current[activeId]) {
//       gsap.to(contentRefs.current[activeId], {
//         height: 0,
//         opacity: 0,
//         duration: 0.35,
//         ease: "power2.inOut",
//       });
//     }

//     // open new (or close if same)
//     if (activeId !== id && contentRefs.current[id]) {
//       gsap.fromTo(
//         contentRefs.current[id],
//         { height: 0, opacity: 0 },
//         {
//           height: "auto",
//           opacity: 1,
//           duration: 0.45,
//           ease: "power3.out",
//         }
//       );
//       setActiveId(id);
//     } else {
//       setActiveId(null);
//     }
//   };

//   return (
//     <section className="py-20 bg-gray-50 z-10">
//       <div className="max-w-7xl mx-auto px-6">
//         <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-12">
//           What We Do
//         </h2>

//         <div className="space-y-4">
//           {services.map((service) => {
//             const isOpen = activeId === service.id;

//             return (
//               <div
//                 key={service.id}
//                 className="bg-white border border-gray-200 rounded-xl overflow-hidden"
//               >
//                 {/* HEADER */}
//                 <button
//                   onClick={() => toggle(service.id)}
//                   className="w-full flex items-center justify-between px-6 py-5 text-left"
//                 >
//                   <span className="text-lg font-medium text-gray-900">
//                     {service.title}
//                   </span>
//                   <span
//                     className={`transition-transform duration-300 ${
//                       isOpen ? "rotate-180" : ""
//                     }`}
//                   >
//                     ▼
//                   </span>
//                 </button>

//                 {/* CONTENT (GSAP-controlled) */}
//                 <div
//                   ref={(el) => (contentRefs.current[service.id] = el)}
//                   className="overflow-hidden h-0 opacity-0"
//                 >
//                   <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//                     <p className="text-gray-600 leading-relaxed">
//                       {service.description}
//                     </p>

//                     {/* IMAGE WITH TOP/BOTTOM FADE */}
//                     <div className="relative h-[160px] md:h-[200px] rounded-lg overflow-hidden">
//                       <img
//                         src={service.image}
//                         alt={service.title}
//                         className="w-full h-full object-cover"
//                       />
//                       <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black/50 to-transparent"></div>
//                       <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black/50 to-transparent"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhatWeDo;


import { useEffect, useRef } from "react";
import gsap from "gsap";

const services = [
  {
    id: 1,
    title: "Tile Design & Innovation",
    description:
      "Modern tile concepts inspired by global architecture and trends.",
    image: "/services/design.jpg",
  },
  {
    id: 2,
    title: "Manufacturing Excellence",
    description:
      "Advanced production technology ensures precision and durability.",
    image: "/services/manufacturing.jpg",
  },
  {
    id: 3,
    title: "Quality Assurance",
    description:
      "Strict testing to meet international strength and finish standards.",
    image: "/services/quality.jpg",
  },
  {
    id: 4,
    title: "Custom Solutions",
    description:
      "Tailored tile solutions for residential and commercial projects.",
    image: "/services/Custom-Solutions.png",
  },
];

const WhatWeDo = () => {
  const tilesRef = useRef([]);

  useEffect(() => {
    const tiles = tilesRef.current;

    // INITIAL STATE
    gsap.set(tiles, { flexGrow: 1 });

    tiles.forEach((tile, i) => {
      tile.addEventListener("mouseenter", () => {
        gsap.to(tiles, {
          flexGrow: (index) => (index === i ? 4 : 0.6),
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.to(
          tiles.map((t) => t.querySelector(".tile-image")),
          {
            opacity: (index) => (index === i ? 1 : 0.35),
            duration: 0.4,
            ease: "power2.out",
          }
        );
      });

      tile.addEventListener("mouseleave", () => {
        gsap.to(tiles, {
          flexGrow: 1,
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.to(
          tiles.map((t) => t.querySelector(".tile-image")),
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          }
        );
      });
    });
  }, []);

  return (
    <section className="relative h-[70vh] bg-black overflow-hidden">
      <div className="flex h-full w-full">
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => (tilesRef.current[index] = el)}
            className="
              relative
              flex
              items-end
              overflow-hidden
              cursor-pointer
              transition-shadow
              duration-300
            "
          >
            {/* IMAGE */}
            <img
              src={service.image}
              alt={service.title}
              className="
                tile-image
                absolute inset-0
                w-full h-full
                object-cover
                transition-opacity
              "
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40" />

            {/* CONTENT */}
            <div className="relative z-10 p-6 max-w-sm">
              <h3 className="text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-gray-200 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDo;
