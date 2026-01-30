import Footer from "../components/common/Footer";
import { useEffect } from "react";
import "../styles/catalogue-book.css";
import gsap from "gsap";

// TEMP images (replace with real catalogue images later)
import tile1 from "../assets/catalogue/tile1.avif";
import tile2 from "../assets/catalogue/tile2.jpg";
import tile3 from "../assets/catalogue/tile3.avif";
import tile4 from "../assets/catalogue/tile4.avif";
import whitebg from "../assets/catalogue/white-bg.avif";

const catalogues = [
  { id: 1, name: "Midnight Marble", image: tile1 },
  { id: 2, name: "Ash Grey", image: tile2 },
  { id: 3, name: "Italian White", image: tile3 },
  { id: 4, name: "Graphite Stone", image: tile2 },
  { id: 5, name: "Copper Gold", image: tile3 },
  { id: 6, name: "Slate Grey", image: tile1 },
];

const Catalogue = () => {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    const items = document.querySelectorAll(".book-wrapper");

    items.forEach((item) => {
      const cover = item.querySelector(".page-1");
      const page2 = item.querySelector(".page-2");
      const page3 = item.querySelector(".page-3");
      const page4 = item.querySelector(".page-4");
      const page5 = item.querySelector(".page-5");
      const page6 = item.querySelector(".page-6");
      const shadow = item.querySelector(".book-shadow");
      gsap.set(cover, { rotateY: -30, x: 0 });
      gsap.set(page2, { rotateY: -30, x: 3 });
      gsap.set(page3, { rotateY: -30, x: 6 });
      gsap.set(page4, { rotateY: -30, x: 9 });
      gsap.set(page5, { rotateY: -30, x: 12 });
      gsap.set(page6, { rotateY: -30, x: 15 });
      gsap.set(shadow, { opacity: 0 });
      const tl = gsap.timeline({ paused: true });

      tl.to(cover, {
        rotateY: -120,
        x: -4,
        duration: 0.6,
        // ease: "power3.out",
      })
        .to(
          page2,
          {
            rotateY: -115,
            x: -4,
            duration: 0.7,
            // ease: "power3.out",
          },
          "<",
        )
        .to(
          page3,
          {
            rotateY: -100,
            x: -4,
            duration: 0.8,
            // ease: "power3.out",
          },
          "<",
        )
        .to(
          page4,
          {
            rotateY: -30,
            x: -4,
            duration: 0.6,
            // ease: "power3.out",
          },
          "<",
        )
        .to(
          page5,
          {
            rotateY: -26,
            x: -2,
            duration: 0.6,
            // ease: "power3.out",
          },
          "<",
        )
        .to(
          page6,
          {
            rotateY: -25,
            x: -2,
            duration: 0.6,
            // ease: "power3.out",
          },
          "<",
        )
        .to(
          shadow,
          {
            opacity: 1,
            duration: 0.3,
            // ease: "power2.out",
          },
          0,
        );

      item.addEventListener("mouseenter", () => tl.play());
      item.addEventListener("mouseleave", () => tl.reverse());
    });
  }, []);

  return (
    <main className="bg-white text-black">
      {/* ================= HERO ================= */}
      <section className="h-[60vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-serif font-normal mb-6">
            Catalogue
          </h1>

          <p className="max-w-xl text-gray-600 leading-relaxed">
            A curated collection of architectural surfaces designed for
            residential, commercial, and bespoke spaces.
          </p>
        </div>
      </section>

      {/* ================= GRID ================= */}
      <section className="pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-y-24">
            {catalogues.map((item) => (
              <div className="catalogue-item">
                <div className="book-wrapper">
                  {/* PAGE 6 (deepest) */}
                  <div className="book-page page-6">
                    <img src={item.image} alt={item.name} />
                  </div>

                  {/* PAGE 5 */}
                  <div className="book-page shadow-2xl page-5">
                    <img src={whitebg} alt="" />
                  </div>

                  {/* PAGE 4 */}
                  <div className="book-page preview-page shadow-2xl page-4">
                    <img src={whitebg} alt="" />
                    <div className="preview-actions">
                      <button
                        className="preview-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `/catalogue/viewer?pdf=/pdfs/lp-cat_repaired.pdf`,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                      >
                        View
                      </button>

                      <button className="preview-btn preview-btn-outline">
                        Download
                      </button>
                    </div>
                  </div>
                  {/* PAGE 3 */}
                  <div className="book-page shadow-2xl page-3">
                    <img src={whitebg} alt="" />
                  </div>

                  {/* PAGE 2 */}
                  <div className="book-page shadow-2xl page-2">
                    <img src={whitebg} alt="" />
                  </div>

                  {/* COVER */}
                  <div className="book-cover page-1">
                    <img src={item.image} alt={item.name} />
                  </div>

                  {/* SHADOW */}
                  <div className="book-shadow" />
                </div>

                <p className="mt-4 text-sm tracking-wide">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Catalogue;
