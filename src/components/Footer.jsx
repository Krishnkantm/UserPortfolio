import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container" style={{ overflow: "hidden" }}>
        <div className="footer__content">
          
          <img
            src="src/assets/img/tenor.gif"
            alt="gif"
            className="footer__gif"
          />

          <span>
            © 2026 Developed By{" "}
            <strong className="footer__name">
              Krishnkant Modi
            </strong>{" "}
            💻. All rights reserved.
          </span>

        </div>
      </div>
    </footer>
  );
};

export default Footer;