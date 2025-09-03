import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import RestaurantService from "../service/restaurant.sevice";
import Swal from "sweetalert2";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurants, setRestaurant] = useState({
    title: "",
    type: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await RestaurantService.getRestaurantById(id);
        if (response.status === 200) {
          setRestaurant(response.data);
        } else {
          Swal.fire({
            title: "Restaurant Not Found",
            icon: "error",
            text: `No restaurant found with ID: ${id}`,
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error fetching restaurant",
          icon: "error",
          text: error.message,
        });
      }
    };
    fetchRestaurant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurants, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantService.editRestaurantById(
        id,
        restaurants
      );
      if (response.status === 200) {
        setRestaurant(response.data);
        Swal.fire({
          title: "Restaurant Updated",
          icon: "success",
          text: "Successfully updated restaurant.",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error updating restaurant",
        icon: "error",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ✏️ Update Restaurant
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={restaurants.title}
              onChange={handleChange}
              placeholder="Enter restaurant title"
              className="w-full input input-bordered focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Type */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Type</span>
            </label>
            <input
              type="text"
              name="type"
              value={restaurants.type}
              onChange={handleChange}
              placeholder="Enter restaurant type"
              className="w-full input input-bordered focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Image URL</span>
            </label>
            <input
              type="text"
              name="imageUrl"
              value={restaurants.imageUrl}
              onChange={handleChange}
              placeholder="Restaurant image URL"
              className="w-full input input-bordered focus:ring-2 focus:ring-green-400"
            />
            {restaurants.imageUrl && (
              <div className="flex justify-center mt-4">
                <img
                  src={restaurants.imageUrl}
                  alt="Preview"
                  className="h-40 rounded-lg shadow-md object-cover"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="btn bg-green-500 text-white w-32 hover:bg-green-600 shadow-md"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn bg-red-500 text-white w-32 hover:bg-red-600 shadow-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
