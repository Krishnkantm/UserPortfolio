import React, { useEffect, useState } from "react";
import "../admin/Styles/admin.css";

const API = import.meta.env.VITE_API_URL;

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const PAGE_SIZE = 9;

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

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", level: "" });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [msg, setMsg] = useState("");

  const { paginated: visibleSkills, page, setPage, totalPages, reset } = usePagination(skills, PAGE_SIZE);

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${API}/api/skill`);
      const data = await res.json();
      setSkills(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleAdd = async () => {
    if (!form.name || !file) return setMsg("error:Name & icon required");
    try {
      const token = sessionStorage.getItem("adminToken");
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("level", form.level);
      fd.append("file", file);

      const res = await fetch(`${API}/api/skill`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMsg("success");
      setForm({ name: "", level: "" });
      setFile(null);
      setFileName("");
      fetchSkills();
      reset();
    } catch (err) {
      setMsg("error:" + err.message);
    }
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("adminToken");
    await fetch(`${API}/api/skill/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchSkills();
    // If deleting last item on current page, go back one page
    const remaining = skills.length - 1;
    const maxPage = Math.ceil(remaining / PAGE_SIZE);
    if (page > maxPage && maxPage > 0) setPage(maxPage);
  };

  const levelColor = (level) => {
    const map = { Beginner: "#888", Intermediate: "#555", Advanced: "#222", Expert: "#000" };
    return map[level] || "#888";
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>Skills</h2>
          <p>Manage your technical skills</p>
        </div>
        <div className="page-header-right">
          <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--grey-400)" }}>
            {skills.length}
          </span>
          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "var(--grey-400)" }}>Total</span>
        </div>
      </div>

      <div className="content-area">

        {/* ADD FORM */}
        <div className="section-block">
          <div className="section-title"><h3>Add Skill</h3></div>
          <div className="form-panel">
            <div className="form-panel-title">Skill Details</div>
            <div className="form-grid triple">
              <div className="form-group">
                <label>Skill Name</label>
                <input placeholder="e.g. React.js" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Proficiency Level</label>
                <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                  <option value="">Select level</option>
                  {LEVEL_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Skill Icon</label>
                <div className="file-input-wrapper">
                  <label className="file-input-label" style={{ height: "42px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/>
                      <line x1="8" y1="12" x2="16" y2="12"/>
                    </svg>
                    {fileName || "Upload icon (SVG/PNG)"}
                    <input type="file" accept="image/*" onChange={(e) => {
                      setFile(e.target.files[0]);
                      setFileName(e.target.files[0]?.name || "");
                    }} />
                  </label>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <button className="btn btn-primary" onClick={handleAdd}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add Skill
              </button>
            </div>
            {msg === "success" && <div className="alert alert-success">✓ Skill added</div>}
            {msg.startsWith("error:") && <div className="alert alert-error">✕ {msg.replace("error:", "")}</div>}
          </div>
        </div>

        {/* LIST */}
        <div className="section-block">
          <div className="section-title">
            <h3>All Skills</h3>
            <span>{skills.length} entries{skills.length >= 10 && ` · Page ${page}/${totalPages}`}</span>
          </div>

          {skills.length === 0 ? (
            <div className="empty-state"><p>No skills added yet</p></div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {visibleSkills.map((skill) => (
                  <div className="item-card" key={skill._id} style={{ gap: 14 }}>
                    {skill.icon ? (
                      <img src={skill.icon} alt={skill.name} className="skill-icon" />
                    ) : (
                      <div className="skill-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--grey-400)" strokeWidth="1.5">
                          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/>
                          <path d="M2 12l10 5 10-5"/>
                        </svg>
                      </div>
                    )}
                    <div className="item-info">
                      <div className="item-title">{skill.name}</div>
                      {skill.level && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                          <div style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: levelColor(skill.level),
                          }} />
                          <span className="item-meta">{skill.level}</span>
                        </div>
                      )}
                    </div>
                    <div className="item-actions">
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(skill._id)}>
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

export default SkillsSection;