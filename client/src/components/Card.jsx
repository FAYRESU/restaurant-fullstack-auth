import React from "react";
// Import the restaurantService to handle API calls
import restaurantService from "../service/restaurant.sevice";

const Card = (props) => {
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this restaurant?");
    if (!isConfirmed) return;

    try {
      // Use the deleteRestaurant function from your service
      await restaurantService.deleteRestaurant(id);
      
      alert("Restaurant deleted successfully!");
      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.log(error);
      // You should handle errors more gracefully here
      alert("Failed to delete the restaurant.");
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        {/* Change props.imageUrl to props.img to match the prop name */}
        <img src={props.img} alt="Restaurant" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {props.title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{props.type}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleDelete(props.id)}
            className="btn btn-soft btn-error"
          >
            Delete
          </button>
          <a href={"/update/" + props.id} className="btn btn-soft btn-warning">
            Edit
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;