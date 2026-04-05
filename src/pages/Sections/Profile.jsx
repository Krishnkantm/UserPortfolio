import React, { useEffect, useState } from "react";
import "../admin/Styles/admin.css";

const API = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    about: "",
    email: "",
    phone: "",
    services: "",
    experience: "",
    projects: "",
    companies: "",
  });

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API}/api/profile`);
        const data = await res.json();
        if (data.data) {
          setForm({
            name: data.data.name || "",
            title: data.data.title || "",
            about: data.data.about || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
            services: (data.data.services || []).join(", "),
            experience: data.data.experience || "",
            projects: data.data.projects || "",
            companies: data.data.companies || "",
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const token = sessionStorage.getItem("adminToken");
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("title", form.title);
      fd.append("about", form.about);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("experience", form.experience);
      fd.append("projects", form.projects);
      fd.append("companies", form.companies);
      form.services
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((s) => fd.append("services[]", s));
      if (image) fd.append("image", image);

      const res = await fetch(`${API}/api/profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setMsg("success");
    } catch (err) {
      setMsg("error:" + err.message);
    }
  };

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>Profile</h2>
          <p>Manage your personal information</p>
        </div>
      </div>

      <div className="content-area">
        {/* Stats */}
        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-value">{form.experience || "—"}</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{form.projects || "—"}</div>
            <div className="stat-label">Projects Done</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{form.companies || "—"}</div>
            <div className="stat-label">Companies</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Identity */}
          <div className="section-block">
            <div className="section-title">
              <h3>Identity</h3>
              <span>Basic info</span>
            </div>
            <div className="form-panel">
              <div className="form-panel-title">Personal Details</div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input placeholder="Your name" value={form.name} onChange={f("name")} />
                </div>
                <div className="form-group">
                  <label>Professional Title</label>
                  <input placeholder="e.g. Full Stack Developer" value={form.title} onChange={f("title")} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="you@email.com" value={form.email} onChange={f("email")} />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={f("phone")} />
                </div>
                <div className="form-group span-2">
                  <label>About Me</label>
                  <textarea placeholder="Write a compelling bio..." value={form.about} onChange={f("about")} />
                </div>
              </div>
            </div>
          </div>

          {/* Services & Stats */}
          <div className="section-block">
            <div className="section-title">
              <h3>Services &amp; Stats</h3>
              <span>Numbers &amp; offerings</span>
            </div>
            <div className="form-panel">
              <div className="form-panel-title">Offerings</div>
              <div className="form-grid">
                <div className="form-group span-2">
                  <label>Services (comma separated)</label>
                  <input placeholder="Web Dev, UI Design, SEO..." value={form.services} onChange={f("services")} />
                </div>
                <div className="form-group">
                  <label>Years of Experience</label>
                  <input type="text" placeholder="e.g. 3" value={form.experience} onChange={f("experience")} />
                </div>
                <div className="form-group">
                  <label>Projects Completed</label>
                  <input type="text" placeholder="e.g. 10" value={form.projects} onChange={f("projects")} />
                </div>
                <div className="form-group">
                  <label>Companies Worked</label>
                  <input type="text" placeholder="e.g. 2" value={form.companies} onChange={f("companies")} />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="section-block">
            <div className="section-title">
              <h3>Photo</h3>
              <span>Profile image</span>
            </div>
            <div className="form-panel">
              <div className="form-panel-title">Upload Image</div>
              <div className="file-input-wrapper">
                <label className="file-input-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  {fileName || "Click to upload profile photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setFileName(e.target.files[0]?.name || "");
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary btn-lg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            Save Profile
          </button>

          {msg === "success" && (
            <div className="alert alert-success">✓ Profile updated successfully</div>
          )}
          {msg.startsWith("error:") && (
            <div className="alert alert-error">✕ {msg.replace("error:", "")}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;