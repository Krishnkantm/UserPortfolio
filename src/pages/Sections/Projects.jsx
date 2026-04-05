import React, { useEffect, useState } from "react";
import "../admin/Styles/admin.css";

const API = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 6;

/* ── Pagination Hook ── */
const usePagination = (items, pageSize = PAGE_SIZE) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / pageSize);
  const paginated = items.slice((page - 1) * pageSize, page * pageSize);
  const reset = () => setPage(1);
  return { paginated, page, setPage, totalPages, reset };
};

/* ── Pagination UI ── */
const Pagination = ({ page, totalPages, setPage }) => {
  if (totalPages <= 1) return null;
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 20,
      paddingTop: 16,
      borderTop: "1px solid var(--border)",
    }}>
      <span style={{
        fontSize: 10,
        letterSpacing: 1,
        textTransform: "uppercase",
        color: "var(--text-3)",
      }}>
        Page {page} of {totalPages}
      </span>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{ opacity: page === 1 ? 0.35 : 1, cursor: page === 1 ? "not-allowed" : "pointer" }}
        >
          ← Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
          <button
            key={n}
            className={`btn btn-sm ${n === page ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setPage(n)}
            style={{ minWidth: 32 }}
          >
            {n}
          </button>
        ))}
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          style={{ opacity: page === totalPages ? 0.35 : 1, cursor: page === totalPages ? "not-allowed" : "pointer" }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", link: "" });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [msg, setMsg] = useState("");

  const { paginated: visibleProjects, page, setPage, totalPages, reset } = usePagination(projects, PAGE_SIZE);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API}/api/projects`);
      const data = await res.json();
      setProjects(data.data || []);
    } catch (err) {
      console.log(err);
      setProjects([]);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleAdd = async () => {
    if (!form.title || !file) return setMsg("error:Title & file required");
    const token = sessionStorage.getItem("adminToken");
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("demoLink", form.link);
    fd.append("file", file);

    const res = await fetch(`${API}/api/projects`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const data = await res.json();
    if (!res.ok) return setMsg("error:" + data.message);

    setMsg("success");
    setForm({ title: "", link: "" });
    setFile(null);
    setFileName("");
    fetchProjects();
    reset();
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("adminToken");
    await fetch(`${API}/api/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProjects();
    const remaining = projects.length - 1;
    const maxPage = Math.ceil(remaining / PAGE_SIZE);
    if (page > maxPage && maxPage > 0) setPage(maxPage);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>Projects</h2>
          <p>Showcase your work</p>
        </div>
        <div className="page-header-right">
          <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--grey-400)" }}>
            {projects.length}
          </span>
          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "var(--grey-400)" }}>Total</span>
        </div>
      </div>

      <div className="content-area">

        {/* ADD FORM */}
        <div className="section-block">
          <div className="section-title"><h3>New Project</h3></div>
          <div className="form-panel">
            <div className="form-panel-title">Project Details</div>
            <div className="form-grid">
              <div className="form-group">
                <label>Project Title</label>
                <input placeholder="e.g. E-Commerce Platform" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Demo Link</label>
                <input placeholder="https://..." value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })} />
              </div>
              <div className="form-group span-2">
                <label>Project File (Image / Video) please make sure video length is less than 50MB</label>
                <div className="file-input-wrapper">
                  <label className="file-input-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                    {fileName || "Upload image or video"}
                    <input type="file" onChange={(e) => { setFile(e.target.files[0]); setFileName(e.target.files[0]?.name || ""); }} />
                  </label>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <button className="btn btn-primary" onClick={handleAdd}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add Project
              </button>
            </div>
            {msg === "success" && <div className="alert alert-success">✓ Project added</div>}
            {msg.startsWith("error:") && <div className="alert alert-error">✕ {msg.replace("error:", "")}</div>}
          </div>
        </div>

        {/* LIST */}
        <div className="section-block">
          <div className="section-title">
            <h3>All Projects</h3>
            <span>{projects.length} entries{projects.length >= 10 && ` · Page ${page}/${totalPages}`}</span>
          </div>

          {projects.length === 0 ? (
            <div className="empty-state"><p>No projects added yet</p></div>
          ) : (
            <>
              <div className="item-list">
                {visibleProjects.map((p) => (
                  <div className="item-card" key={p._id}>
                    {p.image && <img src={p.image} alt={p.title} className="item-thumb" />}
                    {p.video && !p.image && (
                      <video src={p.video} className="item-thumb-video" muted />
                    )}
                    {!p.image && !p.video && (
                      <div className="item-thumb" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--grey-400)" strokeWidth="1.5">
                          <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
                          <line x1="12" y1="17" x2="12" y2="21"/>
                        </svg>
                      </div>
                    )}
                    <div className="item-info">
                      <div className="item-title">{p.title}</div>
                      {p.demoLink && (
                        <a href={p.demoLink} target="_blank" rel="noreferrer" className="link">
                          View Demo →
                        </a>
                      )}
                    </div>
                    <div className="item-actions">
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;