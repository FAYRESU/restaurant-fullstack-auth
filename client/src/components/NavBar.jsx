import React from "react";
import { useAuthContext } from "../context/AuthContext";
import UserProfile from "./UserProfile";

const NavBar = () => {
  const { user } = useAuthContext();
  const menuItems = [
    { name: "Search", url: "/" },
    { name: "Add Restaurant", url: "/add" },
    { name: "About Us", url: "/about" },
  ];

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-md rounded-b-xl px-4 py-2 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Grab Restaurant
          </a>

          {/* Mobile dropdown */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
            >
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a href={item.url} className="hover:bg-indigo-100 rounded-md">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* User actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <UserProfile />
          ) : (
            <>
              <a
                href="/register"
                className="btn btn-outline btn-primary rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-transform"
              >
                Register
              </a>
              <a
                href="/signin"
                className="btn btn-outline btn-success rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-transform"
              >
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
