import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/blue.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `
    relative text-sm tracking-wide font-medium transition-colors duration-300
    ${
      isActive
        ? "text-black after:w-full"
        : "text-gray-600 hover:text-black after:w-0 hover:after:w-full"
    }
    after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:bg-black
    after:transition-all after:duration-300
  `;

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md border-b border-gray-200" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-12 w-auto object-contain" />
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/collections" className={navLinkClass}>
              Collections
            </NavLink>
            <NavLink to="/catalogue" className={navLinkClass}>
              Catalogue
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
          >
            <span
              className={`absolute h-[2px] w-6 bg-black transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 bg-black transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 bg-black transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-white px-6 py-6 flex flex-col gap-4 border-t border-gray-200">
          {["/", "/about", "/collections", "/contact"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-black transition"
            >
              {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
