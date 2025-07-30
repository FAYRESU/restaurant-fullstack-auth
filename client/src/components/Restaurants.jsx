import React from "react";
import Card from "./Card";

const Restaurants = ({ restaurants }) => {
  console.log("restaurants =", restaurants); 

  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4">
        {Array.isArray(restaurants) &&
          restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              id={restaurant.id}
              title={restaurant.title}
              type={restaurant.type}
              imageUrl={restaurant.imageUrl}
            />
          ))}
      </div>
    </div>
  );
};

export default Restaurants;