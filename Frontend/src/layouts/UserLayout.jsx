import { Outlet } from "react-router-dom";

import Footer from '../components/Footer';
import HeaderLogin from "../components/HeaderLogin";

const routes = [
  {
    path: "/login",
    name: "login",
  },
];

const UserLayout = () => {
  return (
    <div className="mt-4 pt-5">
      <HeaderLogin routes={routes} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
