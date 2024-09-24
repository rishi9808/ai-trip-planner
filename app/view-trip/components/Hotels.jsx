import React, { useEffect } from "react";

import HotelCard from "./HotelCard";

const Hotels = ({ trip }) => {
  useEffect(() => {
    console.log(trip?.tripData?.hotelOptions);
  }, [trip]);
  return (
    <div>
      <h1 className="font-bold text-4xl my-5">Hotel Recommendations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <HotelCard hotel={hotel} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
