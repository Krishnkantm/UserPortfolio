import React, { useState, useEffect, useRef } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const trackRef = useRef(null);

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/skill`);
      const data = await res.json();
      setSkills(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []); // [] = runs only once on mount

  const slide = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const cardWidth = card ? card.offsetWidth : 140;
    track.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <section className="skills section section__border" id="skills">
      <div className="container">
        <h2 className="section__title">Skills</h2>
        <span className="section__subtitle">My skills</span>

        <div className="slider-wrapper">
          {/* ✅ skills-track — CSS gives each card flex: 0 0 140px */}
          <div
            className="slider-track skills-track"
            id="skills-track"
            ref={trackRef}
          >
            {skills.map((skill) => (
              <article className="skill-card" key={skill._id}>
                <img src={skill.icon} alt={skill.name} className="skill-icon" />
                <h3>{skill.name}</h3>
                <p>{skill.level}</p>
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

          <div className="slider-dots" id="skills-dots"></div>
        </div>
      </div>
    </section>
  );
};

export default Skills;