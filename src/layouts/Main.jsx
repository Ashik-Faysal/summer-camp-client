import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/NavBar";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");
  return (
    <div>
      {noHeaderFooter || <Navbar />}
      <div className="pt-24 min-h-[75vh]">
        <Outlet />
      </div>
      {noHeaderFooter || <Footer/>}
    </div>
  );
};

export default Main;
