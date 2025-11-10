import { IoLogoModelS } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaGear, FaUser } from "react-icons/fa6";
import { LuRotate3D } from "react-icons/lu";
import { ImBoxAdd } from "react-icons/im";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md">
      <div className="navbar container mx-auto">
        {/*  Left  */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </div>

            {/* Mobile menu items */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">
                  <GoHomeFill /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/all-product">
                  <IoLogoModelS /> All Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-product">
                  <ImBoxAdd /> Add Product
                </NavLink>
              </li>

              {/* show logged in */}
              {user && (
                <>
                  <li>
                    <Link to="/profile">
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-exports">My Exports</Link>
                  </li>
                  <li>
                    <Link to="/my-imports">My Imports</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1 text-4xl font-extrabold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
          >
            <LuRotate3D className="text-pink-600" /> Export{" "}
            <span className="text-purple-600">Import</span>
          </Link>
        </div>

        {/*Center */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-4 font-medium">
            <li>
              <NavLink to="/" className="hover:text-pink-600 transition-all">
                <GoHomeFill /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-product"
                className="hover:text-pink-600 transition-all"
              >
                <IoLogoModelS /> All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-product"
                className="hover:text-pink-600 transition-all"
              >
                <ImBoxAdd /> Add Product
              </NavLink>
            </li>

            {/* user logged in */}
            {user && (
              <>
                <li>
                  <NavLink to="/my-exports" className="hover:text-pink-600">
                    My Exports
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-imports" className="hover:text-pink-600">
                    My Imports
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/*  Right side */}
        <div className="navbar-end gap-3">
          {user ? (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 border-2 border-pink-400 rounded-full">
                  <img
                    alt="User avatar"
                    referrerPolicy="no-referrer"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>

              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-3 shadow-lg"
              >
                <div className="pb-2 mb-2 border-b border-gray-200">
                  <p className="font-semibold text-gray-700">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <li>
                  <Link to="/my-exports">My Exports</Link>
                </li>
                <li>
                  <Link to="/my-imports">My Imports</Link>
                </li>

                {/* Dark mode toggle */}
                <li>
                  <label className="flex items-center justify-between cursor-pointer mt-2">
                    <span className="flex items-center gap-2">
                      <FaGear /> Dark Mode
                    </span>
                    <input
                      type="checkbox"
                      className="toggle"
                      onChange={(e) => handleTheme(e.target.checked)}
                      defaultChecked={localStorage.getItem("theme") === "dark"}
                    />
                  </label>
                </li>

                {/* Logout button */}
                <li>
                  <button
                    onClick={signOutUser}
                    className="btn text-white font-semibold rounded-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-md"
                  >
                    <IoLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            //  If not logged in
            <Link
              to="/login"
              className="btn text-white font-semibold rounded-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-md"
            >
              <IoLogIn /> Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
