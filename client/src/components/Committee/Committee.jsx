import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

export default function Committee() {
  const [committeeName, setCommitteeName] = useState("");
  const [data, setData] = useState({});
  const [members, setMembers] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("committeeName");

    if (!name) {
      alert("No committee selected");
      throw new Error("Missing committee name");
    }

    setCommitteeName(name);

    fetchCommitteeData(name);
    fetchMembers(name);
  }, [location.search]);

  async function fetchCommitteeData(name) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/committees/${name}`
      );

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching committee data:", error);
    }
  }

  async function fetchMembers(name) {
    try {
      const res = await fetch("http://localhost:3000/api/roles/members");
      const result = await res.json();

      const filtered = result.data.filter(
        (m) => m.committee_name === name
      );

      setMembers(filtered);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  }

  // group by year (same logic)
  const grouped = {};
  members.forEach((m) => {
    if (!grouped[m.year]) grouped[m.year] = [];
    grouped[m.year].push(m);
  });

  return (
    <>
      {/* Sidebar */}
      <div id="sidebar" className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">CommitteeHub</span>
          <button className="sidebar-close">✕</button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/">🏠 Home</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div id="overlay" className="overlay"></div>

      {/* Navbar */}
      <nav>
        <div className="nav-container">
          <div className="logo">CommitteeHub</div>

          <button className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className="nav-links">
            <li>
              <Link to="/" className="active">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main */}
      <div className="container">
        <section className="active">
          <h1 id="name">{data.committee_name}</h1>

          <div
            className="committee-box"
            style={{ maxWidth: "500px", margin: "auto" }}
          >
            <div className="image-wrapper">
              <img
                id="logo"
                src={data.committee_logo_url}
                alt="logo"
              />
            </div>

            <div
              className="committee-description"
              id="description"
            >
              {data.committee_description}
            </div>
          </div>

          <h2 style={{ textAlign: "center", marginTop: "30px" }}>
            Members
          </h2>

          <div id="members-container" style={{ marginTop: "20px" }}>
            {Object.keys(grouped).length === 0 ? (
              <p>No members yet</p>
            ) : (
              Object.keys(grouped).map((year) => (
                <div key={year}>
                  <h3 style={{ marginTop: "20px" }}>
                    {year} Year
                  </h3>

                  <div className="member-grid">
                    {grouped[year].map((m, i) => (
                      <div className="member-card" key={i}>
                        <h4>{m.name}</h4>
                        <p>{m.role}</p>
                        <p>{m.branch}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}