import React from "react";

const Services = () => {
  return (
    <section className="services section section__border" id="services">
      <div className="container">
        <h2 className="section__title">Services</h2>
        <span className="section__subtitle">What I offer</span>

        <div className="services-grid">
          
          <article className="services-card">
            <i className="ri-brush-4-line services-icon"></i>
            <h3 className="services__title">Backend Development</h3>
            <p className="services__description">
              Handles API development and database integration.
            </p>
          </article>

          <article className="services-card">
            <i className="ri-global-line services-icon"></i>
            <h3 className="services__title">Website Design</h3>
            <p className="services__description">
              Create responsive and modern websites with full cross-browser compatibility.
            </p>
          </article>

          <article className="services-card">
            <i className="ri-palette-line services-icon"></i>
            <h3 className="services__title">Database Management</h3>
            <p className="services__description">
              Designing secure, scalable, and high-performance data systems that ensure seamless storage, fast retrieval, and reliable application performance.
            </p>
          </article>

        </div>
      </div>
    </section>
  );
};

export default Services;