import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroText = () => {
  const heroTextRef = useRef(null);

  useLayoutEffect(() => {
  const ctx = gsap.context(() => {

    // ENTRY (what you already have)
    gsap.fromTo(
      heroTextRef.current,
      { yPercent: 50 },
      {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "top+=10% top",
          scrub: true,
        },
      }
    );
    

  });

  return () => ctx.revert();
}, []);


  return (
    <div
      ref={heroTextRef}
      className="
        fixed inset-0 z-0
        bg-black
        flex flex-col items-center justify-center
        text-white
        select-none
      "
    >
      {/* TITLE */}
      <h1 className="font-extrabold tracking-[-0.04em] text-[10vw] leading-none">
        LEVERPOOL TILES
      </h1>

      {/* META */}
      <div className="mt-4 w-full max-w-6xl px-6 flex justify-between text-[11px] uppercase tracking-wider">
        <span>
          Visual creative studio
          <br />
          Based in NYC
        </span>

        <span className="text-right">
          Blending creativity & strategy
          <br />
          For seamless interfaces
        </span>
      </div>

      {/* ICONS */}
      <div className="mt-12 flex gap-10 opacity-60">
        <span className="w-4 h-4 bg-black" />
        <span className="w-4 h-4 border border-black" />
        <span className="w-4 h-4 rotate-45 bg-black" />
        <span className="w-4 h-4 rounded-full bg-black" />
        <span className="text-xl font-bold">P</span>
      </div>
    </div>
  );
};

export default HeroText;
