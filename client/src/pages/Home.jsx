import React, { useState, useEffect } from "react";
import Restaurants from "../components/Restaurants";
import RestaurantService from "../service/restaurant.sevice";
import Swal from "sweetalert2";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filetedRestaurants, SetFilterRestaurants] = useState([]);

  const handleSearch = (keyword) => {
    if (keyword === "") {
      SetFilterRestaurants(restaurants);
      return;
    }
    const result = restaurants.filter((restaurants) => {
      return (
        restaurants.title.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurants.type.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    SetFilterRestaurants(result);
  };

  useEffect(() => {
    const getAllRestaurants = async () => {
      try {
        const response = await RestaurantService.getAllRestaurants();
        if (response.status === 200) {
          setRestaurants(response.data);
          SetFilterRestaurants(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Restaurants",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    getAllRestaurants();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300">
      {/* Hero Header */}
      <div className="py-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm">
          🍽️ Grab Restaurant
        </h1>
        <p className="text-gray-600 mt-2">Find your favorite food and restaurants</p>
      </div>

      {/* Search Box */}
      <div className="flex justify-center mb-8">
        <label className="input input-bordered flex items-center gap-2 w-full max-w-lg shadow-md rounded-xl bg-white">
          <svg
            className="h-[1.2em] text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="keyword"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search restaurant or type..."
            className="grow outline-none"
          />
        </label>
      </div>

      {/* Restaurant List */}
      <div className="container mx-auto px-4 pb-12">
        {filetedRestaurants.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filetedRestaurants.map((restaurant, index) => (
              <div
                key={index}
                className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 rounded-xl"
              >
                <figure className="px-4 pt-4">
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.title}
                    className="rounded-xl h-40 w-full object-cover"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-lg font-semibold text-gray-800">
                    {restaurant.title}
                  </h2>
                  <p className="text-gray-500">{restaurant.type}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No restaurants found 🍔
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
