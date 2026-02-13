import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import SmoothScroll from "./components/common/SmoothScroll";
import CustomCursor from "./components/common/CustomCursor";
import Catalogue from "./pages/Catalogue";
import CatalogueViewerPage from "./components/catalogue/CatalogueViewerPage";
import TileDetail from "./pages/TileDetail";

const App = () => {
  return (
    <>
      <SmoothScroll>
        <CustomCursor />
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collections">
            <Route index element={<Collections />} />
            <Route path=":size/:slug" element={<TileDetail />} />
          </Route>

          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/catalogue/viewer" element={<CatalogueViewerPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        {/* <Footer /> */}
      </SmoothScroll>
    </>
  );
};

export default App;
