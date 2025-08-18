import React from "react";
import { Link } from "react-router";

const NotAllowed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-error mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
        <p className="mb-6 text-gray-500">
          You do not have permission to view this page.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotAllowed;
