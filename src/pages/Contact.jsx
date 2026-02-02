import Footer from "../components/common/Footer";

// IMAGES
import contactBg from "../assets/collections/1.jpg";
import contactImg1 from "../assets/collections/designer.jpg";
import contactImg2 from "../assets/collections/carbon.jpg";

const Contact = () => {
  return (
    <main className="relative overflow-hidden">
      {/* ================= FIXED HERO (50vh) ================= */}
      <section className="relative h-[50vh] overflow-hidden">
        {/* FIXED BACKGROUND */}
        <div className="fixed blur-xs top-0 left-0 w-full h-[50vh] -z-10">
          <img
            src={contactBg}
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* HERO CONTENT */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <h1 className="text-4xl md:text-6xl text-center font-semibold">
              Contact Us
            </h1>
            <p className="mt-6 max-w-7xl text-white text-shadow-lg/30 text-xl leading-relaxed">
              Have a question, project inquiry, or want to explore our
              collections? Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="relative bg-white pt-[12vh] pb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* LEFT – FORM */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Get in Touch
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed max-w-md">
              Reach out to us for product inquiries, partnerships, or support.
              We’ll respond as quickly as possible.
            </p>

            <form className="mt-10 space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-black"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-black"
              />

              <input
                type="tel"
                placeholder="Contact Number"
                className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-black"
              />

              <input
                type="text"
                placeholder="Address"
                className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-black"
              />

              <textarea
                rows="2"
                placeholder="What are you looking for?"
                className="w-full border-b border-gray-300 py-2 text-sm resize-none focus:outline-none focus:border-black"
              />

              <button
                type="submit"
                className="mt-6 inline-flex items-center justify-center px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
              >
                Submit Inquiry
              </button>
            </form>
          </div>

          {/* RIGHT – PORTRAIT IMAGES */}
          <div className="relative flex justify-center gap-8">
            <div className="w-[260px] h-[500px] rounded-2xl overflow-hidden shadow-2xl -translate-y-8">
              <img
                src={contactImg1}
                alt="Showroom"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-[260px] h-[500px] rounded-2xl overflow-hidden shadow-2xl translate-y-16">
              <img
                src={contactImg2}
                alt="Tiles Display"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="h-[360px] rounded-2xl overflow-hidden shadow-lg">
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

export default Contact;
