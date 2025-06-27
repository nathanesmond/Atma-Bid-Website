import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
// import Header from "../components/Header";
import HeaderAdmin from "../components/HeaderAdmin";

const routes = [];

const AdminLoginLayout = () => {
    return (
        <div>
            <HeaderAdmin routes={routes} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default AdminLoginLayout;
