import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ role = "student" }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar role={role} />
        <main
          style={{
            flex: 1,
            backgroundColor: "var(--color-bg)",
            padding: "2rem",
            overflowX: "hidden"
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
