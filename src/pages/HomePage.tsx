import { useState } from "react";

export const HomePage = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);

  if (restaurants.length === 0) return <></>;

  return (
    <ul>
      {restaurants.map((restaurant) => {
        return <li key={restaurant.id}>{restaurant.name}</li>;
      })}
    </ul>
  );
};
