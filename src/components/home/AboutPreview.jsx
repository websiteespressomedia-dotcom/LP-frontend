import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutabstract from "../../assets/about-abstract.avif";
import aboutright from "../../assets/about-right.avif";
import aboutleft from "../../assets/about-left.avif";

gsap.registerPlugin(ScrollTrigger);

const AboutPreview = () => {
  const sectionRef = useRef(null);
  const maskImageRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // LEFT abstract image (slow)
      gsap.fromTo(
        ".about-img-abstract",
        { y: 60 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // RIGHT portrait (slightly faster)
      gsap.fromTo(
        ".about-img-right",
        { y: 80 },
        {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // LEFT bottom portrait (medium)
      gsap.fromTo(
        ".about-img-left",
        { y: 100 },
        {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      // STICKY TEXT (left title + right paragraph)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top", // stick when section hits top
        end: "bottom 50%", // unstick when section bottom hits 50% viewport
        pin: ".about-sticky-text",
        pinSpacing: false, // prevents extra white space
      });
    }, sectionRef);

    gsap.fromTo(
      headingRef.current,
      { backgroundPosition: "0% 50%" },
      {
        backgroundPosition: "100% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-32">
        {/* TOP ROW */}
        <div className="relative flex justify-between items-start">
          {/* STICKY TEXT WRAPPER */}
          <div className="about-sticky-text w-full flex justify-between items-start z-10">
            {/* LEFT TITLE */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>
            <h2
              ref={headingRef}
              className="
              text-6xl
              font-bold
              uppercase
              tracking-widest
              text-transparent
              bg-clip-text
              bg-[linear-gradient(120deg,#ffffff,#ff7a18,#3b82f6,#ffffff)]
              bg-[length:300%_300%]
            "
            >
              Who we are
            </h2>

            {/* RIGHT TEXT */}
            <div className="max-w-sm text-[18px] font-semibold leading-relaxed text-gray-300">
              <p>
                We are a team of passionate creatives dedicated
                to crafting striking visual narratives. Specializing in
                photography, videography, and creative direction, we bring
                brands, stories, and concepts to life with a refined artistic
                touch.
              </p>

              <Link
                to="/about"
                className="mt-6 inline-block text-gray-300 hover:text-white transition-colors duration-300"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>

        {/* IMAGE FIELD */}
        <div className="relative mt-32 h-[900px]">
          {/* Abstract image (top-left) */}
          <div className="about-img-abstract absolute top-0 left-0 w-[320px] h-[220px] overflow-hidden">
            <img
              src={aboutabstract}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right portrait */}
          <div className="about-img-right absolute top-24 right-0 w-[360px] h-[480px] overflow-hidden">
            <img
              src={aboutright}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom-left portrait */}
          <div className="about-img-left absolute bottom-0 left-0 w-[360px] h-[480px] overflow-hidden">
            <img
              src={aboutleft}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
