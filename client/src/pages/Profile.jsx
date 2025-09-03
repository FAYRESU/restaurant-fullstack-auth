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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="card w-full max-w-md shadow-2xl bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
        <div className="card-body items-center text-center space-y-4">
          {/* Cartoon Avatar */}
          <div className="avatar mb-3">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg hover:scale-105 transition-transform">
              <img
                src={`https://avatars.dicebear.com/api/adventurer/${user?.userInfo?.username}.svg`}
                alt="avatar"
              />
            </div>
          </div>

          {/* Username */}
          <h2 className="text-3xl font-bold text-indigo-600 capitalize drop-shadow">
            {user?.userInfo?.username || "Username"}
          </h2>

          {/* Email */}
          <p className="text-sm text-gray-600">
            {user?.userInfo?.email || "example@email.com"}
          </p>

          {/* Role Badge */}
          {user?.authorities?.length > 0 && (
            <div className="mt-1">
              <span className="badge badge-primary badge-outline text-sm px-4 py-2 shadow-md">
                {user.authorities[0].replace("ROLE_", "")}
              </span>
            </div>
          )}

          <div className="divider mt-4 mb-2" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button className="btn btn-primary w-full sm:w-36 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition">
              ✏️ Edit Profile
            </button>
            <button
              onClick={handleLogOut}
              className="btn btn-error btn-outline w-full sm:w-36 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
