import { useEffect, useRef } from "react";
import gsap from "gsap";
import cat1 from "../../assets/collections/1.jpg";
import cat2 from "../../assets/collections/22.avif";
import cat3 from "../../assets/collections/33.jpg";
import cat4 from "../../assets/collections/44.jpg";
import tile from "../../assets/collections/marble.jpg";

const categories = [
  { title: "SLAB TILE", image: cat1 },
  { title: "VITRIFIED TILE", image: cat2 },
  { title: "WALL TILE", image: cat3 },
  { title: "ELEVATION TILE", image: cat4 },
];

const sizes = [
  {
    label: "400 × 400 mm",
    w: 80,
    h: 80,
    image: tile,
  },
  {
    label: "500 × 500 mm",
    w: 100,
    h: 100,
    image: tile,
  },
  {
    label: "800 × 2400 mm",
    w: 130,
    h: 300,
    image: tile,
  },
  {
    label: "1200 × 4800 mm",
    w: 150,
    h: 400,
    image: tile,
  },
  
];

const CategoryStrip = () => {
  const itemsRef = useRef([]);

  useEffect(() => {
    const items = itemsRef.current;
    gsap.utils.toArray(".size-box").forEach((box, i) => {
      const top = box.querySelector(".border-top");
      const right = box.querySelector(".border-right");
      const bottom = box.querySelector(".border-bottom");
      const left = box.querySelector(".border-left");

      const tl = gsap.timeline({
        repeat: -1,
        delay: i * 0.2,
      });

      tl.fromTo(top, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "none" })
        .fromTo(
          right,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.6, ease: "none" },
        )
        .fromTo(
          bottom,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "none" },
        )
        .fromTo(
          left,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.6, ease: "none" },
        );
    });

    gsap.set(items, { flexGrow: 1 });

    items.forEach((item, index) => {
      const img = item.querySelector("img");
      const overlay = item.querySelector(".tile-overlay");
      const content = item.querySelector(".tile-content");

      item.addEventListener("mouseenter", () => {
        gsap.to(items, {
          flexGrow: (i) => (i === index ? 4 : 0.8),
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.to(
          items.map((el) => el.querySelector(".tile-overlay")),
          {
            opacity: (i) => (i === index ? 0.25 : 0.75),
            duration: 0.4,
            ease: "power2.out",
          },
        );

        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(items, {
          flexGrow: 1,
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.to(
          items.map((el) => el.querySelector(".tile-overlay")),
          {
            opacity: 0.55,
            duration: 0.4,
          },
        );

        gsap.to(content, {
          opacity: 0,
          y: 12,
          //   duration: 0.3,
        });
      });
    });
  }, []);

  return (
    <section className="w-full overflow-hidden py-10 bg-white">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 py-10 mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-black tracking-wide">
          Explore by Category
        </h2>
        <p className="mt-4 ml-0 max-w-3xl mx-auto text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum,
          maxime? Veniam ducimus reiciendis laudantium impedit necessitatibus
          iusto odio fugit dolorum cum expedita suscipit blanditiis sit quos
          rerum ea fugiat aspernatur ab, vero voluptatibus error pariatur!
        </p>
      </div>

      {/* STRIP */}
      <div className="flex h-[65vh] gap-2 px-2">
        {categories.map((cat, i) => (
          <div
            key={cat.title}
            ref={(el) => (itemsRef.current[i] = el)}
            className="
              relative
              flex
              items-end
              overflow-hidden
              cursor-pointer
              
            "
          >
            {/* IMAGE */}
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* SOFT DARK OVERLAY */}
            <div className="tile-overlay absolute inset-0 bg-gradient-to-t from-black/20 to-black/80 opacity-50" />

            {/* CONTENT */}
            <div className="tile-content relative z-10 p-6 opacity-0 translate-y-3">
              <h3 className="text-white text-xl md:text-2xl font-semibold tracking-widest">
                {cat.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {/* AVAILABLE SIZES */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            Available Sizes In Leverpool
          </h2>

          <p className="mt-4 max-w-3xl mx-auto text-gray-500 leading-relaxed">
            Leverpool provides a diverse selection of sizes tailored for every
            architectural need—offering flexibility and seamless design
            possibilities.
          </p>

          {/* SIZE GRID */}
          <div className="mt-20 flex justify-center items-end gap-30 flex-wrap">
            {sizes.map((size, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                {/* SIZE TILE */}
                <div
                  className="size-box relative overflow-hidden"
                  style={{
                    width: `${size.w}px`,
                    height: `${size.h}px`,
                  }}
                >
                  {/* TILE IMAGE */}
                  <img
                    src={size.image}
                    alt={size.label}
                    className="w-full h-full object-cover"
                  />

                  {/* BORDERS */}
                  <span className="border-top absolute top-0 left-0 w-full h-[1px] bg-black origin-left" />
                  <span className="border-right absolute top-0 right-0 w-[1px] h-full bg-black origin-top" />
                  <span className="border-bottom absolute bottom-0 left-0 w-full h-[1px] bg-black origin-right" />
                  <span className="border-left absolute top-0 left-0 w-[1px] h-full bg-black origin-bottom" />
                </div>

                {/* LABEL */}
                <span className="text-sm text-black tracking-wide">
                  {size.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default CategoryStrip;
