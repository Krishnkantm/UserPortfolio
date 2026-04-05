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

const CertificatesSection = () => {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({ title: "", issuer: "", date: "", certificateUrl: "" });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [msg, setMsg] = useState("");

  const { paginated: visibleCerts, page, setPage, totalPages, reset } = usePagination(certs, PAGE_SIZE);

  const fetchCerts = async () => {
    const res = await fetch(`${API}/api/certificates`);
    const data = await res.json();
    setCerts(data.data || []);
  };

  useEffect(() => { fetchCerts(); }, []);

  const handleAdd = async () => {
    const token = sessionStorage.getItem("adminToken");
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("issuer", form.issuer);
    fd.append("date", form.date);
    fd.append("certificateUrl", form.certificateUrl);
    if (file) fd.append("file", file);

    const res = await fetch(`${API}/api/certificates/create`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const data = await res.json();
    if (!res.ok) return setMsg("error:" + data.message);

    setMsg("success");
    setForm({ title: "", issuer: "", date: "", certificateUrl: "" });
    setFile(null);
    setFileName("");
    fetchCerts();
    reset();
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("adminToken");
    await fetch(`${API}/api/certificates/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCerts();
    const remaining = certs.length - 1;
    const maxPage = Math.ceil(remaining / PAGE_SIZE);
    if (page > maxPage && maxPage > 0) setPage(maxPage);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>Certificates</h2>
          <p>Manage your credentials &amp; awards</p>
        </div>
        <div className="page-header-right">
          <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--grey-400)" }}>
            {certs.length}
          </span>
          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "var(--grey-400)" }}>Total</span>
        </div>
      </div>

      <div className="content-area">

        {/* ADD FORM */}
        <div className="section-block">
          <div className="section-title">
            <h3>Add Certificate</h3>
          </div>
          <div className="form-panel">
            <div className="form-panel-title">Certificate Details</div>
            <div className="form-grid">
              <div className="form-group">
                <label>Certificate Title</label>
                <input placeholder="e.g. AWS Solutions Architect" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Issuing Authority</label>
                <input placeholder="e.g. Amazon Web Services" value={form.issuer}
                  onChange={(e) => setForm({ ...form, issuer: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Issue Date</label>
                <input type="date" value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Certificate URL</label>
                <input placeholder="https://..." value={form.certificateUrl}
                  onChange={(e) => setForm({ ...form, certificateUrl: e.target.value })} />
              </div>
              <div className="form-group span-2">
                <label>Certificate Image</label>
                <div className="file-input-wrapper">
                  <label className="file-input-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    {fileName || "Upload certificate image"}
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
                Add Certificate
              </button>
            </div>

            {msg === "success" && <div className="alert alert-success">✓ Certificate added</div>}
            {msg.startsWith("error:") && <div className="alert alert-error">✕ {msg.replace("error:", "")}</div>}
          </div>
        </div>

        {/* LIST */}
        <div className="section-block">
          <div className="section-title">
            <h3>All Certificates</h3>
            <span>{certs.length} entries{certs.length >= 10 && ` · Page ${page}/${totalPages}`}</span>
          </div>

          {certs.length === 0 ? (
            <div className="empty-state"><p>No certificates added yet</p></div>
          ) : (
            <>
              <div className="item-list">
                {visibleCerts.map((c) => (
                  <div className="item-card" key={c._id}>
                    {c.certificateUrl ? (
                      <img src={c.certificateUrl} alt={c.title} className="item-thumb" />
                    ) : (
                      <div className="item-thumb" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--grey-100)" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--grey-400)" strokeWidth="1.5">
                          <circle cx="12" cy="8" r="6"/><path d="M9 22l3-3 3 3 3-7"/>
                        </svg>
                      </div>
                    )}
                    <div className="item-info">
                      <div className="item-title">{c.title}</div>
                      <div className="item-meta">{c.issuer}</div>
                      {c.date && <span className="item-badge">{c.date}</span>}
                    </div>
                    <div className="item-actions">
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c._id)}>
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

export default CertificatesSection;