// import React from 'react';
import { NavLink } from "react-router-dom";
import "../pages/auth/admin/admin.css";
import logo from "../assets/images/logo.png";

const HeaderAdmin = () => {
  return (
    <header style={{ height: "7rem", width: "100%" }}>
      <nav
        className="d-flex justify-content-between align-items-center"
        style={{ height: "100%", width: "100%" }}
      >
        {/* Logo */}
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo" />
          </a>
        </div>

        {/* Navbar kanan */}
        <div className="navbar-right" style={{ height: "100%" }}>
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
              display: "flex",
            }}
          >
            <li style={{ marginRight: "1rem" }}>
              <a href="/admin/manageusers">Kelola Pengguna</a>
            </li>
            <li>
              <a href="/admin/managebids">Kelola Lelang</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
