import React from "react";
import { useAuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { logout } = useAuthContext();

  const handleLogOut = () => {
    logout();
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Avatar Button */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar transition-transform hover:scale-110"
      >
        <div className="w-12 rounded-full ring ring-indigo-400 ring-offset-base-100 ring-offset-2 shadow-md">
          <img
            alt="User Avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 w-52 bg-white shadow-lg rounded-xl p-2 border border-gray-200"
      >
        <li>
          <a
            href="/profile"
            className="justify-between rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Profile
            <span className="badge badge-sm badge-primary">New</span>
          </a>
        </li>
        <li>
          <a className="rounded-lg hover:bg-indigo-50 transition-colors">Settings</a>
        </li>
        <li>
          <a
            onClick={handleLogOut}
            className="rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
