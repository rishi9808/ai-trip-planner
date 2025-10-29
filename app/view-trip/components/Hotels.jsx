import React from "react";

import HotelCard from "./HotelCard";

const Hotels = ({ trip }) => {
  const hotels = trip?.tripData?.hotel_options || [];

  if (!hotels.length) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Stay in style
          </h2>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Handpicked stays aligned with your preferences. Tap any card to view
            it on Google Maps.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {hotels.map((hotel) => (
          <HotelCard
            key={`${hotel.hotelName}-${hotel.hotelAddress}`}
            hotel={hotel}
          />
        ))}
      </div>
    </section>
  );
};

export default Hotels;
