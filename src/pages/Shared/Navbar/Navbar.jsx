import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { useTheme } from "next-themes";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const { theme, setTheme } = useTheme();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const storedClasses =
      JSON.parse(localStorage.getItem("selectedClasses")) || [];
    setSelectedClasses(storedClasses);
  }, []);

  useEffect(() => {
    const updateBadgeCount = () => {
      setSelectedClasses((prevClasses) => {
        const storedClasses =
          JSON.parse(localStorage.getItem("selectedClasses")) || [];
        if (prevClasses.length !== storedClasses.length) {
          return storedClasses;
        }
        return prevClasses;
      });
    };

    window.addEventListener("storage", updateBadgeCount);

    return () => {
      window.removeEventListener("storage", updateBadgeCount);
    };
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/instructor">Instructors</Link>
      </li>
      <li>
        <Link to="/classes">
          Classes
          <div className="badge badge-secondary">{selectedClasses.length}</div>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">DashBoard</Link>
      </li>
    </>
  );

  const toggleMobileMenu = () => {
    setShowMobileMenu((prevShowMobileMenu) => !prevShowMobileMenu);
  };

  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-2xl bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {showMobileMenu && (
              <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                {navOptions}
              </ul>
            )}
          </div>
          <a className="btn btn-ghost text-orange-500 normal-case text-xl">
            Summer Camp
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="flex">
                <img
                  className="rounded-full mr-2"
                  src={user && user.photoURL ? user.photoURL : ""}
                  alt="profile"
                  height="30"
                  width="30"
                />
                <button onClick={handleLogOut} className="btn btn-ghost">
                  LogOut
                </button>
              </div>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          <button className="btn btn-outline" onClick={toggleTheme}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
