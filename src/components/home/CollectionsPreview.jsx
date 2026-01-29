import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import c1 from "../../assets/collections/1.jpg";
import c2 from "../../assets/collections/22.avif";
import c3 from "../../assets/collections/33.jpg";
import c4 from "../../assets/collections/44.jpg";
import bg from "../../assets/collections/large-format.jpg";

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: 1,
    name: "Marble Series",
    image: c1,
    slug: "marble-series",
  },
  {
    id: 2,
    name: "Wood Finish",
    image: c2,
    slug: "wood-finish",
  },
  {
    id: 3,
    name: "Concrete Look",
    image: c3,
    slug: "concrete-look",
  },
  {
    id: 4,
    name: "Designer Tiles",
    image: c4,
    slug: "designer-tiles",
  },
];

const CollectionsPreview = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const pill = document.querySelector(".cursor-pill");
      const cards = gsap.utils.toArray(".collection-card");
 cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(pill, {
        scale: 1,
        yPercent: -40,
        duration: 0.3,
        ease: "power3.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(pill, {
        scale: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    });
  });
      // INITIAL STATE
      gsap.set(cards, {
        yPercent: 20,
        rotationX: -20,
        transformOrigin: "center bottom",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 80}%`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
      // FIRST CARD ENTERS
      tl.fromTo(cards[0],{
        yPercent: 20,
        scale: 1,
        rotationX: -20,
        // duration: 1,
        ease: "power1.out",
      } ,{
        yPercent: 0,
        scale: 1,
        rotationX: 0,
        // duration: 1,
        ease: "none",
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        // Previous card moves up & shrinks
        tl.to(cards[index - 1], {
          rotationX: 0,
          ease: "none",
        });

        // Current card comes to center
        tl.fromTo(
          card,
          {
            yPercent: 120,
            scale: 1,
            rotationX: -20,
            ease: "power1.out",
          },
          {
            yPercent: 0,
            scale: 1,
            rotationX: 0,
            ease: "none",
          },
          "<",
        );

      });
    });


    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{backgroundImage:`url(${bg})`}} className="relative bg-blend-color-dodge bg-cover bg-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
      <div className="max-w-7xl mx-auto px-6 py-24 relative">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Our Collections
          </h2>

          <Link
            to="/collections"
            className="text-sm font-medium text-white border-b border-white hover:opacity-70 transition"
          >
            View all collections
          </Link>
        </div>

        <div className="relative h-[75vh] perspective-[1200px]">
          {/* STACK VIEW */}
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/collections/`}
              className="
                collection-card
                group
                absolute inset-0
                mx-auto
                w-full
                max-w-6xl
                h-5/6
                rounded-2xl
                overflow-hidden
                shadow-xl
                bg-gray-100
                [transform-style:preserve-3d]
              "
              style={{ zIndex: index + 1 }}
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out
    group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500
      group-hover:bg-black/10" />

              <div className="absolute top-0 left-0 w-full p-6 transition-all duration-500 ease-out
      group-hover:translate-y-2 ">
                <h3 className="text-2xl font-semibold text-white transition-colors duration-300
        group-hover:text-black  group-hover:text-shadow-lg">
                  {collection.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsPreview;
