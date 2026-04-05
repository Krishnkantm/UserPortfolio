import React, { useEffect, useState, useRef } from "react";

const Certification = () => {
  const [certs, setCerts] = useState([]);
  const trackRef = useRef(null);

  const fetchCerts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/certificates`);
      const result = await res.json();
      setCerts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  // Slide function — reads actual card width so it's always accurate
  const slide = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const cardWidth = card ? card.offsetWidth : 260;
    const gap = 16;
    track.scrollBy({ left: dir * (cardWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="certifications section section__border" id="certifications">
      <div className="container">
        <h2 className="section__title">Certifications</h2>
        <span className="section__subtitle">My achievements & courses</span>

        <div className="slider-wrapper">
          {/* ✅ id="cert-track" needed for slider dots JS */}
          <div
            className="slider-track cert-track"
            id="cert-track"
            ref={trackRef}
          >
            {certs.map((cert) => (
              <div className="cert-card" key={cert._id}>

                {/* Top clickable PDF area */}
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-preview"
                >
                  <i className="ri-file-pdf-2-line"></i>
                  <span>View Certificate</span>
                </a>

                {/* Bottom info */}
                <div className="cert-body">
                  <i className="ri-award-line cert-icon"></i>
                  <div className="cert-info">
                    <p className="cert-title">{cert.title}</p>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <p className="cert-date">{cert.date}</p>
                    <span className="cert-badge">Completed</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* ✅ Arrow buttons */}
          <div className="slider-nav">
            <button className="slider-btn" onClick={() => slide(-1)}>
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button className="slider-btn" onClick={() => slide(1)}>
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>

          {/* ✅ Dots — populated by main.js initSlider */}
          <div className="slider-dots" id="cert-dots"></div>
        </div>
      </div>
    </section>
  );
};

export default Certification;