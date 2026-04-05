// import React, { useEffect, useState } from "react";

// const API = import.meta.env.VITE_API_URL;

// const StorageSection = () => {
//   const [used, setUsed] = useState(0);
//   const [limit, setLimit] = useState(1);
//   const [msg, setMsg] = useState("");

//   const fetchStorage = async () => {
//     try {
//       const token = sessionStorage.getItem("adminToken");

//       const res = await fetch(`${API}/api/storage`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const data = await res.json();
//       console.log("Storage API response:", data);

//       if (!res.ok) return setMsg("❌ " + data.message);

//       setUsed(data.data.used || 0);
//       setLimit(data.data.limit || 1);

//     } catch (err) {
//       setMsg("❌ Error fetching storage");
//     }
//   };

//   useEffect(() => {
//     fetchStorage();
//   }, []);

//  const usedGB = used ? (used / (1024 ** 3)).toFixed(2) : "0.00";
// const limitGB = limit ? (limit / (1024 ** 3)).toFixed(2) : "0.00";

// const percent = limit ? ((used / limit) * 100).toFixed(1) : 0;

//   return (
//     <div>
//       <h2>Storage Usage</h2>

//       {msg && <p>{msg}</p>}

//       <p>{usedGB} GB / {limitGB} GB used</p>

//       {/* Progress Bar */}
//       <div style={{
//         width: "100%",
//         height: "20px",
//         background: "#ddd",
//         borderRadius: "10px",
//         overflow: "hidden"
//       }}>
//         <div
//           style={{
//             width: `${percent}%`,
//             height: "100%",
//             background: percent > 80 ? "red" : "green",
//             transition: "0.3s"
//           }}
//         />
//       </div>

//       <p>{percent}% used</p>
//     </div>
//   );
// };

// export default StorageSection;

// seconde 
// import React, { useEffect, useState } from "react";
// import "../admin/Styles/admin.css";

// const API = import.meta.env.VITE_API_URL;

// const StorageSection = () => {
//   const [used, setUsed] = useState(0);
//   const [limit, setLimit] = useState(1);
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(true);

//   const fetchStorage = async () => {
//     try {
//       setLoading(true);
//       const token = sessionStorage.getItem("adminToken");

//       const res = await fetch(`${API}/api/storage`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();

//       if (!res.ok) return setMsg("Error: " + data.message);

//       setUsed(data.data.used || 0);
//       setLimit(data.data.limit || 1);
//     } catch (err) {
//       setMsg("Error fetching storage info");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchStorage(); }, []);

//   const usedGB  = used  ? (used  / 1024 ** 3).toFixed(2) : "0.00";
//   const limitGB = limit ? (limit / 1024 ** 3).toFixed(2) : "0.00";
//   const freeGB  = limit ? ((limit - used) / 1024 ** 3).toFixed(2) : "0.00";
//   const percent = limit ? Math.min(((used / limit) * 100), 100).toFixed(1) : 0;

//   const isWarning = percent > 60;
//   const isDanger  = percent > 80;

//   const statusLabel = isDanger ? "Critical" : isWarning ? "Warning" : "Healthy";
//   const statusColor = isDanger ? "var(--accent)" : isWarning ? "#888" : "#222";

//   return (
//     <div>

//       {/* ── Page Header ── */}
//       <div className="page-header">
//         <div className="page-header-left">
//           <h2>STORAGE</h2>
//           <div className="header-divider" />
//           <p>Disk usage overview</p>
//         </div>
//         <div className="page-header-right">
//           <div
//             className="status-dot"
//             style={{
//               background: isDanger ? "var(--accent)" : isWarning ? "#aaa" : "#22c55e",
//             }}
//           />
//           <span className="status-txt">{statusLabel}</span>
//         </div>
//       </div>

//       <div className="content-area">

//         {msg && (
//           <div className="alert alert-error" style={{ marginBottom: 24 }}>
//             ✕ {msg}
//           </div>
//         )}

