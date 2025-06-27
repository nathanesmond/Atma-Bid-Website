import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { authService } from "../../../api/authService";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await authService.login({ email, password });
            if (authService.isAdmin(user)) {
                toast.success("Login berhasil sebagai admin!");
                console.log("Admin berhasil login:", user);
                navigate("/admin/manageusers");
            } else {
                await authService.logout();
                toast.error("Anda bukan admin!");
                console.error("Bukan admin:", user);
            }
        } catch (error) {
            toast.error("Email atau password salah!");
            console.error(
                "Login Error:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div style={styles.body}>
            <ToastContainer position="top-right" autoClose={3000} />
            {/* Toast Container */}
            <div className="container content">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card login-card" style={styles.card}>
                            <h4 style={styles.title}>Admin Login</h4>
                            <form onSubmit={handleSubmit} style={styles.form}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        style={styles.input}
                                        className="form-control"
                                        id="email"
                                        placeholder="example@gmail.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        style={styles.input}
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-dark"
                                        style={styles.button}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    body: {
        backgroundColor: "#F5F6FA",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "140vh",
        margin: 0,
    },
    card: {
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "30px",
        height: "28rem",
        maxWidth: "40rem",
    },
    title: {
        textAlign: "center",
        marginTop: "2rem",
        marginBottom: "20px",
    },
    form: {
        marginTop: "2rem",
    },
    input: {
        borderWidth: "0px 0px 2px 0px",
    },
    button: {
        width: "200px",
        margin: "auto",
        marginTop: "2rem",
        borderRadius: "100px",
    },
};

export default AdminLogin;
