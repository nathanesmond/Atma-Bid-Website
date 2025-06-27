import { Outlet } from "react-router-dom";

import Header from '../components/Header';
import Footer from '../components/Footer';

const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/information",
    name: "Information",
  },
];

const MainLayout = () => {
  return (
    <div>
      <Header routes={routes} />
      <Outlet />
      <Footer />
    </div>
  );
};


export default MainLayout;
