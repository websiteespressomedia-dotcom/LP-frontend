import { useLayoutEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Rajesh Mehta",
    role: "Architect",
    message:
      "The tile quality and finishing exceeded our expectations. Their collections fit perfectly with modern architectural designs.",
  },
  {
    id: 2,
    name: "Anita Sharma",
    role: "Interior Designer",
    message:
      "Excellent designs, consistent quality, and reliable delivery. Highly recommended for premium interior projects.",
  },
  {
    id: 3,
    name: "Vikram Patel",
    role: "Builder",
    message:
      "We’ve used their tiles across multiple commercial projects. Strong, durable, and visually impressive.",
  },
  {
    id: 4,
    name: "Neha Kapoor",
    role: "Homeowner",
    message:
      "Beautiful tiles with great texture and finish. The service and support team were extremely helpful.",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-section", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="testimonial-section py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Trusted by architects, designers, and builders across the industry.
          </p>
        </div>

        {/* SWIPER (NO GSAP ON SLIDES) */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="h-full bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                
                <div className="text-4xl text-gray-300 leading-none mb-4">“</div>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {item.message}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium text-sm">
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.role}
                    </p>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Testimonials;
