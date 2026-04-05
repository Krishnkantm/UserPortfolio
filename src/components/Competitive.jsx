import React from "react";

const CompetitiveProgramming = () => {
  return (
    <section className="competitions section section__border" id="competitions">
      <div className="container">
        <h2 className="section__title">Competitive Programming</h2>
        <span className="section__subtitle">Problem solving stats</span>

        <div className="skills-grid">

          <article
            className="skill-card cp-card"
            onClick={() => window.open('https://www.codechef.com/users/modikishu88', '_blank')}
            style={{ cursor: "pointer" }}
          >
            <img src="src/assets/img/cc-logo.png" alt="CodeChef" className="skill-icon" />
            <h3>CodeChef</h3>
            <p>1000+ problems solved</p>
          </article>

          <article
            className="skill-card cp-card"
            onClick={() => window.open('https://www.geeksforgeeks.org/profile/modikiy3fo', '_blank')}
            style={{ cursor: "pointer" }}
          >
            <img src="src/assets/img/GeeksForGeeks_logo.png" alt="GeeksforGeeks" className="skill-icon" />
            <h3>GeeksforGeeks</h3>
            <p>500+ problems solved</p>
          </article>

          <article
            className="skill-card cp-card"
            onClick={() => window.open('https://leetcode.com/u/KrishnkantModi/', '_blank')}
            style={{ cursor: "pointer" }}
          >
            <img src="src/assets/img/LeetCode_logo_black.png" alt="LeetCode" className="skill-icon" />
            <h3>LeetCode</h3>
            <p>850+ problems solved</p>
          </article>

        </div>

        <div className="qualification-grid" style={{ marginTop: "1rem" }}>
          <div className="qualification-content">
            <h3 className="qualification__title">Best contest rank</h3>
            <p>4225/42000</p>
          </div>
          <div className="qualification-content">
            <h3 className="qualification__title">Contest rating</h3>
            <p>1550+</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveProgramming;