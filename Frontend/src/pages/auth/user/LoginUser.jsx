import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { authService } from "../../../api/authService";

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.login({
        email: loginData.email,
        password: loginData.password,
      });
      toast.success("Login berhasil!");
      localStorage.setItem("isLoggedIn", "true");
      console.log(user);
      navigate("/profile");
    } catch (error) {
      toast.error("Login gagal. Periksa email atau password Anda.");
      console.error("Login Error:", error.response?.data || error.message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Password tidak cocok!");
      return;
    }
    try {
      await authService.register({
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
        password_confirmation: signupData.confirmPassword,
      });
      toast.success("Registrasi berhasil! Silakan login.");
      setIsRightPanelActive(false);
    } catch (error) {
      toast.error("Registrasi gagal. Coba lagi.");
      console.error("Signup Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="page-login body">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeButton={false}
      />
      <div className="page-login container-main">
        <div
          className={`container-signup ${
            isRightPanelActive ? "right-panel-active" : ""
          }`}
          id="main"
        >
          {/* Sign Up Form */}
          <div className="page-login sign-up">
            <form onSubmit={handleSignupSubmit}>
              <h1 className="page-login heder">Sign Up</h1>
              <input
                type="text"
                name="username"
                placeholder="username"
                required
                value={signupData.username}
                onChange={handleSignupChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={signupData.email}
                onChange={handleSignupChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={signupData.password}
                onChange={handleSignupChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
              />
              <button className="page-login fix" type="submit">
                Sign Up
              </button>
            </form>
          </div>

          {/* Log In Form */}
          <div className="page-login log-in">
            <form onSubmit={handleLoginSubmit}>
              <h1 className="page-login heder">Log In</h1>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={loginData.email}
                onChange={handleLoginChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={loginData.password}
                onChange={handleLoginChange}
              />
              <button className="page-login fix" type="submit">
                Log In
              </button>
            </form>
          </div>

          {/* Overlay */}
          <div className="page-login container-overlay">
            <div className="page-login overlay">
              <div className="page-login overlay-left">
                <h1>Already Have an Account?</h1>
                <button id="login" onClick={() => setIsRightPanelActive(false)}>
                  Log in
                </button>
              </div>
              <div className="overlay-right">
                <h1>Dont Have an Account?</h1>
                <button id="signup" onClick={() => setIsRightPanelActive(true)}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
