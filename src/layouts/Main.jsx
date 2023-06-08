import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/NavBar";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-24 min-h-[75vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
