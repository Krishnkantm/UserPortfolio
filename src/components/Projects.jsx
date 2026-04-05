import React, { useState, useEffect, useRef } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const trackRef = useRef(null);

  const fetchProject = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
      const data = await res.json();

      console.log("PROJECT API:", data);

      setProjects(data.data); // ✅ FIXED
    } catch (err) {
      console.log(err);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const slide = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const cardWidth = card ? card.offsetWidth : 280;
    track.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <section className="projects section section__border" id="projects">
      <div className="container">
        <h2 className="section__title">Projects</h2>
        <span className="section__subtitle">Most recent work</span>

        <div className="slider-wrapper">
          <div
            className="slider-track projects-track"
            ref={trackRef}
          >
            {Array.isArray(projects) &&
              projects.map((project) => (
                <article className="project-card" key={project._id}>

                  {/* ✅ IMAGE */}
                  {project.image && (
                    <img src={project.image} alt={project.title} />
                  )}

                  {/* ✅ VIDEO */}
                  {project.video && (
                    <video
                      controls
                      width="100%"
                      style={{ borderRadius: ".6rem", marginBottom: ".75rem" }}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  )}

                  <h3>{project.title}</h3>

                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="project-btn"
                    >
                      View Demo
                    </a>
                  )}
                </article>
              ))}
          </div>

          <div className="slider-nav">
            <button onClick={() => slide(-1)}>
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button onClick={() => slide(1)}>
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;