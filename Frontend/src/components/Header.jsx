import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/images/logo.png';
import profileImage from '../assets/images/profile.png';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "../api/authService";
import { GetProfile } from "../clients/apiUser"; 

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [formData, setFormData] = useState({ username: "" });

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }, []);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          !event.target.closest(".page-navbar.user-info") &&
          !event.target.closest(".page-navbar.dropdown")
        ) {
          setDropdownVisible(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchProfileData = async () => {
          try {
            const response = await GetProfile();
            setFormData({
              username: response.data.user.username
            });
            console.log("Profile data fetched successfully:", response);
          } catch (err) {
            console.error("Error details:", err); 
          } 
        };
    
        fetchProfileData();
      }, []); 

    const handleDropdownToggle = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = async (e) => {
      e.preventDefault();
      try {
        await authService.logout();
        setIsLoggedIn(false);
        toast.success("Logout berhasil!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } catch (error) {
        toast.error("Logout gagal. Silakan coba lagi.");
        console.error("Logout Error:", error);
      }
    };

    return (
        <header>
          <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
          <div className="page-navbar navbar p-0" style={{ height: "110px" }}>
        <div className="page-navbar logo">
          <a href="/">
            <img src={logo} alt="Logo" />
          </a>
        </div>

        <div className="page-navbar container-linkz">
          <div className="page-navbar linkz">
            <a className="page-navbar button-nav" href="/catalog">
              Catalog
            </a>
            <a className="page-navbar button-nav" href="/upcoming">
              Upcoming
            </a>
            <a className="page-navbar button-nav" href="/information">
              Information
            </a>
          </div>
        </div>

        <div className="page-navbar container-loginz">
          {isLoggedIn ? (
            <div
              className="page-navbar user-info"
              onClick={handleDropdownToggle}
            >
              <img
                src={profileImage}
                alt="User Photo"
                className="page-navbar user-photo"
              />
              <span className="page-navbar user-name fw-bold">{formData.username}</span>
              <div
                className={`page-navbar dropdown ${
                  dropdownVisible ? "visible" : ""
                }`}
              >
                <a
                  href="/profile"
                  className="page-navbar dropdown-item"
                  id="profileDetail"
                >
                  <i className="fas fa-eye"></i> Detail
                </a>
                <a
                  href="/addBid"
                  className="page-navbar dropdown-item"
                  id="tambahLelangButton"
                >
                  <i className="fas fa-plus-circle"></i> Tambah Lelang
                </a>
                <a
                  href="/add"
                  className="page-navbar dropdown-item"
                  id="lelangSayaButton"
                >
                  <i className="fas fa-gavel"></i> Lelang Saya
                </a>
                <a
                  href="/"
                  className="page-navbar dropdown-item logout"
                  id="logoutButton"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </a>
              </div>
            </div>
          ) : (
            <div className="page-navbar container-linkz">
              <div className="page-navbar linkz">
                <a className="page-navbar button-nav" href="/login">
                  Login / Register
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
