import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("selected-theme");
    const savedIcon  = localStorage.getItem("selected-icon");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme"); // ✅ body — not documentElement
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);

    if (isDark) {
      document.body.classList.add("dark-theme");    // ✅ body
      localStorage.setItem("selected-theme", "dark");
      localStorage.setItem("selected-icon", "ri-sun-line");
    } else {
      document.body.classList.remove("dark-theme"); // ✅ body
      localStorage.setItem("selected-theme", "light");
      localStorage.setItem("selected-icon", "ri-moon-line");
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu when link clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <a href="#home" className="nav__logo">Krishnkant Modi</a>

        <div
          className={`nav__menu ${menuOpen ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <a href="#home"          className="nav__link" onClick={closeMenu}>Home</a>
          <a href="#skills"        className="nav__link" onClick={closeMenu}>Skills</a>
          <a href="#qualification" className="nav__link" onClick={closeMenu}>Qualification</a>
          <a href="#services"      className="nav__link" onClick={closeMenu}>Services</a>
          <a href="#certifications"  className="nav__link" onClick={closeMenu}>Certificates</a>
          <a href="#projects"      className="nav__link" onClick={closeMenu}>Projects</a>
          <a href="#contact"       className="nav__link" onClick={closeMenu}>Contact</a>
        </div>

        <div className="nav__actions">
          <button className="nav__dark" id="theme-button" onClick={toggleDarkMode}>
            <i className={darkMode ? "ri-sun-line" : "ri-moon-line"}></i>
          </button>

          <button className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;