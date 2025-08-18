import React from "react";
import { useAuthContext } from "../context/AuthContext";
import AuthService from "../service/auth.service";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-base-200 via-base-100 to-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-300">
        <div className="card-body items-center text-center">
          <div className="avatar mb-4">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.userInfo?.username}&background=random`}
                alt="avatar"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-primary capitalize">
            {user?.userInfo?.username || "Username"}
          </h2>

          <p className="text-sm text-gray-500 mb-1">
            {user?.userInfo?.email || "Email"}
          </p>

          {user?.authorities?.length > 0 && (
            <div className="mt-1 mb-3">
              <span className="badge badge-outline badge-secondary">
                {user.authorities[0].replace("ROLE_", "")}
              </span>
            </div>
          )}

          <div className="divider mt-2 mb-4" />

          <div className="flex gap-3">
            <button className="btn btn-outline btn-primary w-32">
              Edit Profile
            </button>
            <button
              onClick={handleLogOut}
              className="btn btn-outline btn-error w-32"
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
