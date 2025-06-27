import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import HeaderAdmin from "../components/HeaderAdmin";
import "bootstrap/dist/css/bootstrap.min.css";

const routes = [];

const AdminLayout = () => {
  return (
    <div>
      <HeaderAdmin routes={routes} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;
