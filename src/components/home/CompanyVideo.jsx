// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import aboutjpg from "../../assets/about-page.jpg";
// import aboutvideo from "../../assets/test.mp4";

// gsap.registerPlugin(ScrollTrigger);

// const CompanyVideo = () => {
//   const sectionRef = useRef(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(".video-animate", {
//         opacity: 0,
//         y: 50,
//         duration: 1,
//         ease: "power1.out",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 50%",
//           toggleActions: "play none none none",
//         },
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* HEADER */}
//         <div className="video-animate max-w-2xl mb-10">
//           <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
//             Our Manufacturing Process
//           </h2>
//           <p className="mt-4 text-gray-600 leading-relaxed">
//             Discover how advanced technology, skilled craftsmanship, and strict
//             quality control come together to create tiles that stand the test of
//             time.
//           </p>
//         </div>

//         {/* VIDEO */}
//         <div className="video-animate relative w-full rounded-xl overflow-hidden bg-black">
//           <video
//             className="w-full h-auto"
//             src={aboutvideo}
//             controls
//             preload="metadata"
//             poster= {aboutjpg}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CompanyVideo;


import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutjpg from "../../assets/services/quality.jpg";
import aboutvideo from "../../assets/test.mp4";

gsap.registerPlugin(ScrollTrigger);

const CompanyVideo = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".video-animate", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="video-animate max-w-3xl mb-14">
          <span className="text-xs uppercase tracking-widest text-gray-400">
            Behind the scenes
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            Our Manufacturing Process
          </h2>

          <p className="mt-5 text-gray-600 leading-relaxed text-lg">
            Discover how advanced technology, skilled craftsmanship, and strict
            quality control come together to create tiles that stand the test of
            time.
          </p>
        </div>

        {/* VIDEO */}
        <div className="video-animate relative w-full rounded-2xl overflow-hidden bg-black shadow-2xl">
          {/* OVERLAY GRADIENT */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-10" />

          <video
            className="w-full h-auto object-cover"
            src={aboutvideo}
            controls
            preload="metadata"
            poster={aboutjpg}
          />
        </div>
      </div>
    </section>
  );
};

export default CompanyVideo;
