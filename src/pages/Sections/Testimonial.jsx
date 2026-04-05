import React, { useEffect, useState } from "react";
import "../admin/Styles/admin.css";

const API = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 5;

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

const TestimonialsSection = () => {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [msg, setMsg] = useState("");

  const { paginated: visibleMessages, page, setPage, totalPages, reset } = usePagination(messages, PAGE_SIZE);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API}/api/contact`);
      const data = await res.json();
      setMessages(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleAdd = async () => {
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setMsg("error:" + data.message);

      setMsg("success");
      setForm({ name: "", email: "", message: "" });
      fetchMessages();
      reset();
    } catch (err) {
      setMsg("error:Error adding message");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await fetch(`${API}/api/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) return setMsg("error:" + data.message);
      setMsg("success:Deleted");
      fetchMessages();
      const remaining = messages.length - 1;
      const maxPage = Math.ceil(remaining / PAGE_SIZE);
      if (page > maxPage && maxPage > 0) setPage(maxPage);
    } catch (err) {
      setMsg("error:Error deleting");
    }
  };

  const getInitial = (name) => (name ? name[0].toUpperCase() : "?");

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>Testimonials</h2>
          <p>Messages &amp; client feedback</p>
        </div>
        <div className="page-header-right">
          <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--grey-400)" }}>
            {messages.length}
          </span>
          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "var(--grey-400)" }}>Messages</span>
        </div>
      </div>

      <div className="content-area">

        {/* ADD FORM */}
        <div className="section-block">
          <div className="section-title"><h3>Add Message</h3></div>
          <div className="form-panel">
            <div className="form-panel-title">Testimonial Details</div>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input placeholder="Client name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="client@email.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-group span-2">
                <label>Message / Testimonial</label>
                <textarea placeholder="What did they say about your work?" value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ minHeight: 120 }} />
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <button className="btn btn-primary" onClick={handleAdd}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add Testimonial
              </button>
            </div>
            {msg === "success" && <div className="alert alert-success">✓ Message added</div>}
            {msg.startsWith("success:") && (
              <div className="alert alert-success">✓ {msg.replace("success:", "")}</div>
            )}
            {msg.startsWith("error:") && <div className="alert alert-error">✕ {msg.replace("error:", "")}</div>}
          </div>
        </div>

        {/* LIST */}
        <div className="section-block">
          <div className="section-title">
            <h3>All Messages</h3>
            <span>{messages.length} entries{messages.length >= 10 && ` · Page ${page}/${totalPages}`}</span>
          </div>

          {messages.length === 0 ? (
            <div className="empty-state">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--grey-200)" strokeWidth="1.5" style={{ margin: "0 auto 12px", display: "block" }}>
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              <p>No messages yet</p>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {visibleMessages.map((m) => (
                  <div className="testimonial-card" key={m._id}>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">{getInitial(m.name)}</div>
                      <div>
                        <div className="testimonial-name">{m.name}</div>
                        <div className="testimonial-email">{m.email}</div>
                      </div>
                      <div style={{ marginLeft: "auto" }}>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="testimonial-message">
                      "{m.message}"
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

export default TestimonialsSection;