import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import RestaurantService from "../service/restaurant.sevice";
import Swal from "sweetalert2";

const Update = () => {
  const { id } = useParams();

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
    e.preventDefault(); // prevent form from reloading the page
    try {
      const response = await RestaurantService.editRestaurantById(
        id,
        restaurants
      );
      if (response.status === 200) {
        setRestaurant(response.data);
        Swal.fire({
          title: "Restaurant Update Success",
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
    <div className="container mx-auto">
      <div class="relative flex flex-col justify-center h-screen overflow-hidden">
        <div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 class="text-2xl font-semibold text-center text-gray-700 mb-6">
            Update Item
          </h1>
          <form class="space-y-4">
            <div>
              <label class="label">
                <span class="text-base label-text">Title</span>
              </label>

              <input
                type="text"
                name="title"
                value={restaurants.title}
                placeholder="Enter title"
                class="w-full input input-bordered"
                onChange={handleChange}
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
                value={restaurants.type}
                onChange={handleChange}
              />
            </div>

            <div>
              <label class="label">
                <span class="text-base label-text">Image URL</span>
              </label>
              <input
                type="text"
                ClassName="grow"
                class="w-full input input-bordered"
                onChange={handleChange}
                placeholder="Restaurant Img"
                value={restaurants.imageUrl}
                name="img"
              />

              {restaurants.imageUrl && (
                <div ClassName="flex items-center gap-2">
                  <img ClassName="h-32" src={restaurants.imageUrl}></img>
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
                Update
              </a>
              <a
                href={"/"}
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

export default Update;
