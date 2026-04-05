import React from "react";

const Qualification = () => {
  return (
    <section className="qualification section section__border" id="qualification">
      <div className="container">
        <h2 className="section__title">Qualification</h2>
        <span className="section__subtitle">Experience & education</span>

        <div className="qualification-grid">

          {/* Education */}
          <div className="qualification-content">
            <h3 className="qualification__title">Education</h3>

            <div className="qualification-item">
              <h4>B.Tech Computer Science</h4>
              <p>Mandsaur University</p>
              <span>2023 - 2027</span>
            </div>

            <div className="qualification-item">
              <h4>Higher Secondary</h4>
              <p>CBSE Board</p>
              <span>2021 - 2023</span>
            </div>

            <div className="qualification-item">
              <h4>Secondary School</h4>
              <p>CBSE Board</p>
              <span>2019 - 2021</span>
            </div>
          </div>

          {/* Experience */}
          <div className="qualification-content">
            <h3 className="qualification__title">Work</h3>

            <div className="qualification-item">
              <h4>Backend Developer</h4>
              <p>Freelance</p>
              <span>2024 - Present</span>
            </div>

            <div className="qualification-item">
              <h4>MERN Stack Developer</h4>
              <p>Personal Projects</p>
              <span>2023 - Present</span>
            </div>

            <div className="qualification-item">
              <h4>DSA & Problem Solving</h4>
              <p>Code Practice</p>
              <span>2023 - Present</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Qualification;