//         {loading ? (
//           /* ── Skeleton ── */
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             {[1, 2, 3].map(i => (
//               <div
//                 key={i}
//                 style={{
//                   height: 60,
//                   background: "var(--bg-2)",
//                   borderRadius: "var(--radius-md)",
//                   animation: "storagePulse 1.4s ease infinite",
//                   opacity: 0.6,
//                 }}
//               />
//             ))}
//           </div>
//         ) : (
//           <>

//             {/* ── Stats Row ── */}
//             <div className="stats-row" style={{ marginBottom: 32 }}>
//               <div className="stat-box">
//                 <div className="stat-value">{usedGB}</div>
//                 <div className="stat-label">GB Used</div>
//               </div>
//               <div className="stat-box">
//                 <div className="stat-value">{freeGB}</div>
//                 <div className="stat-label">GB Free</div>
//               </div>
//               <div className="stat-box">
//                 <div className="stat-value">{limitGB}</div>
//                 <div className="stat-label">GB Total</div>
//               </div>
//             </div>

//             {/* ── Usage Block ── */}
//             <div className="section-block">
//               <div className="section-title">
//                 <h3>Disk Usage</h3>
//                 <span>{usedGB} GB of {limitGB} GB</span>
//               </div>

//               <div className="form-panel" style={{ padding: "28px 28px 24px" }}>

//                 {/* Percentage + status badge row */}
//                 <div style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "flex-end",
//                   marginBottom: 16,
//                 }}>
//                   {/* Big percent number */}
//                   <div>
//                     <div style={{
//                       fontFamily: "var(--font-d)",
//                       fontSize: 52,
//                       letterSpacing: 2,
//                       lineHeight: 1,
//                       color: isDanger ? "var(--accent)" : "var(--text)",
//                       transition: "color 0.3s",
//                     }}>
//                       {percent}
//                       <span style={{ fontSize: 24, letterSpacing: 1, marginLeft: 3 }}>%</span>
//                     </div>
//                     <div style={{
//                       fontSize: 9,
//                       letterSpacing: 2,
//                       textTransform: "uppercase",
//                       color: "var(--text-3)",
//                       marginTop: 5,
//                       fontFamily: "var(--font-b)",
//                     }}>
//                       Storage consumed
//                     </div>
//                   </div>

//                   {/* Status pill */}
//                   <div style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: 7,
//                     padding: "7px 16px",
//                     border: `1.5px solid ${statusColor}`,
//                     borderRadius: 99,
//                     color: statusColor,
//                     fontSize: 10,
//                     letterSpacing: 1.5,
//                     textTransform: "uppercase",
//                     fontFamily: "var(--font-b)",
//                     transition: "all 0.3s",
//                   }}>
//                     <div style={{
//                       width: 6, height: 6,
//                       borderRadius: "50%",
//                       background: statusColor,
//                       flexShrink: 0,
//                     }} />
//                     {statusLabel}
//                   </div>
//                 </div>

//                 {/* Progress bar */}
//                 <div style={{
//                   width: "100%",
//                   height: 10,
//                   background: "var(--bg-3)",
//                   borderRadius: 2,
//                   overflow: "hidden",
//                   border: "1px solid var(--border)",
//                 }}>
//                   <div style={{
//                     width: `${percent}%`,
//                     height: "100%",
//                     background: isDanger
//                       ? "var(--accent)"
//                       : isWarning
//                       ? "var(--text-2)"
//                       : "var(--text)",
//                     borderRadius: 2,
//                     transition: "width 0.9s cubic-bezier(0.4,0,0.2,1), background 0.4s",
//                     position: "relative",
//                     overflow: "hidden",
//                   }}>
//                     {/* Shimmer stripes */}
//                     <div style={{
//                       position: "absolute",
//                       inset: 0,
//                       background: "repeating-linear-gradient(90deg, transparent 0px, transparent 10px, rgba(255,255,255,0.07) 10px, rgba(255,255,255,0.07) 12px)",
//                     }} />
//                   </div>
//                 </div>

//                 {/* 0 / max labels */}
//                 <div style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   marginTop: 8,
//                   fontSize: 9,
//                   letterSpacing: 1.2,
//                   textTransform: "uppercase",
//                   color: "var(--text-3)",
//                   fontFamily: "var(--font-b)",
//                 }}>
//                   <span>0 GB</span>
//                   <span>{limitGB} GB</span>
//                 </div>

//                 <hr className="divider" style={{ margin: "20px 0 18px" }} />

//                 {/* Used / Free breakdown */}
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

//                   {/* Used card */}
//                   <div style={{
//                     padding: "14px 16px",
//                     background: "var(--bg-2)",
//                     border: "1px solid var(--border)",
//                     borderRadius: "var(--radius-md)",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 12,
//                   }}>
//                     <div style={{
//                       width: 10, height: 10,
//                       borderRadius: 2,
//                       background: isDanger ? "var(--accent)" : "var(--text)",
//                       flexShrink: 0,
//                     }} />
//                     <div>
//                       <div style={{
//                         fontSize: 9, letterSpacing: 1.5,
//                         textTransform: "uppercase",
//                         color: "var(--text-3)",
//                         fontFamily: "var(--font-b)",
//                         marginBottom: 3,
//                       }}>
//                         Used
//                       </div>
//                       <div style={{
//                         fontFamily: "var(--font-d)",
//                         fontSize: 22,
//                         color: "var(--text)",
//                         letterSpacing: 1,
//                         lineHeight: 1,
//                       }}>
//                         {usedGB} <span style={{ fontSize: 12 }}>GB</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Free card */}
//                   <div style={{
//                     padding: "14px 16px",
//                     background: "var(--bg-2)",
//                     border: "1px solid var(--border)",
//                     borderRadius: "var(--radius-md)",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 12,
//                   }}>
//                     <div style={{
//                       width: 10, height: 10,
//                       borderRadius: 2,
//                       background: "var(--bg-3)",
//                       border: "1.5px solid var(--border-strong)",
//                       flexShrink: 0,
//                     }} />
//                     <div>
//                       <div style={{
//                         fontSize: 9, letterSpacing: 1.5,
//                         textTransform: "uppercase",
//                         color: "var(--text-3)",
//                         fontFamily: "var(--font-b)",
//                         marginBottom: 3,
//                       }}>
//                         Free
//                       </div>
//                       <div style={{
//                         fontFamily: "var(--font-d)",
//                         fontSize: 22,
//                         color: "var(--text)",
//                         letterSpacing: 1,
//                         lineHeight: 1,
//                       }}>
//                         {freeGB} <span style={{ fontSize: 12 }}>GB</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Critical warning banner */}
//                 {isDanger && (
//                   <div style={{
//                     marginTop: 18,
//                     padding: "10px 14px",
//                     background: "var(--accent-dim)",
//                     border: "1px solid var(--accent)",
//                     borderLeft: "3px solid var(--accent)",
//                     borderRadius: "var(--radius)",
//                     fontSize: 11,
//                     color: "var(--accent)",
//                     letterSpacing: 0.5,
//                     fontFamily: "var(--font-b)",
//                     animation: "fadeUp 0.3s ease both",
//                   }}>
//                     ⚠ Storage critically low — consider removing unused files.
//                   </div>
//                 )}

//               </div>
//             </div>

//             {/* Refresh */}
//             <button
//               className="btn btn-outline btn-sm"
//               onClick={fetchStorage}
//               style={{ marginTop: 4 }}
//             >
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                 <polyline points="23 4 23 10 17 10"/>
//                 <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
//               </svg>
//               Refresh
//             </button>

//           </>
//         )}
//       </div>

//       <style>{`
//         @keyframes storagePulse {
//           0%, 100% { opacity: 0.6; }
//           50%       { opacity: 0.25; }
//         }
//       `}</style>

//     </div>
//   );
// };

// export default StorageSection;

//third 
import React, { useEffect, useState } from "react";
import "../admin/Styles/admin.css";

const API = import.meta.env.VITE_API_URL;

const StorageSection = () => {
  const [used, setUsed] = useState(0);
  const [limit, setLimit] = useState(1);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchStorage = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("adminToken");

      const res = await fetch(`${API}/api/storage`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) return setMsg(data.message);

      setUsed(data.data.used || 0);
      setLimit(data.data.limit || 1);
      setMsg("");
    } catch (err) {
      setMsg("Error fetching storage info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStorage(); }, []);

  const usedGB  = (used  / (1024 ** 3)).toFixed(2);
  const limitGB = (limit / (1024 ** 3)).toFixed(2);
  const freeGB  = ((limit - used) / (1024 ** 3)).toFixed(2);
  const percent = limit ? Math.min(((used / limit) * 100), 100).toFixed(1) : 0;
  const usedMB  = (used  / (1024 ** 2)).toFixed(0);
  const limitMB = (limit / (1024 ** 2)).toFixed(0);

  const status =
    percent >= 90 ? "critical" :
    percent >= 70 ? "warning"  : "healthy";

  const statusColor = {
    critical: "#e63426",
    warning:  "#f59e0b",
    healthy:  "#22c55e",
  }[status];

  const statusLabel = {
    critical: "Critical",
    warning:  "Warning",
    healthy:  "Healthy",
  }[status];

  const barColor = {
    critical: "#e63426",
    warning:  "#f59e0b",
    healthy:  "var(--text)",
  }[status];

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>STORAGE</h2>
          <div className="header-divider" />
          <p>Disk usage &amp; capacity</p>
        </div>
        <div className="page-header-right">
          <div style={{
            width: 8, height: 8,
            borderRadius: "50%",
            background: statusColor,
            boxShadow: `0 0 0 3px ${statusColor}33`,
          }} />
          <span style={{
            fontSize: 10,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "var(--text-3)",
          }}>
            {loading ? "Loading..." : statusLabel}
          </span>
        </div>
      </div>

      <div className="content-area">

        {/* ── Error ── */}
        {msg && (
          <div className="alert alert-error" style={{ marginBottom: 24 }}>
            ✕ {msg}
          </div>
        )}

        {/* ── Stats Row ── */}
        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-value">{usedGB}</div>
            <div className="stat-label">GB Used</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{freeGB}</div>
            <div className="stat-label">GB Free</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{limitGB}</div>
            <div className="stat-label">GB Total</div>
          </div>
        </div>

        {/* ── Usage Block ── */}
        <div className="section-block">
          <div className="section-title">
            <h3>Disk Usage</h3>
            <span>{percent}% consumed</span>
          </div>

          <div className="form-panel" style={{ padding: "28px 28px 24px" }}>

            {/* Header row inside panel */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 38, height: 38,
                  background: "var(--bg-3)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                    stroke="var(--text-2)" strokeWidth="1.8">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text)", marginBottom: 2 }}>
                    Cloud Storage
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: 0.3 }}>
                    {usedMB} MB of {limitMB} MB
                  </div>
                </div>
              </div>

              {/* Percent badge */}
              <div style={{
                padding: "5px 14px",
                border: `1.5px solid ${statusColor}`,
                borderRadius: 99,
                fontSize: 11,
                fontWeight: 600,
                color: statusColor,
                letterSpacing: 0.5,
                fontFamily: "var(--font-b)",
                background: `${statusColor}0f`,
              }}>
                {percent}%
              </div>
            </div>

            {/* Progress track */}
            <div style={{
              width: "100%",
              height: 10,
              background: "var(--bg-3)",
              border: "1px solid var(--border)",
              borderRadius: 99,
              overflow: "hidden",
              marginBottom: 14,
            }}>
              {loading ? (
                <div style={{
                  height: "100%",
                  width: "35%",
                  background: "var(--border-strong)",
                  borderRadius: 99,
                  animation: "storageShimmer 1.2s ease infinite alternate",
                }} />
              ) : (
                <div style={{
                  width: `${percent}%`,
                  height: "100%",
                  background: barColor,
                  borderRadius: 99,
                  transition: "width 0.9s cubic-bezier(.4,0,.2,1)",
                }} />
              )}
            </div>

            {/* Legend */}
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 2,
                  background: barColor,
                }} />
                <span style={{
                  fontSize: 10, color: "var(--text-3)",
                  textTransform: "uppercase", letterSpacing: 1,
                }}>
                  Used — {usedGB} GB
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 2,
                  background: "var(--bg-3)",
                  border: "1px solid var(--border)",
                }} />
                <span style={{
                  fontSize: 10, color: "var(--text-3)",
                  textTransform: "uppercase", letterSpacing: 1,
                }}>
                  Free — {freeGB} GB
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Info Cards ── */}
        <div className="section-block">
          <div className="section-title">
            <h3>Overview</h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

            {/* Capacity card */}
            <div className="item-card" style={{ flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
              <div style={{
                width: 34, height: 34,
                background: "var(--bg-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="var(--text-2)" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <path d="M7 10h10M7 14h6" />
                </svg>
              </div>
              <div>
                <div style={{
                  fontSize: 9, textTransform: "uppercase",
                  letterSpacing: 1.5, color: "var(--text-3)", marginBottom: 4,
                }}>
                  Total Capacity
                </div>
                <div style={{
                  fontSize: 24, fontFamily: "var(--font-d)",
                  letterSpacing: 2, color: "var(--text)", lineHeight: 1,
                }}>
                  {limitGB} <span style={{ fontSize: 12, letterSpacing: 1, opacity: 0.6 }}>GB</span>
                </div>
              </div>
            </div>

            {/* Health card */}
            <div className="item-card" style={{ flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
              <div style={{
                width: 34, height: 34,
                background: "var(--bg-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke={statusColor} strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <div style={{
                  fontSize: 9, textTransform: "uppercase",
                  letterSpacing: 1.5, color: "var(--text-3)", marginBottom: 4,
                }}>
                  Storage Health
                </div>
                <div style={{
                  fontSize: 24, fontFamily: "var(--font-d)",
                  letterSpacing: 2, color: statusColor, lineHeight: 1,
                }}>
                  {statusLabel}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Refresh Button ── */}
        <div>
          <button
            className="btn btn-outline"
            onClick={fetchStorage}
            disabled={loading}
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              style={{ animation: loading ? "storageSpin 0.8s linear infinite" : "none" }}>
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

      </div>

      {/* ── Keyframes scoped to avoid conflicts ── */}
      <style>{`
        @keyframes storageSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes storageShimmer {
          from { opacity: 0.35; }
          to   { opacity: 0.75; }
        }
      `}</style>
    </div>
  );
};

export default StorageSection;