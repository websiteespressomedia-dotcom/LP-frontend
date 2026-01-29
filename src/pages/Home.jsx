import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import WhatWeDo from "../components/home/WhatWeDo";
import CollectionsPreview from "../components/home/CollectionsPreview";
import CompanyVideo from "../components/home/CompanyVideo";
import Testimonials from "../components/home/Testimonials";
import ContactPreview from "../components/home/ContactPreview";
import HeroText from "../components/home/HeroText";
import Footer from "../components/common/Footer";
import CategoryStrip from "../components/home/CategoryStrip";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  return (
    <div className="pt-16">
      {/* Background hero text */}
      <HeroText />

      {/* Hero section */}
      <section className="bg-black">
        <Hero />
      </section>

      {/* All other sections – normal flow */}
      <section className="relative z-10 bg-white">
        <CollectionsPreview />
      </section>
      {/* About section – THIS is the trigger */}
      <section
        id="about-trigger"
        className="relative z-10 bg-white min-h-screen"
      >
        <AboutPreview />
      </section>

      <section className="relative z-10 bg-white">
        <CategoryStrip />
      </section>

      <section className="relative z-10 bg-white">
        <CompanyVideo />
      </section>

      {/* <section className="relative z-10 bg-white">
        <Testimonials />
      </section>

      <section className="relative z-10 bg-white">
        <ContactPreview />
      </section> */}

      <section className="relative z-10 bg-white">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
