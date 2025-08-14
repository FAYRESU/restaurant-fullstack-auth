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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurants, [name]: value });
  };
  const newRestaurant = {
    title: restaurants.title,
    type: restaurants.type,
    imageUrl: restaurants.imageUrl,
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRestaurant),
      });
      if (response.ok) {
        alert("Restaurannt Adds succesfully!!!");
        setRestaurant({
          title: "",
          type: "",
          imageUrl: "",
        });
        navigate("/");
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error adding restaurant",
          icon: "error",
          text: errorData.message || "Something went wrong!",
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
      <div class="relative flex flex-col justify-center h-screen overflow-hidden">
        <div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 class="text-2xl font-semibold text-center text-gray-700 mb-6">
            Add Item
          </h1>
          <form class="space-y-4">
            <div>
              <label class="label">
                <span class="text-base label-text">Title</span>
              </label>

              <input
                type="text"
                placeholder="Enter title"
                class="w-full input input-bordered"
                name="title"
                onChange={handleChange}
                value={restaurants.title}
              />
            </div>

            <div>
              <label class="label">
                <span class="text-base label-text">Type</span>
              </label>
              <input
                type="text"
                placeholder="Enter type"
                class="w-full input input-bordered"
                name="type"
                onChange={handleChange}
                value={restaurants.type}
              />
            </div>

            <div>
              <label class="label">
                <span class="text-base label-text">Image URL</span>
              </label>
              <input
                type="text"
                className="grow"
                class="w-full input input-bordered"
                onChange={handleChange}
                placeholder="Restaurant Img"
                name="img"
                value={restaurants.imageUrl}
              />

              {restaurants.imageUrl && (
                <div className="flex items-center gap-2">
                  <img className="h-32" src={restaurants.imageUrl}></img>
                </div>
              )}
            </div>

            <div class="flex justify-center items-center my-6 space-x-4">
              <a
                href={"/"}
                type="submit"
                class="btn bg-green-500 text-white px-6"
                onClick={handleSubmit}
              >
                Add
              </a>
              <a
                href={"/"}
                button
                type="button"
                class="btn bg-red-500 text-white px-6"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
