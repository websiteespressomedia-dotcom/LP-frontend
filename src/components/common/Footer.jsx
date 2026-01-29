import { Link } from "react-router-dom";

const Footer = ({ transparent = false }) => {
  return (
    <footer className={`${transparent ? "bg-transparent backdrop-blur-xs border-t border-white/20 text-white" : "bg-gray-950"} text-gray-300 `}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* BRAND */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Leverpool<span className="font-bold">Tiles</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Crafting premium tiles with modern design, durability, and
              innovation for residential and commercial spaces.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-white transition">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              What We Do
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>Tile Design & Innovation</li>
              <li>Manufacturing Excellence</li>
              <li>Quality Assurance</li>
              <li>Custom Solutions</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                📍 Morbi, Gujarat, India
              </li>
              <li>
                📞 +91 98765 43210
              </li>
              <li>
                ✉️ info@leverpooltiles.com
              </li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Leverpool. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
