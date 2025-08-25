import React from "react";
import { useAuthContext } from "../context/AuthContext";
import AuthService from "../service/auth.service";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center px-4">
      <div className="card w-full max-w-md shadow-xl bg-white border border-gray-200 rounded-xl transition-transform duration-300 hover:scale-[1.01]">
        <div className="card-body items-center text-center">
          {/* Avatar */}
          <div className="avatar mb-4">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-md transition-transform hover:scale-105">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.userInfo?.username}&background=random`}
                alt="avatar"
              />
            </div>
          </div>

          {/* Username */}
          <h2 className="text-2xl font-semibold text-primary capitalize">
            {user?.userInfo?.username || "Username"}
          </h2>

          {/* Email */}
          <p className="text-sm text-gray-500 mb-1">
            {user?.userInfo?.email || "Email"}
          </p>

          {/* Role Badge */}
          {user?.authorities?.length > 0 && (
            <div className="mt-1 mb-3">
              <span className="badge badge-outline badge-secondary text-sm px-3 py-1">
                {user.authorities[0].replace("ROLE_", "")}
              </span>
            </div>
          )}

          <div className="divider mt-2 mb-4" />

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="btn btn-outline btn-primary w-32 transition hover:scale-105 hover:shadow-lg">
              Edit Profile
            </button>
            <button
              onClick={handleLogOut}
              className="btn btn-outline btn-error w-32 transition hover:scale-105 hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
