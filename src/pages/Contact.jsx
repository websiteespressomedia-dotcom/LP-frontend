import Footer from "../components/common/Footer";

// IMAGES
import contactBg from "../assets/collections/1.jpg";
// import contactImg1 from "../assets/collections/designer.jpg";
// import contactImg2 from "../assets/collections/carbon.jpg";
import faqImage from "../assets/collections/designer.jpg"; // change if needed
import { useEffect, useRef, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosCall, IoIosMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { GrPersonalComputer } from "react-icons/gr";
import { FaHourglassHalf } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import gsap from "gsap";

const Contact = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const FAQS = [
    {
      q: "Do you provide tile samples before bulk orders?",
      a: "Yes, we provide samples for selected collections so you can evaluate finish, texture, and quality before placing bulk orders.",
    },
    {
      q: "What sizes and finishes are available?",
      a: "Our tiles are available in multiple sizes and finishes including glossy, matte, satin, and outdoor-grade surfaces.",
    },
    {
      q: "Are your tiles suitable for parking and outdoor areas?",
      a: "Yes, we manufacture heavy-duty and anti-skid tiles specifically designed for parking and outdoor usage.",
    },
    {
      q: "Do you deliver across India?",
      a: "We offer pan-India delivery through our logistics partners. Delivery timelines depend on order volume and location.",
    },
    {
      q: "Do you work with architects and interior designers?",
      a: "Absolutely. We collaborate closely with architects, designers, and builders on residential and commercial projects.",
    },
  ];

  return (
    <main className="relative overflow-hidden">
      {/* ================= FIXED HERO (50vh) ================= */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* FIXED BACKGROUND */}
        <div className="fixed blur-xs top-0 left-0 w-full h-[70vh] -z-10">
          <img
            src={contactBg}
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* HERO CONTENT */}

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full relative">
            {/* ================= LEFT HEADING ================= */}
            <h1 className="text-5xl md:text-7xl uppercase text-white font-semibold tracking-wide">
              Contact Us
            </h1>

            {/* ================= RIGHT HANGING ICONS ================= */}
            <div className="hidden md:block absolute top-0 right-25 h-full">
              <div className="relative bottom-60 h-full flex items-start gap-2">
                <HangingKeychain icon="phone" stringHeight="h-60" index={0} />

                <HangingKeychain
                  icon="mail"
                  stringHeight="h-68"
                  index={1} // 👈 longest middle
                />

                <HangingKeychain
                  icon="location"
                  stringHeight="h-64"
                  index={2}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="relative bg-white pt-[12vh] pb-50">
        <div className="absolute top-[-139px] left-0 w-full overflow-hidden leading-none z-20">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-[140px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C240,90 480,120 720,120 960,120 1200,90 1440,40 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start relative z-30">
          {/* ================= LEFT CONTENT ================= */}
          <div className="text-black">
            <span className="uppercase tracking-widest text-sm text-white/60">
              Contact
            </span>

            <h2 className="mt-3 text-5xl font-semibold leading-tight">
              Reach out and our
              <br />
              team will help you
            </h2>

            {/* INFO LIST */}
            <div className="mt-30 space-y-8 text-sm text-black/80">
              <div className="flex justify-between items-center border-b border-black/10 pb-4">
                <div className="flex items-center gap-3">
                  <span>
                    <IoIosMail className="text-4xl border rounded-sm text-white border-black bg-gray-800 px-1" />
                  </span>
                  <span>General Inquiries</span>
                </div>
                <span>support@yourdomain.com</span>
              </div>

              <div className="flex justify-between items-center border-b border-black/10 pb-4">
                <div className="flex items-center gap-3">
                  <span>
                    <GrPersonalComputer className="text-4xl border rounded-sm text-white border-black bg-gray-800 px-1" />
                  </span>
                  <span>Sales & Demos</span>
                </div>
                <span>sales@yourdomain.com</span>
              </div>

              <div className="flex justify-between items-center border-b border-black/10 pb-4">
                <div className="flex items-center gap-3">
                  <span>
                    <FaHourglassHalf className="text-4xl border rounded-sm text-white border-black bg-gray-800 px-1 py-1" />
                  </span>
                  <span>Office Hours</span>
                </div>
                <span>Mon–Fri · 9:00–18:00</span>
              </div>
            </div>
          </div>

          {/* ================= FORM CARD ================= */}
          <div
            className="
              relative
              rounded-3xl
              bg-gradient-to-b from-[#2a2a2a] to-[#151515]
              border border-white/10
              p-10
              shadow-2xl
              overflow-hidden
            "
          >
            {/* FORM */}
            <form className="space-y-6 text-white">
              {/* GRID INPUTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm mb-2 block">Name*</label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="text-sm mb-2 block">Email*</label>
                  <input
                    type="email"
                    placeholder="jane@gmail.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm mb-2 block">Company*</label>
                <input
                  type="text"
                  placeholder="Your company…"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-sm mb-2 block">Message*</label>
                <textarea
                  rows="4"
                  placeholder="Your message…"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-white/30"
                />
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between mt-10">
                <p className="text-xs text-white/50 max-w-xs">
                  By sending this form, you agree to our Terms & Conditions and
                  Privacy Policy.
                </p>

                <button
                  type="submit"
                  className="bg-white cursor-pointer text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* WHITE GLOW */}
            <div
              className="
                absolute bottom-0 left-0 w-full h-32
                bg-gradient-to-t from-white/30 to-transparent
                pointer-events-none
              "
            />
          </div>
        </div>

        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
          <svg
            viewBox="0 0 1440 140"
            className="block w-full h-[100px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,140 
                C240,40 480,0 720,0 
                960,0 1200,40 1440,140 
                L1440,140 L0,140 Z"
              fill="#f3f4f6" /* bg-gray-100 */
            />
          </svg>
        </div>
      </section>
      {/* ================= FAQ SECTION ================= */}
      <section className="bg-gray-100 text-black py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* LEFT TITLE */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="uppercase tracking-widest text-sm text-black/80">
                FAQ
              </span>

              <h2 className="mt-6 text-5xl font-semibold leading-tight">
                Frequently asked
                <br />
                questions
              </h2>
            </div>
            <div className="w-[120px] max-w-md rounded-xl overflow-hidden shadow-2xl">
              <img
                src={faqImage}
                alt="Our Workspace"
                className="w-full h-[100px] object-cover"
              />
            </div>
          </div>

          {/* RIGHT ACCORDION */}
          <div className="space-y-4">
            {FAQS.map((item, idx) => (
              <FaqItem
                key={idx}
                index={idx}
                question={item.q}
                answer={item.a}
                activeFaq={activeFaq}
                setActiveFaq={setActiveFaq}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="h-[500px] rounded-2xl overflow-hidden shadow-lg">
            {/* Replace iframe src with real Google Maps */}
            <iframe
              title="Google Map"
              src="https://maps.google.com/maps?q=Morbi%20Gujarat&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

const FaqItem = ({ index, question, answer, activeFaq, setActiveFaq }) => {
  const isOpen = activeFaq === index;

  return (
    <div
      className={`
        bg-white/5
        border border-white/10
        rounded-2xl
        px-6
        py-5
        transition-all
        duration-300
        ${isOpen ? "ring-1 ring-white/20" : ""}
      `}
    >
      <button
        onClick={() => setActiveFaq(isOpen ? null : index)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-lg font-medium">{question}</span>

        <span
          className={`
            text-xl
            transition-transform duration-300 ease-out
            ${isOpen ? "rotate-90" : "rotate-0"}
          `}
        >
          {isOpen ? <FiX /> : <FiPlus />}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden text-black/70 text-sm leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

const HangingKeychain = ({ icon, stringHeight, index }) => {
  const chainRef = useRef(null);
  const Icon =
    icon === "phone" ? MdCall : icon === "mail" ? IoIosMail : FaMapMarkerAlt;

    useEffect(() => {
    const el = chainRef.current;
    if (!el) return;

    // subtle variation per chain
    const rotation = [1.5, 2.5, 1.8][index];
    const duration = [1.8, 2.0, 2.3][index];
    const delay = index * 0.4;

    gsap.set(el, {
      transformOrigin: "50% 0%", // 👈 pivot from top (string)
    });

    gsap.to(el, {
      x:2,
      rotate: rotation,
      duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay,
    });
  }, [index]);
  // depth rules
  const depthStyles = ["z-30 top-0 -mr-6", "z-20 top-0 -mr-6", "z-10 top-0"];

  return (
    <div
    ref={chainRef}
      className={`
        relative flex flex-col items-center
        ${depthStyles[index]}
      `}
    >
      {/* STRING */}
      <div className={`w-[2px] ${stringHeight} bg-white/60`} />

      {/* PIN DOT */}
      <div className="w-1.5 h-1.5 rounded-full bg-white/80 -mt-1 z-20" />

      {/* KEYCHAIN CIRCLE */}
      <div
        className="
          -mt-2
          w-24 h-24
          rounded-full
          bg-[#d13737]/95
          border border-white/40
          flex items-center justify-center
          shadow-[12px_18px_20px_rgba(0,0,0,0.6)]
        "
      >
        <Icon className="text-white text-5xl" />
      </div>
    </div>
  );
};

export default Contact;
