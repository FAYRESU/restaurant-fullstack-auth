import React from "react";
import Card from "./Card";
const Restaurants = ({ restaurants }) => {
  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4">
        {restaurants &&
          restaurants.map((restaurants) => {
            return (
              <Card
                key={restaurants.id}
                id={restaurants.id}
                title={restaurants.title}
                type={restaurants.type}
                img={restaurants.img}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Restaurants;