import React from "react";
import Card from "./Card";
import { useAuthContext } from "../context/AuthContext";
const Restaurants = ({ restaurants }) => {
  const { user } = useAuthContext();
  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4">
        {restaurants &&
          Array.isArray(restaurants) &&
          user &&
          restaurants.map((restaurants) => {
            return (
              <Card
                key={restaurants.id}
                id={restaurants.id}
                title={restaurants.title}
                type={restaurants.type}
                imageUrl={restaurants.imageUrl}
              />
            );
          })}
        {!user && <div>You don't have permission to access this content.</div>}
        {!restaurants && <div>No content.</div>}
      </div>
    </div>
  );
};

export default Restaurants;
