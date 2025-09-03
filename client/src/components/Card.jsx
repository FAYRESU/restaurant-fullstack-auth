import React from "react";
import restaurantService from "../service/restaurant.sevice";
import { useAuthContext } from "../context/AuthContext";

const Card = ({ id, title, type, imageUrl }) => {
  const { user } = useAuthContext();

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );
    if (!isConfirmed) return;

    try {
      await restaurantService.deleteRestaurant(id);
      alert("Restaurant deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete the restaurant.");
    }
  };

  return (
    <div className="card w-80 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-gray-200">
      <figure className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-3 left-3 badge badge-primary text-white shadow-md">
          NEW
        </div>
      </figure>

      <div className="card-body">
        <h2 className="card-title text-xl font-semibold text-gray-800">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mb-3">{type}</p>

        {user && (user?.authorities.includes("ROLES_ADMIN") ||
                  user?.authorities.includes("ROLES_MODERATOR")) && (
          <div className="card-actions justify-end gap-2">
            {user?.authorities.includes("ROLES_ADMIN") && (
              <button
                onClick={() => handleDelete(id)}
                className="btn btn-error btn-sm shadow-md hover:shadow-lg"
              >
                Delete
              </button>
            )}
            <a
              href={`/update/${id}`}
              className="btn btn-warning btn-sm shadow-md hover:shadow-lg"
            >
              Edit
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
