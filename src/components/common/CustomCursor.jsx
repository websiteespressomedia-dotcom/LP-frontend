import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
   const innerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // FOLLOW MOUSE
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.7,
        ease: "power1.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
     <div
      ref={cursorRef}
      className="
        fixed top-0 left-0
        pointer-events-none
        z-[9999]
        -translate-x-1/2 -translate-y-1/2
      "
    >
      <div
        ref={innerRef}
        className="
          cursor-pill
          px-3 py-1.5
          rounded-full
          bg-black/70
          text-white
          text-lg
          font-semibold
          tracking-widest
          uppercase
          scale-0
          shadow-lg
        "
      >
        CLICK
      </div>
    </div>

  );
};

export default CustomCursor;
