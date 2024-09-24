import Link from "next/link";
import React, { useEffect } from "react";
import PlaceCard from "./PlaceCard";

const PlacesToVisit = ({ trip }) => {
  useEffect(() => {
    console.log(trip?.tripData?.itinerary);
  }, [trip]);
  return (
    <div>
      <h2 className="font-bold text-4xl">Places to Visit 🗺️</h2>

      {trip?.tripData?.itinerary.map((day, index) => (
        <div key={index}>
          <h2 className="font-bold text-3xl my-10 text-center">
            {" "}
            {day.day} 👣{" "}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {day.plan.map((place, index) => (
              <div className="my-3">
                <h2 className="font-medium text-sm text-orange-600">
                  {place.time_range}
                </h2>
                <PlaceCard place={place} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlacesToVisit;
