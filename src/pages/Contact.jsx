import Footer from "../components/common/Footer";

const Contact = () => {
  return (
    <main className="pt-16">
      
      {/* PAGE HERO */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Contact Us
          </h1>
          <p className="mt-6 max-w-2xl text-gray-300 leading-relaxed">
            Have a question, project inquiry, or want to explore our collections?
            Our team is here to help.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* LEFT INFO */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Get in Touch
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed max-w-md">
              Reach out to us for product inquiries, partnerships, or support.
              We’ll respond as quickly as possible.
            </p>

            <div className="mt-10 space-y-4 text-sm text-gray-700">
              <p>
                <span className="font-medium">Address:</span><br />
                Morbi, Gujarat, India
              </p>
              <p>
                <span className="font-medium">Phone:</span><br />
                +91 98765 43210
              </p>
              <p>
                <span className="font-medium">Email:</span><br />
                info@tilestudio.com
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <form className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Tell us about your requirements"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="h-[320px] rounded-xl bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
            Map integration (Google Maps / iframe)
          </div>
        </div>
      </section>
<Footer/>
    </main>
  );
};

export default Contact;
