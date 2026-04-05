import React, { useState } from "react";
import "./Styles/admin.css";

const API = import.meta.env.VITE_API_URL;

const Login = ({ onLogin }) => {
  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      sessionStorage.setItem("adminToken", data.token);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Brand */}
        <div className="login-brand">
          <div className="login-brand__avatar">K</div>
          <div>
            <h1 className="login-brand__name">Krishnkant Modi</h1>
            <p className="login-brand__sub">Portfolio Admin</p>
          </div>
        </div>

        <div className="login-divider" />

        <h2 className="login-title">Sign in</h2>
        <p className="login-subtitle">Manage your portfolio content</p>

        <form className="login-form" onSubmit={handleLogin} noValidate>

          {/* Email field */}
          <div className="login-field">
            <label className="login-label">Email</label>
            <div className="login-input-wrap">
              <i className="ri-mail-line login-input-icon" />
              <input
                className="login-input"
                type="email"
                placeholder="admin@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="login-field">
            <label className="login-label">Password</label>
            <div className="login-input-wrap">
              <i className="ri-lock-line login-input-icon" />
              <input
                className="login-input"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
              >
                <i className={showPass ? "ri-eye-off-line" : "ri-eye-line"} />
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="login-error">
              <i className="ri-error-warning-line" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="login-spinner" />
                Signing in...
              </>
            ) : (
              <>
                <i className="ri-login-box-line" />
                Sign In
              </>
            )}
          </button>

        </form>

        <p className="login-footer">🔒 Secured admin access only</p>

      </div>
    </div>
  );
};

export default Login;