import Link from "next/link";
import React, { useEffect } from "react";
import PlaceCard from "./PlaceCard";

const PlacesToVisit = ({ trip }) => {
  useEffect(() => {
    console.log(trip?.tripData?.itinerary);
  }, [trip]);
  return (
    <div>
      <h2 className="font-bold text-4xl mb-8">Places to Visit 🗺️</h2>

      {trip?.tripData?.itinerary.map((day, index) => (
        <div key={index} className="mb-12">
          <h2 className="font-bold text-3xl my-8 text-center">
            {day.day} 👣
          </h2>
          <div className="grid grid-cols-2 gap-4 ">
            {day.plan.map((place, placeIndex) => (
              <div key={placeIndex} >
                 {/* TODO: Add time range in db */}
                {/* <h2 className="font-medium text-sm text-orange-600 mb-2">
                  {place.time_range}
                </h2> */}
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
