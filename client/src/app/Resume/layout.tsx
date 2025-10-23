import React from "react";
import { Outlet } from "react-router-dom";

export default function ResumeLayout() {
  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <section style={{ padding: "2rem", textAlign: "center" }}>
        <h1>🌟 Welcome to the Resume Page 🌟</h1>
        <p>My Resume</p>
      </section>
      <Outlet />
    </div>
  );
}
