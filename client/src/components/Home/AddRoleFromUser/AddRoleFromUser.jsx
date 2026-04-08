import React, { useEffect } from "react";
import "./role.css";

export default function AddRoleFromUser() {

useEffect(() => {
  const form = document.getElementById("roleForm");

  if (!form) return; // ✅ prevents crash

  const handler = async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      mobile: document.getElementById("mobile").value,
      email: document.getElementById("email").value,
      branch: document.getElementById("branch").value,
      role: document.getElementById("role").value,
      committee_name: document.getElementById("committee_name").value,
      year: document.getElementById("year").value
    };

    try {
      const res = await fetch("http://localhost:3000/api/roles/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert("Request submitted successfully!");
        form.reset();
      } else {
        alert("Failed to submit request");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  form.addEventListener("submit", handler);

  return () => form.removeEventListener("submit", handler); // ✅ cleanup
}, []);

  return (
    <div className="form-container">
      <h1>Add Your Role</h1>

      <form id="roleForm">
        <input type="text" id="name" placeholder="Full Name" required />
        <input type="text" id="mobile" placeholder="Mobile Number" required />
        <input type="email" id="email" placeholder="Email" required />

        <select id="branch" required>
          <option value="">Select Branch</option>
          <option value="CS">CS</option>
          <option value="IT">IT</option>
          <option value="EXTC">EXTC</option>
          <option value="Electronics">Electronics</option>
          <option value="Electrical">Electrical</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
          <option value="Textile">Textile</option>
          <option value="Production">Production</option>
        </select>

        <select id="role" required>
          <option value="">Select Role</option>
          <option value="Department Head">Department Head</option>
          <option value="Secretary">Secretary</option>
          <option value="Treasurer">Treasurer</option>
          <option value="Department Coordinator">Department Coordinator</option>
        </select>

        <select id="committee_name" required>
          <option value="">Select Committee</option>
          <option value="Technovanza">Technovanza</option>
          <option value="Digital VJTI">Digital VJTI</option>
          <option value="Enthusia">Enthusia</option>
          <option value="DLA">DLA</option>
          <option value="COC (Community of Coders)">
            COC (Community of Coders)
          </option>
          <option value="Swacch VJTI">Swacch VJTI</option>
          <option value="Pratibimb">Pratibimb</option>
          <option value="Rangwardhan">Rangwardhan</option>
          <option value="E-Cell VJTI">E-Cell VJTI</option>
        </select>

        <select id="year" required>
          <option value="">Select Year</option>
          <option value="1st">1st Year</option>
          <option value="2nd">2nd Year</option>
          <option value="3rd">3rd Year</option>
        </select>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}