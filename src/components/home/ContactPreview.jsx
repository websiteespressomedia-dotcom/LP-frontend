import { Link } from "react-router-dom";

const ContactPreview = () => {
  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Let’s Work Together
            </h2>

            <p className="mt-6 text-gray-300 leading-relaxed max-w-md">
              Have a project in mind or want to explore our tile collections?
              Get in touch with our team and we’ll help you find the perfect solution.
            </p>

            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center text-sm font-medium border-b border-white hover:opacity-80 transition"
              >
                Visit full contact page
              </Link>
            </div>
          </div>

          {/* FORM */}
          <form className="bg-white text-gray-900 rounded-2xl p-8 shadow-lg">
            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell us about your project"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition"
              >
                Send Message
              </button>

            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default ContactPreview;
