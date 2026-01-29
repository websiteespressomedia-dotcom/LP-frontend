import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiTarget, FiEye, FiAward } from "react-icons/fi";

// Images
import heroImg from "../assets/about/bangalore.webp";
import missionImg from "../assets/about/33.jpg";
import visionImg from "../assets/about/44.jpg";
import Footer from "../components/common/Footer";
import tileBg from "../assets/about/carbon.jpg";
import tileLeft from "../assets/about/1.jpg";
import tileRight from "../assets/about/33.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = document.querySelector(".marquee-track");
      // wait one frame so fonts/layout are ready
      // TILE TITLE MARQUEE ANIMATION
      requestAnimationFrame(() => {
        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
          x: `-=${totalWidth}`,
          duration: 10, // 🔥 change speed here
          ease: "linear",
          repeat: -1,
          modifiers: {
            x: (x) => {
              const value = parseFloat(x) % totalWidth;
              return `${value}px`;
            },
          },
        });
      });
      // SHOWROOM MARQUEE ANIMATION
      requestAnimationFrame(() => {
        const track = document.querySelector(".showroom-marquee-track");
        const width = track.scrollWidth / 2;

        gsap.to(track, {
          x: `-=${width}`,
          duration: 26, // slightly slower = elegant CTA
          ease: "linear",
          repeat: -1,
          modifiers: {
            x: (x) => `${parseFloat(x) % width}px`,
          },
        });
      });

      gsap.from(".hero-word.lever", {
        y: 120,
        rotateZ: 12,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });

      gsap.from(".hero-word.pool", {
        y: 160,
        opacity: 0,
        rotateZ: 12,
        duration: 1.3,
        ease: "expo.out",
        // delay: 0.15,
      });

      gsap.from(".hero-word.tiles", {
        y: 200,
        opacity: 0,
        rotateZ: 12,
        duration: 1.4,
        ease: "expo.out",
        // delay: 0.3,
      });

      /* ================= SUB TEXT (SUBTLE) ================= */

      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.2,
      });

      gsap.from(".hero-desc", {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });

      // HARD CUT BACKGROUND SWITCH (ZERO FADE, ZERO BLEND)
      ScrollTrigger.create({
        trigger: ".about-hero",
        start: "bottom top",
        onEnter: () => {
          gsap.set(".bg-hero", { visibility: "hidden" });
          gsap.set(".bg-atelier", { visibility: "visible" });
        },
        onLeaveBack: () => {
          gsap.set(".bg-hero", { visibility: "visible" });
          gsap.set(".bg-atelier", { visibility: "hidden" });
        },
      });
      // HARD CUT TO CONTACT BACKGROUND
      ScrollTrigger.create({
        trigger: ".contact-section",
        start: "top bottom+=1",
        onEnter: () => {
          gsap.set(".bg-atelier", { visibility: "hidden" });
          gsap.set(".bg-contact", { visibility: "visible" });
        },
        onLeaveBack: () => {
          gsap.set(".bg-atelier", { visibility: "visible" });
          gsap.set(".bg-contact", { visibility: "hidden" });
        },
      });

      // HISTORY SLIDES OVER HERO
      gsap.from(".about-history", {
        y: 120,
        scrollTrigger: {
          trigger: ".about-history",
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
      // HISTORY CONTENT REVEAL
      gsap.utils.toArray(".history-item").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 60,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
          duration: 1,
          ease: "power3.out",
        });
      });

      // MISSION & VISION
      gsap.utils.toArray(".mv-block").forEach((block, i) => {
        gsap.from(block, {
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
          },
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.1,
        });
      });
    }, containerRef);

    // INFINITE MARQUEE TITLE
    gsap.to(".marquee-track", {
      xPercent: -33.333,
      repeat: -1,
      duration: 5,
      ease: "linear",
      paused: true,
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="text-black">
      {/* ================= FIXED IMAGE CANVAS ================= */}
      <div className="fixed inset-0 -z-10">
        {/* HERO IMAGE */}
        <img
          className="bg-hero absolute inset-0 w-screen h-screen object-cover visible"
          src={heroImg}
          alt="Hero background"
        />

        {/* ATELIER IMAGE */}
        <img
          className="bg-atelier absolute inset-0 w-screen h-screen object-cover invisible"
          src={tileBg}
          alt="Atelier background"
        />

        {/* CONTACT IMAGE (THIRD IMAGE) */}
        <img
          src={visionImg} // 👈 use your third image here
          className="bg-contact absolute inset-0 w-screen h-screen object-cover invisible"
          alt="Contact"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ================= HERO ================= */}
      <div className="about-hero relative h-screen w-full overflow-hidden">
        <div className="relative z-10 h-full flex justify-center items-center">
          <div className="about-hero-text max-w-4xl px-8 md:px-20 text-white">
            {/* MAIN TITLE */}
            <div className="hero-title flex flex-col text-5xl md:text-8xl font-serif font-normal leading-tight mb-2">
              <span className="hero-word lever">LEVER</span>
              <span className="hero-word pool ml-20 leading-12">POOL</span>
              <span className="hero-word tiles ml-40">TILES</span>
            </div>

            {/* TAGLINE */}
            <div className="hero-sub flex items-center gap-4 mb-14">
              <span className="w-14 h-px bg-orange-400" />
              <span className="text-sm tracking-widest text-orange-400">
                AN EVER-EVOLVING STORY
              </span>
            </div>

            {/* PARAGRAPH */}
            <p className="hero-desc max-w-xl text-sm md:text-base leading-relaxed text-white/90">
              Leverpool is a design-driven brand crafting architectural surfaces
              defined by precision, material depth, and timeless visual
              language. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>

      {/* ================= HISTORY ================= */}
      <section className="about-history relative bg-white py-40">
        <div className="max-w-6xl mx-auto px-6">
          {/* TIMELINE ITEM */}
          <div className="history-item grid grid-cols-[120px_1fr] gap-12 mb-40">
            {/* LEFT – YEAR + LINE */}
            <div className="relative">
              <span className="text-sm font-medium">2013</span>
              <span className="absolute top-6 left-1.5 w-px h-full bg-gray-300" />
            </div>

            {/* RIGHT – CONTENT */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-yellow-600" />
                <span className="text-sm tracking-widest text-yellow-600 uppercase">
                  Italian White Marbles
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl">
                In 2013 the head office moved to the Verona area, the second
                largest Italian center in the stone sector, which offers
                interesting opportunities to meet artists, architects, craftsmen
                and interior designers operating in the world of stone. The new
                headquarters opens new opportunities on the European market and
                brings Carrara to Verona.
              </p>

              <p className="font-semibold max-w-2xl">
                Since 2013, Leverpool boasts the largest collection of Italian
                white marbles at its headquarters.
              </p>
            </div>
          </div>
          <div className="history-item grid grid-cols-[120px_1fr] gap-12 mb-40">
            {/* LEFT – YEAR + LINE */}
            <div className="relative">
              <span className="text-sm font-medium">2013</span>
              <span className="absolute top-6 left-1.5 w-px h-full bg-gray-300" />
            </div>

            {/* RIGHT – CONTENT */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-yellow-600" />
                <span className="text-sm tracking-widest text-yellow-600 uppercase">
                  Italian White Marbles
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl">
                In 2013 the head office moved to the Verona area, the second
                largest Italian center in the stone sector, which offers
                interesting opportunities to meet artists, architects, craftsmen
                and interior designers operating in the world of stone. The new
                headquarters opens new opportunities on the European market and
                brings Carrara to Verona.
              </p>

              <p className="font-semibold max-w-2xl">
                Since 2013, Leverpool boasts the largest collection of Italian
                white marbles at its headquarters.
              </p>
            </div>
          </div>

          {/* TIMELINE ITEM */}
          <div className="history-item grid grid-cols-[120px_1fr] gap-12">
            {/* LEFT – YEAR */}
            <div className="relative">
              <span className="text-sm font-medium">2015</span>
              <span className="absolute top-6 left-1.5 w-px h-full bg-gray-300" />
            </div>

            {/* RIGHT – CONTENT */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-yellow-600" />
                <span className="text-sm tracking-widest text-yellow-600 uppercase">
                  ES Atelier
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed max-w-2xl">
                Continuous collaboration with architectural studios and
                involvement in increasingly important projects led to the
                creation of a new project department dedicated to bespoke and
                experimental work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TILE ATELIER SECTION ================= */}
      <section className="atelier-section relative overflow-visible">
        {/* EDITORIAL MARQUEE TITLE */}
        <div className="atelier-title absolute z-30 inset-0 overflow-hidden pointer-events-none">
          <div className="marquee-wrapper h-full flex items-center">
            <div className="marquee-track flex items-center whitespace-nowrap">
              <h2 className="marquee-text text-[7vw] font-serif text-white/90 leading-none mx-7">
                LEVERPOOL TILES
              </h2>
              <h2 className="marquee-text text-[7vw] font-serif text-white/90 leading-none mx-7">
                LEVERPOOL TILES
              </h2>
              <h2 className="marquee-text text-[7vw] font-serif text-white/90 leading-none mx-7">
                LEVERPOOL TILES
              </h2>
              <h2 className="marquee-text text-[7vw] font-serif text-white/90 leading-none mx-7">
                LEVERPOOL TILES
              </h2>
            </div>
          </div>
        </div>

        {/* FOREGROUND CONTENT (MASKED SCROLL) */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="atelier-content relative flex justify-between items-center">
              {/* LEFT IMAGE */}
              <div className="atelier-image-left ml-50 mt-20 mb-40 w-[25%]">
                <img
                  src={tileLeft}
                  alt="Atelier Tile"
                  className="w-full h-[55vh] object-cover"
                />
              </div>

              {/* RIGHT IMAGE */}
              <div className="absolute z-20 top-65 left-160 w-[30%]">
                <img
                  src={tileRight}
                  alt="Atelier Tile"
                  className="w-full h-[65vh] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SHOWROOM / MISSION / VISION ================= */}
      <section className="relative bg-white pt-50 pb-40 overflow-hidden">
        {/* TOP CONTENT */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-10 items-start">
          {/* IMAGE 1 */}
          <div className="col-span-3 mt-25">
            <img
              src={missionImg}
              alt="Showroom 1"
              className="w-full h-[40vh] object-cover"
            />
          </div>

          {/* IMAGE 2 */}
          <div className="col-span-3 ">
            <img
              src={visionImg}
              alt="Showroom 2"
              className="w-full h-[40vh] object-cover"
            />
          </div>

          {/* IMAGE 3 */}
          <div className="col-span-3 mt-25">
            <img
              src={tileLeft}
              alt="Showroom 3"
              className="w-full h-[40vh] object-cover"
            />
          </div>

          {/* TEXT COLUMN */}
          <div className="col-span-3 pl-6">
            <p className="text-sm leading-relaxed text-gray-700 mb-6">
              In 2020 the headquarters moved to a new single location in the
              Verona area – 17,000 m² of internal exhibition space and 50,000 m²
              of incredibly suggestive external area.
            </p>

            <p className="text-sm leading-relaxed text-gray-700">
              Here one of the largest collections of Italian marbles, slabs and
              blocks is exhibited, gathered in one place to be admired and
              selected for prestigious projects, yachts, private jets or
              luxurious villas. In this space open to all creatives and lovers
              of beauty, it is possible to admire the most beautiful and
              precious slabs, dream and imagine.
            </p>
          </div>
        </div>

        {/* HUGE EDITORIAL TITLE */}
        <div className="relative mt-5 inset-0 overflow-hidden pointer-events-none">
          <div className="marquee-wrapper h-full flex items-center">
            <div className="showroom-marquee-track flex items-center whitespace-nowrap">
              <h2 className="marquee-text text-[7vw] font-serif text-black/90 leading-none mx-7">
                VISIT OUR SHOWROOM
              </h2>
              <h2 className="marquee-text text-[7vw] font-serif text-black/90 leading-none mx-7">
                VISIT OUR SHOWROOM
              </h2>
              <h2 className="marquee-text text-[7vw] font-serif text-black/90 leading-none mx-7">
                VISIT OUR SHOWROOM
              </h2>
              <h2 className="marquee-text text-[7vw] font-serif text-black/90 leading-none mx-7">
                VISIT OUR SHOWROOM
              </h2>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 text-sm tracking-widest text-black uppercase"
          >
            {/* <span className="text-yellow-600">››</span> */}
            Visit our showroom in Bangalore
          </a>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="contact-section relative z-10 py-40 overflow-hidden">
        <div className="max-w-7xl text-white mx-auto px-6 grid grid-cols-12 gap-12 items-start">
          {/* LEFT CONTENT */}
          <div className="col-span-5">
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Contact <br /> Leverpool Tiles
            </h2>

            <p className="text-white leading-relaxed mb-10 max-w-md">
              Whether you are an architect, designer or private client, our team
              is ready to assist you in selecting the most refined surfaces for
              your project.
            </p>

            <p className="text-sm text-white">
              info@leverpooltiles.com <br />
              +91 98765 43210
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="col-span-7">
            <form className="grid grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="border-b border-gray-300 py-3 outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                className="border-b border-gray-300 py-3 outline-none"
              />

              <input
                type="text"
                placeholder="Company"
                className="border-b border-gray-300 py-3 outline-none col-span-2"
              />

              <textarea
                placeholder="Tell us about your project"
                rows={4}
                className="border-b border-gray-300 py-3 outline-none col-span-2 resize-none"
              />

              <div className="col-span-2 mt-6">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 text-sm tracking-widest uppercase"
                >
                  {/* <span className="text-yellow-600">››</span> */}
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* ================= FOOTER ================= */}
      <Footer transparent />
    </section>
  );
};

export default About;
