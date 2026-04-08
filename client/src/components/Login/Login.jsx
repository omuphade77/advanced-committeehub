import React, { useEffect } from "react";

const Admin = () => {
  useEffect(() => {
    const form = document.getElementById('adminLoginForm');
    const passwordInput = document.getElementById('password');

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const password = passwordInput.value;

      try {
        const response = await fetch("http://localhost:3000/api/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ password })
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("adminToken", data.token);
          alert("Login successful! Redirecting to admin dashboard...");
          window.open("../Home/admin/admin.html", "_blank");
        } else {
          alert(data.message || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
      }
    });
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink: #0f0e0d;
          --cream: #f5f0e8;
          --gold: #c9a84c;
          --rust: #c94c2e;
          --rust-dark: #9e3a21;
        }

        body {
          min-height: 100vh;
          background: #100e0c;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(ellipse 50% 60% at 50% 100%, rgba(201,76,46,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 0%, rgba(201,168,76,0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        body::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .back-link {
          position: fixed;
          top: 2rem;
          left: 2rem;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s;
          z-index: 10;
        }
        .back-link:hover { color: rgba(245,240,232,0.7); }

        .admin-box {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
          padding: 3.5rem;
          border: 1px solid rgba(245,240,232,0.08);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          animation: fadeUp 0.8s ease both;
          text-align: center;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .shield-icon {
          font-size: 2.5rem;
          margin-bottom: 1.25rem;
          display: block;
        }

        .eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--rust);
          margin-bottom: 0.75rem;
        }

        h1 {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem;
          font-weight: 900;
          color: var(--cream);
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .subtitle {
          font-size: 0.82rem;
          color: rgba(245,240,232,0.35);
          font-weight: 300;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .divider {
          width: 40px;
          height: 1px;
          background: var(--rust);
          margin: 0 auto 2.5rem;
          opacity: 0.6;
        }

        .form-group { display: flex; flex-direction: column; gap: 1rem; text-align: left; }

        .input-wrap { position: relative; }

        .input-label {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.35);
          margin-bottom: 0.5rem;
        }

        input[type="password"] {
          width: 100%;
          padding: 0.9rem 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(245,240,232,0.1);
          color: var(--cream);
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.15em;
          outline: none;
        }

        .submit-btn {
          width: 100%;
          padding: 0.95rem;
          background: var(--rust);
          color: var(--cream);
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 0.5rem;
        }

        .warning {
          margin-top: 2rem;
          padding: 0.9rem;
          border: 1px solid rgba(201,76,46,0.2);
          background: rgba(201,76,46,0.06);
          font-size: 0.72rem;
          color: rgba(245,240,232,0.3);
        }
      `}</style>

      <a href="../Home/home.html" className="back-link">← Back</a>

      <div className="admin-box">
        <span className="shield-icon">🛡️</span>
        <p className="eyebrow">Restricted Access</p>
        <h1>Admin<br />Portal</h1>
        <div className="divider"></div>
        <p className="subtitle">
          This area is reserved for authorized administrators only.<br />
          Unauthorized access attempts are logged.
        </p>

        <form id="adminLoginForm" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <div className="input-wrap">
              <label className="input-label">Secret Password</label>
              <input type="password" id="password" placeholder="Enter admin password" required />
            </div>
            <button type="submit" className="submit-btn">Authenticate</button>
          </div>
        </form>

        <div className="warning">
          <strong>⚠ Warning:</strong> This portal is for authorized personnel only. All login attempts are monitored and recorded.
        </div>
      </div>
    </>
  );
};

export default Admin;