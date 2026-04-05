import React, { useState, useEffect } from "react";
import Login from "./Login.jsx";
import Profile from "../Sections/Profile.jsx";
import SkillsSection from "../Sections/Skills.jsx";
import ProjectsSection from "../Sections/Projects.jsx";
import CertificatesSection from "../Sections/Certificates.jsx";
import TestimonialsSection from "../Sections/Testimonial.jsx";
import StorageSection from "../Sections/Storage.jsx";

import "./Styles/admin.css";;

/* ─── NAV CONFIG ─── */
const NAV = [
  {
    key: "profile",
    label: "Profile",
    sub: "Identity",
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    key: "skills",
    label: "Skills",
    sub: "Tech stack",
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    key: "projects",
    label: "Projects",
    sub: "Portfolio",
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    key: "certificates",
    label: "Certificates",
    sub: "Credentials",
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="6" />
        <path d="M9 22l3-3 3 3 3-7-3 1-3-1-3 7" />
      </svg>
    ),
  },
  {
    key: "testimonials",
    label: "Testimonials",
    sub: "Feedback",
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
   {
    key: "storage",
    label: "Storage",
    sub: "Usage",
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

const PAGE_META = {
  profile:      { title: "Profile",      sub: "Manage your identity" },
  skills:       { title: "Skills",       sub: "Tech stack & proficiency" },
  projects:     { title: "Projects",     sub: "Portfolio showcase" },
  certificates: { title: "Certificates", sub: "Credentials & awards" },
  testimonials: { title: "Testimonials", sub: "Client feedback" },
  storage:      { title: "Storage",      sub: "Usage Overview" },
};

/* ─── SUN ICON ─── */
const IconSun = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1"  x2="12" y2="3"  />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"  />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1"  y1="12" x2="3"  y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
  </svg>
);

/* ─── MOON ICON ─── */
const IconMoon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
  </svg>
);

/* ════════════════════════════════════════════════════════════
   ADMIN PANEL
   ════════════════════════════════════════════════════════════ */
const AdminPanel = () => {
  const [authed, setAuthed] = useState(false);
  const [active, setActive] = useState("profile");

  /* Read saved preference, default to light */
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("ap-theme") === "dark"; }
    catch { return false; }
  });

  /* Apply theme to <html data-theme="..."> so CSS vars flip everywhere */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    try { localStorage.setItem("ap-theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (token) setAuthed(true);
  }, []);

  const logout = () => {
    sessionStorage.removeItem("adminToken");
    setAuthed(false);
  };

  const SECTION_MAP = {
    profile:      <Profile />,
    skills:       <SkillsSection />,
    projects:     <ProjectsSection />,
    certificates: <CertificatesSection />,
    testimonials: <TestimonialsSection />,
    storage:      <StorageSection />
  };

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  const meta = PAGE_META[active];

  return (
    <div className="admin-layout">

      {/* ══════════ SIDEBAR ══════════ */}
      <aside className="sidebar">

        {/* Logo */}
        <div className="sidebar-logo">
          <h1>ADMIN<span>.</span></h1>
          <p>Portfolio CMS</p>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">Navigation</div>
          {NAV.map((item) => (
            <div
              key={item.key}
              className={`nav-item${active === item.key ? " active" : ""}`}
              onClick={() => setActive(item.key)}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">

          {/* Dark / Light toggle */}
          <div
            className="theme-toggle"
            onClick={() => setDark((d) => !d)}
            role="button"
            aria-label="Toggle dark mode"
          >
            <div className="theme-toggle-label">
              {dark ? <IconSun /> : <IconMoon />}
              {dark ? "Light Mode" : "Dark Mode"}
            </div>
            <div className={`toggle-track${dark ? " on" : ""}`}>
              <div className="toggle-thumb" />
            </div>
          </div>

          {/* Logout */}
          <button className="logout-btn" onClick={logout}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ══════════ MAIN ══════════ */}
      <main className="main-content">

        {/* Top bar */}
        <div className="page-header">
          <div className="page-header-left">
            <h2>{meta.title.toUpperCase()}</h2>
            <div className="header-divider" />
            <p>{meta.sub}</p>
          </div>
          <div className="page-header-right">
            <div className="status-dot" />
            <span className="status-txt">Live</span>
          </div>
        </div>

        {/* Section — key forces remount + fadeUp animation on tab switch */}
        <div className="content-area" key={active}>
          {SECTION_MAP[active]}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;