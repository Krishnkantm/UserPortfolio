// import React, { useEffect, useState } from "react";

// const Navbar = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Load saved theme on mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("selected-theme");
//     const savedIcon  = localStorage.getItem("selected-icon");

//     if (savedTheme === "dark") {
//       document.body.classList.add("dark-theme"); // ✅ body — not documentElement
//       setDarkMode(true);
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     const isDark = !darkMode;
//     setDarkMode(isDark);

//     if (isDark) {
//       document.body.classList.add("dark-theme");    // ✅ body
//       localStorage.setItem("selected-theme", "dark");
//       localStorage.setItem("selected-icon", "ri-sun-line");
//     } else {
//       document.body.classList.remove("dark-theme"); // ✅ body
//       localStorage.setItem("selected-theme", "light");
//       localStorage.setItem("selected-icon", "ri-moon-line");
//     }
//   };

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   // Close menu when link clicked
//   const closeMenu = () => setMenuOpen(false);

//   return (
//     <header className="header" id="header">
//       <nav className="nav container">
//         <a href="#home" className="nav__logo">Krishnkant Modi</a>

//         <div
//           className={`nav__menu ${menuOpen ? "show-menu" : ""}`}
//           id="nav-menu"
//         >
//           <a href="#home"          className="nav__link" onClick={closeMenu}>Home</a>
//           <a href="#skills"        className="nav__link" onClick={closeMenu}>Skills</a>
//           <a href="#qualification" className="nav__link" onClick={closeMenu}>Qualification</a>
//           <a href="#services"      className="nav__link" onClick={closeMenu}>Services</a>
//           <a href="#certifications"  className="nav__link" onClick={closeMenu}>Certificates</a>
//           <a href="#projects"      className="nav__link" onClick={closeMenu}>Projects</a>
//           <a href="#contact"       className="nav__link" onClick={closeMenu}>Contact</a>
//         </div>

//         <div className="nav__actions">
//           <button className="nav__dark" id="theme-button" onClick={toggleDarkMode}>
//             <i className={darkMode ? "ri-sun-line" : "ri-moon-line"}></i>
//           </button>

//           <button className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
//             <i className="ri-menu-line"></i>
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("selected-theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      setDarkMode(true);
    }
  }, []);

  // ✅ Scroll effect — only for shadow, NOT background color
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (!header) return;
      // Only add scroll class for shadow — nav stays transparent via CSS
      if (window.scrollY >= 50) {
        header.classList.add("scroll-header");
      } else {
        header.classList.remove("scroll-header");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);

    // ✅ Only toggle body class — nav transparency is handled purely by CSS
    // No inline styles, no JS nav background changes
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
  const closeMenu  = () => setMenuOpen(false);

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <a href="#home" className="nav__logo">Krishnkant Modi</a>

        {/* Mobile overlay — closes menu on outside click */}
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

        <div
          className={`nav__menu ${menuOpen ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <a href="#home"           className="nav__link" onClick={closeMenu}>Home</a>
          <a href="#skills"         className="nav__link" onClick={closeMenu}>Skills</a>
          <a href="#qualification"  className="nav__link" onClick={closeMenu}>Qualification</a>
          <a href="#services"       className="nav__link" onClick={closeMenu}>Services</a>
          <a href="#certifications" className="nav__link" onClick={closeMenu}>Certificates</a>
          <a href="#projects"       className="nav__link" onClick={closeMenu}>Projects</a>
          <a href="#contact"        className="nav__link" onClick={closeMenu}>Contact</a>
        </div>

        <div className="nav__actions">
          {/* Theme toggle — only changes body class, nav stays transparent */}
          <button
            className="nav__dark"
            id="theme-button"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            <i className={darkMode ? "ri-sun-line" : "ri-moon-line"}></i>
          </button>

          {/* Hamburger toggle */}
          <button
            className="nav__toggle"
            id="nav-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;