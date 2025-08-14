import React from "react";
import restaurantService from "../service/restaurant.sevice";

const Card = (props) => {
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
    <div className="card w-96 bg-base-100 shadow-xl glass hover:scale-105 transition-transform duration-300">
      <figure>
        <img
          src={props.imageUrl}
          alt="Restaurant"
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold text-primary">
          {props.title}
          <div className="badge badge-accent text-white">NEW</div>
        </h2>
        <p className="text-sm text-gray-500">{props.type}</p>
        <div className="card-actions justify-end mt-4">
          <button
            onClick={() => handleDelete(props.id)}
            className="btn btn-error btn-sm"
          >
            Delete
          </button>
          <a href={`/update/${props.id}`} className="btn btn-warning btn-sm">
            Edit
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
