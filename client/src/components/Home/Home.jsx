import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import techno from "../assets/logos/technovanja.jpg";
import ranga from "../assets/logos/ranga.jpg";
import ecell from "../assets/logos/ecell.jpg";
import digitalvjti from "../assets/logos/digitalvjti.jpg";
import enthu from "../assets/logos/enthu.jpg";
import coc from "../assets/logos/coc.jpg";
import prati from "../assets/logos/prati.jpg";
import swachh from "../assets/logos/swachh.jpg";
import dla from "../assets/logos/dla.png";

export default function Home() {
useEffect(() => {
  const issueModal = document.getElementById("issueModal");
  if (issueModal) {
    issueModal.addEventListener("click", function (e) {
      if (e.target === issueModal) closeIssueForm();
    });
  }
}, []);

  const navigate = useNavigate();

function openCommittee(name) {
  navigate(`/committee?committeeName=${name}`);
}

  function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (sidebar) sidebar.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}
  function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (sidebar) sidebar.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
}


  function showSection(sectionId) {
    const sections = document.querySelectorAll("section");
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");

    document.querySelectorAll(".nav-links li a").forEach(a => a.classList.remove("active"));
    const activeLink = document.querySelector(`.nav-links li a[href="#${sectionId}"]`);
    if (activeLink) activeLink.classList.add("active");

    closeSidebar();
  }

  function openIssueForm() {
    const modal = document.getElementById("issueModal");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    closeSidebar();
  }

  function closeIssueForm() {
    const modal = document.getElementById("issueModal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
    document.getElementById("issueTitle").value = "";
    document.getElementById("issueDesc").value = "";
    document.getElementById("issueCategory").value = "general";
  }

  function submitIssue() {
    const title = document.getElementById("issueTitle").value.trim();
    const desc = document.getElementById("issueDesc").value.trim();

    if (!title || !desc) {
      const err = document.getElementById("issueError");
      err.style.display = "block";
      setTimeout(() => err.style.display = "none", 3000);
      return;
    }

    document.getElementById("issueFormBody").style.display = "none";
    document.getElementById("issueSuccess").style.display = "flex";

    setTimeout(() => {
      closeIssueForm();
      document.getElementById("issueFormBody").style.display = "block";
      document.getElementById("issueSuccess").style.display = "none";
    }, 2500);
  }

  function toggleInterest(element) {
    element.classList.toggle("selected");
  }

  function findMatch() {
    const selected = document.querySelectorAll(".interest-tag.selected");

    if (selected.length === 0) {
      alert("Please select at least one interest!");
      return;
    }

    let interests = Array.from(selected).map(el => el.innerText.trim());

    const mapping = {
      "Technology": { committee: "Technovanza / Community of Coders", desc: "Innovation, coding and tech building " },
      "Academic Excellence": { committee: "Community of Coders", desc: "Coding + academics " },
      "Sports": { committee: "Enthusia", desc: "Sports & fitness " },
      "Arts": { committee: "Rangwardhan / Pratibimb", desc: "Creative arts " },
      "Performance": { committee: "Rangwardhan / Pratibimb", desc: "Stage & performance " },
      "Environment": { committee: "Swacch VJTI", desc: "Sustainability " },
      "Finance": { committee: "Ecell VJTI", desc: "Finance & entrepreneurship " },
      "Writing": { committee: "Digital Literary Activities", desc: "Writing & content " },
      "Social Media": { committee: "Digital VJTI", desc: "Social media & outreach " },
      "Event Planning": { committee: "Technovanza / Enthusia", desc: "Event management " },
      "Photography": { committee: "Digital VJTI", desc: "Photography " }
    };

    let resultsHTML = "";

    interests.forEach(interest => {
      for (let key in mapping) {
        if (interest.includes(key)) {
          const data = mapping[key];

          resultsHTML += `
            <div class="match-card">
              <h4>${interest}</h4>
              <p><strong>Committee:</strong> ${data.committee}</p>
              <p>${data.desc}</p>
            </div>
          `;
        }
      }
    });

    document.getElementById("matchedCommittee").innerHTML = resultsHTML;
    document.getElementById("matchDescription").innerText = "Based on your selected interests:";
    document.getElementById("matchResult").style.display = "block";
  }

  function openAdminPanel() {
    window.location.href = "/login";
  }

  function openRoleForm() {
    window.location.href = "/add-role";
  }

  function openConnectModal() {
    window.location.href = "/connectwithus";
  }

  return (
    <>
      {/* Sidebar */}
      <div id="sidebar" className="sidebar">
  <div className="sidebar-header">
    <span className="sidebar-title">CommitteeHub</span>
    <button onClick={closeSidebar}>✕</button>
  </div>

  <nav className="sidebar-nav">
    <ul>
      <li>
        <a onClick={() => showSection("home")}>🏠 Home</a>
      </li>
      <li>
        <a onClick={() => showSection("events")}>📅 Events</a>
      </li>
      <li>
        <a onClick={() => showSection("match")}>🎯 Your Match</a>
      </li>

      <li className="divider"></li>

      <li>
        <button onClick={openIssueForm}>⚠️ Raise an Issue</button>
      </li>
      <li>
        <button onClick={openRoleForm}>🎯 Add your Role</button>
      </li>
      <li>
        <button onClick={openAdminPanel}>Admin panel</button>
      </li>
      <li>
        <button onClick={openConnectModal}>Connect with us</button>
      </li>
    </ul>
  </nav>
</div>
<div id="overlay" onClick={closeSidebar}></div>
      {/* Navbar */}
      <nav>
        <button onClick={toggleMenu}>Menu</button>
        <ul className="nav-links">
          <li><a onClick={() => showSection("home")}>Home</a></li>
          <li><a onClick={() => showSection("events")}>Events</a></li>
          <li><a onClick={() => showSection("match")}>Match</a></li>
        </ul>
      </nav>

      {/* Sections */}
      <section id="home" className="active">
        <h1>Our Committees</h1>

      <div className="committee-box" onClick={() => openCommittee("Technovanza")}>
  <div className="image-wrapper">
    <img src={techno} alt="Technovanza" />
  </div>
  <span>Technovanza</span>
</div>

   <div className="committee-box" onClick={() => openCommittee("Technovanza")}>
  <div className="image-wrapper">
    <img src={enthu} alt="Technovanza" />
  </div>
  <span>Enthusia</span>
</div>

   <div className="committee-box" onClick={() => openCommittee("Technovanza")}>
  <div className="image-wrapper">
    <img src={ranga} alt="Technovanza" />
  </div>
  <span>Rangwardhan</span>
</div>
   <div className="committee-box" onClick={() => openCommittee("Technovanza")}>
  <div className="image-wrapper">
    <img src={swachh} alt="Technovanza" />
  </div>
  <span>Swachh VJTI</span>
</div>
   <div className="committee-box" onClick={() => openCommittee("Technovanza")}>
  <div className="image-wrapper">
    <img src={digitalvjti} alt="Technovanza" />
  </div>
  <span>Digital VJTI</span>
</div>
   <div className="committee-box" onClick={() => openCommittee("Technovanza")}>
  <div className="image-wrapper">
    <img src={dla} alt="Technovanza" />
  </div>
  <span>DLA</span>
</div>
   <div className="committee-box" onClick={() => openCommittee("Technovanza")}>
  <div className="image-wrapper">
    <img src={ecell} alt="Technovanza" />
  </div>
  <span>Ecell</span>
</div>
   <div className="committee-box" onClick={() => openCommittee("Technovanza")}>
  <div className="image-wrapper">
    <img src={prati} alt="Technovanza" />
  </div>
  <span>Pratibimb</span>
</div>
   <div className="committee-box" onClick={() => openCommittee("Technovanza")}>
  <div className="image-wrapper">
    <img src={techno} alt="Technovanza" />
  </div>
  <span>Technovanza</span>
</div>

  
      </section>
return (
  <>
    {/* your existing code */}

    {/* ✅ ADD THIS AT THE END */}
    <div id="issueModal" className="issue-modal">
      <div className="issue-box">
        <div className="issue-modal-header">
          <div className="issue-modal-title">
            <h2>Raise an Issue</h2>
            <p>Report a problem or share feedback with us</p>
          </div>
          <button
            className="modal-close-btn"
            onClick={closeIssueForm}
          >
            ✕
          </button>
        </div>

        <div id="issueFormBody">
          <div id="issueError" className="issue-error">
            ⚠️ Please fill in both the title and description before submitting.
          </div>

          <div className="form-group">
            <label>Category</label>
            <select id="issueCategory">
              <option value="general">General</option>
              <option value="technical">Technical Problem</option>
              <option value="event">Event Related</option>
              <option value="committee">Committee Related</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Issue Title</label>
            <input id="issueTitle" type="text" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea id="issueDesc"></textarea>
          </div>

          <div className="form-actions">
            <button onClick={submitIssue}>Submit Issue</button>
            <button onClick={closeIssueForm}>Cancel</button>
          </div>
        </div>

        <div id="issueSuccess" style={{ display: "none" }}>
          <h3>Issue Submitted!</h3>
        </div>
      </div>
    </div>
  </>
);
      <section id="events">
        <h1>Events</h1>
      </section>

      <section id="match">
  <h1>Match</h1>

  <div className="interests-grid">
    {[
      "Arts",
      "Sports",
      "Academic Excellence",
      "Technology",
      "Event Planning",
      "Social Media",
      "Environment",
      "Finance",
      "Writing",
      "Performance",
      "Photography"
    ].map((interest, index) => (
      <div
        key={index}
        className="interest-tag"
        onClick={(e) => e.target.classList.toggle("selected")}
      >
        <div>{interest}</div>
      </div>
    ))}
  </div>

  <button onClick={findMatch}>Find Match</button>

  <div id="matchResult" style={{ display: "none" }}>
    <h3>Your Perfect Match!</h3>
    <div id="matchedCommittee"></div>
    <p id="matchDescription"></p>
  </div>
</section>
    </>
  );
}