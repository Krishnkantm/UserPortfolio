import React, { useEffect, useState, useRef } from "react";

// WHY: Testimonials fetched from /api/reviews (not /api/contact)
// /api/contact = contact messages (private, admin only)
// /api/reviews = approved testimonials (public)

const Testimonial = () => {
  const [data, setData] = useState([]);
  const trackRef = useRef(null);

  const fetchData = async () => {
    try {
      // ✅ Fixed: /api/reviews — only approved reviews show here
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`);
      const result = await res.json();
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const slide = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const cardWidth = card ? card.offsetWidth : 300;
    track.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <section className="testimonial section section__border" id="testimonial">
      <div className="container">
        <h2 className="section__title">Testimonial</h2>
        <span className="section__subtitle">My client saying</span>

        <div className="slider-wrapper">
          {/* ✅ testimonials-track — matches CSS 300px card width */}
          <div
            className="slider-track testimonials-track"
            id="testimonials-track"
            ref={trackRef}
          >
            {data.map((item) => (
              <article className="testimonial-card" key={item._id}>

                {/* Quote text with :: before quote mark from CSS */}
                <p>"{item.message}"</p>

                {/* Author section — matches CSS .testimonial-author border-top style */}
                <div className="testimonial-author">
                  <h3>{item.name}</h3>
                  <small>{item.role || "Client"}</small>
                </div>

              </article>
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="slider-nav">
            <button className="slider-btn" onClick={() => slide(-1)}>
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button className="slider-btn" onClick={() => slide(1)}>
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>

          <div className="slider-dots" id="testimonials-dots"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;