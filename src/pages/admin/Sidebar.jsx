import React from "react";
import "./Styles/admin.css";

// WHY props: Sidebar is a "dumb" display component
// Parent (AdminPanel) holds the active state and passes it down
// This keeps logic in one place

const NAV_ITEMS = [
  { key: "profile",      icon: "ri-user-line",        label: "Profile"       },
  { key: "skills",       icon: "ri-tools-line",        label: "Skills"        },
  { key: "projects",     icon: "ri-code-box-line",     label: "Projects"      },
  { key: "certificates", icon: "ri-award-line",        label: "Certificates"  },
  { key: "testimonials", icon: "ri-chat-quote-line",   label: "Testimonials"  },
  { key: "storage",      icon: "ri-hdd-line",         label: "Storage"       },
];

const Sidebar = ({ active, setActive, logout }) => {
  return (
    <aside className="sidebar">

      {/* Brand */}
      <div className="sidebar__brand">
        <div className="sidebar__avatar">K</div>
        <div>
          <p className="sidebar__name">Krishnkant</p>
          <p className="sidebar__role">Administrator</p>
        </div>
      </div>

      <div className="sidebar__divider" />

      {/* Navigation */}
      <nav className="sidebar__nav">
        <p className="sidebar__section-label">Menu</p>

        <ul className="sidebar__list">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <button
                className={`sidebar__item ${active === item.key ? "sidebar__item--active" : ""}`}
                onClick={() => setActive(item.key)}
              >
                <i className={`${item.icon} sidebar__item-icon`} />
                <span>{item.label}</span>

                {/* Active indicator dot */}
                {active === item.key && (
                  <span className="sidebar__item-dot" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Spacer */}
      <div className="sidebar__spacer" />

      <div className="sidebar__divider" />

      {/* Logout */}
      <button className="sidebar__logout" onClick={logout}>
        <i className="ri-logout-box-line sidebar__item-icon" />
        <span>Logout</span>
      </button>

    </aside>
  );
};

export default Sidebar;