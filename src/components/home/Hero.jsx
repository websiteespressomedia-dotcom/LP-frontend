import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import leftroom from "../../assets/room-left.jpg";
import rightroom from "../../assets/room-right.jpg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- Overlay intro (runs once, not scrubbed)
      gsap.fromTo(
        ".hero-overlay",
        { opacity: 0.6 },
        { opacity: 0.4, duration: 1.2, ease: "power2.out" },
      );

      // ---- Main scroll timeline (VIDEOS ONLY)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=140%", // reduced = smoother
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Video split (center → open)
      tl.to(".hero-left", { xPercent: -80, ease: "none" }, 0).to(
        ".hero-right",
        { xPercent: 80, ease: "none" },
        0,
      );

      // Exit split (open → off screen)
      tl.to(".hero-left", { xPercent: -100, ease: "none" }, 0.65).to(
        ".hero-right",
        { xPercent: 100, ease: "none" },
        0.65,
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-transparent"
    >
      {/* TEXT (STATIC = PREMIUM) */}
      {/* <div className="relative z-0 h-full w-full flex items-center justify-center text-center px-6 pointer-events-none">
        <div className="text-white">
          <h1 className="text-5xl md:text-7xl font-bold">
            Crafting Timeless Tile
          </h1>
          <h3 className="mt-4 text-lg md:text-2xl text-gray-200">
            Design. Durability. Architectural Excellence.
          </h3>
        </div>
      </div> */}

      {/* VIDEO SPLIT */}
      <div className="absolute inset-0 flex z-10">
        <div className="hero-left w-1/2 h-full overflow-hidden will-change-transform">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={leftroom}
            alt="left image"
          />
        </div>

        <div className="hero-right w-1/2 h-full overflow-hidden will-change-transform">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={rightroom}
            alt="right image"
          />
        </div>
      </div>

      {/* OVERLAY */}
      <div className="hero-overlay absolute inset-0  z-0" />
    </section>
  );
};

export default Hero;
