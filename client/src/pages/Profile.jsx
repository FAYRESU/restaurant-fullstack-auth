import React from "react";
import { useAuthContext } from "../context/AuthContext";
const Profile = () => {
  const { user } = useAuthContext();
  const handleLogOut = () => {
    logout();
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.userInfo?.username}&background=random`}
                alt="avatar"
              />
            </div>
          </div>
          <h2 className="card-title mt-4 capitalize">
            {user?.userInfo?.username || "Username"}
          </h2>
          <p className="text-sm text-gray-500">
            {user?.userInfo?.email || "Email"}
          </p>

          {user?.authorities?.length > 0 && (
            <div className="mt-2">
              <div className="badge badge-secondary">
                {user.authorities[0].replace("ROLE_", "")}
              </div>
            </div>
          )}

          <div className="card-actions mt-6">
            <button className="btn btn-outline btn-primary">
              Edit Profile
            </button>
            <a onClick={handleLogOut} className="btn btn-outline btn-error">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
