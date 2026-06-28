import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("selected-theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (!header) return;
      if (window.scrollY >= 50) {
        header.classList.add("scroll-header");
      } else {
        header.classList.remove("scroll-header");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ NEW — auto-close mobile menu/overlay when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("selected-theme", "dark");
      localStorage.setItem("selected-icon", "ri-sun-line");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("selected-theme", "light");
      localStorage.setItem("selected-icon", "ri-moon-line");
    }
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <a href="#home" className="nav__logo">Krishnkant Modi</a>

        {menuOpen && (
          <div
            className="nav__overlay"
            onClick={closeMenu}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 98,
              background: "rgba(0,0,0,0.18)",
              backdropFilter: "blur(2px)",
            }}
          />
        )}

        <div className={`nav__menu ${menuOpen ? "show-menu" : ""}`} id="nav-menu">
          <a href="#home" className="nav__link" onClick={closeMenu}>Home</a>
          <a href="#skills" className="nav__link" onClick={closeMenu}>Skills</a>
          <a href="#qualification" className="nav__link" onClick={closeMenu}>Qualification</a>
          <a href="#services" className="nav__link" onClick={closeMenu}>Services</a>
          <a href="#certifications" className="nav__link" onClick={closeMenu}>Certificates</a>
          <a href="#projects" className="nav__link" onClick={closeMenu}>Projects</a>
          <a href="#contact" className="nav__link" onClick={closeMenu}>Contact</a>
        </div>

        <div className="nav__actions">
          <button className="nav__dark" id="theme-button" onClick={toggleDarkMode} aria-label="Toggle theme">
            <i className={darkMode ? "ri-sun-line" : "ri-moon-line"}></i>
          </button>
          <button className="nav__toggle" id="nav-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
