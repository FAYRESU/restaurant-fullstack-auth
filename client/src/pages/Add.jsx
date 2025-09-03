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
          title: "เพิ่มร้านอาหารสำเร็จ",
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
          title: "เกิดข้อผิดพลาด",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-lg shadow-2xl glass rounded-2xl border border-gray-200">
        <div className="card-body space-y-6">
          <h1 className="text-3xl font-extrabold text-center text-indigo-600 drop-shadow">
            ➕ Add Restaurant
          </h1>
          <p className="text-center text-gray-600 text-sm">
            กรอกข้อมูลร้านอาหารเพื่อเพิ่มเข้าระบบ
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-control">
              <label className="label font-medium text-gray-700">Title</label>
              <input
                type="text"
                placeholder="Enter restaurant title"
                className="input input-bordered input-primary rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
                name="title"
                onChange={handleChange}
                value={restaurants.title}
              />
            </div>

            {/* Type */}
            <div className="form-control">
              <label className="label font-medium text-gray-700">Type</label>
              <input
                type="text"
                placeholder="Enter restaurant type"
                className="input input-bordered input-primary rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
                name="type"
                onChange={handleChange}
                value={restaurants.type}
              />
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                className="input input-bordered input-primary rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
                onChange={handleChange}
                placeholder="Restaurant Image URL"
                name="imageUrl"
                value={restaurants.imageUrl}
              />
              {restaurants.imageUrl && (
                <div className="flex justify-center mt-3">
                  <img
                    className="h-40 w-auto rounded-lg shadow-md border border-gray-200"
                    src={restaurants.imageUrl}
                    alt="Restaurant Preview"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center mt-6 gap-4">
              <button
                type="submit"
                className="btn btn-primary w-32 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 text-white"
              >
                ✅ Add
              </button>
              <button
                type="button"
                className="btn btn-error btn-outline w-32 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
                onClick={() => navigate("/")}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
