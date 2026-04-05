import React, { useEffect, useRef, useState } from "react";

const Home = () => {
  const statsRef = useRef(null);

  // ✅ Dynamic profile state
  const [profile, setProfile] = useState({
    image: "src/assets/img/image.png",
    about: "",
    email: "",
    phone: "",
    services: [],
    experience: 0,
    projects: 0,
    companies: 0,
  });

  // ✅ Fetch profile data (FIXED API URL)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/profile`
        );
        const data = await res.json();

        if (data.data) {
          setProfile({
            image: data.data.image || "src/assets/img/image.png",
            about: data.data.about || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
            services: data.data.services || [],
            experience: Number(data.data.experience) || 0,
            projects: Number(data.data.projects) || 0,
            companies: Number(data.data.companies) || 0,
          });
        }
      } catch (err) {
        console.log("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Counter animation (UNCHANGED LOGIC)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const spans = entry.target.querySelectorAll("[data-target]");

            spans.forEach((span) => {
              const target = Number(span.getAttribute("data-target") || 0);

              let count = 0;
              const duration = 1200;
              const stepTime = Math.abs(
                Math.floor(duration / (target || 1))
              );

              const counter = setInterval(() => {
                count += 1;
                span.textContent = count < target ? count : target;

                if (count >= target) {
                  clearInterval(counter);
                  span.textContent =
                    target > 0 ? target + "+" : target;
                }
              }, stepTime);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="home section section__border" id="home">
      <div className="container home__container">

        {/* LEFT SIDE */}
        <div className="home__data">

          <h1 className="home__title">
            Hi, I'm Krishnkant <br /> Software Developer
          </h1>

          <p className="home__description">
            I turn ideas into reality through clean code and creative thinking.
            Building the web, one problem at a time.
          </p>

          {/* SOCIAL */}
          <div className="home__social">
            <a
              href="https://linkedin.com/in/krishnkant-modi-2b82b52b4"
              target="_blank"
              rel="noreferrer"
            >
              <i className="ri-linkedin-box-fill"></i>
            </a>

            <a
              href="https://github.com/Krishnkantm"
              target="_blank"
              rel="noreferrer"
            >
              <i className="ri-github-fill"></i>
            </a>
          </div>

          {/* INFO */}
          <div className="home__info">

            {/* ABOUT */}
            <div className="home__info-group">
              <h3 className="home__info-title">About Me</h3>
              <p className="home__info-description">
                {profile.about || "No data"}
              </p>
            </div>

            {/* CONTACT */}
            <div className="home__info-group">
              <h3 className="home__info-title">Contact</h3>
              <p className="home__info-description">
                Krishnkant Modi <br />
                {profile.email || "No email"} <br />
                {profile.phone || "No phone"}
              </p>
            </div>

            {/* SERVICES */}
            <div className="home__info-group">
              <h3 className="home__info-title">Services</h3>
              <p className="home__info-description">
                {profile.services.length > 0 ? (
                  profile.services.map((s, i) => (
                    <span key={i}>
                      {s} <br />
                    </span>
                  ))
                ) : (
                  "No services added"
                )}
              </p>
            </div>

          </div>

          {/* STATS */}
          <div className="home__stats" ref={statsRef}>

            <div className="home__stats-item">
              <span data-target={profile.experience}>0</span>
              <small>Years of Experience</small>
            </div>

            <div className="home__stats-item">
              <span data-target={profile.projects}>0</span>
              <small>Completed Projects</small>
            </div>

            <div className="home__stats-item">
              <span data-target={profile.companies}>0</span>
              <small>Companies Worked</small>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="home__img-box">
          <img
            src={profile.image}
            alt="Profile"
            className="home__img"
          />
        </div>

      </div>
    </section>
  );
};

export default Home;