import React, { useState } from "react";
import { useNavigate } from "react-router";
import RestaurantService from "../service/restaurant.sevice";
import Swal from "sweetalert2";

const Add = () => {
  const [restaurants, setRestaurant] = useState({
    title: "",
    type: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurants, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantService.insertRestaurant(restaurants);
      if (response.status === 200) {
        Swal.fire({
          title: "Add Restaurant",
          icon: "success",
          text: `Restaurant added successfully`,
        }).then(() => {
          navigate("/");
        });

        setRestaurant({
          title: "",
          type: "",
          imageUrl: "",
        });
      } else {
        Swal.fire({
          title: "Error adding restaurant",
          icon: "error",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error during add:", error);
      Swal.fire({
        title: "Error adding restaurant",
        icon: "error",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Add Item
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="text-base label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter title"
                className="w-full input input-bordered"
                name="title"
                onChange={handleChange}
                value={restaurants.title}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">Type</span>
              </label>
              <input
                type="text"
                placeholder="Enter type"
                className="w-full input input-bordered"
                name="type"
                onChange={handleChange}
                value={restaurants.type}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">Image URL</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                onChange={handleChange}
                placeholder="Restaurant Image URL"
                name="imageUrl"
                value={restaurants.imageUrl}
              />
              {restaurants.imageUrl && (
                <div className="flex items-center gap-2 mt-2">
                  <img
                    className="h-32"
                    src={restaurants.imageUrl}
                    alt="Restaurant Preview"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center items-center my-6 space-x-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white px-6"
              >
                Add
              </button>
              <button
                type="button"
                className="btn bg-red-500 text-white px-6"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
