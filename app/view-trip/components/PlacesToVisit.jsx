import React from "react";

import PlaceCard from "./PlaceCard";

const PlacesToVisit = ({ trip }) => {
  const itinerary = trip?.tripData?.itinerary || [];

  if (!itinerary.length) {
    return null;
  }

  return (
    <section className="space-y-14">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Daily adventures
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Explore curated experiences day by day. Adjust on the fly to suit your
          energy and interests.
        </p>
      </div>

      {itinerary.map((dayPlan, index) => (
        <div key={`${dayPlan.day}-${index}`} className="space-y-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              Day {index + 1}
            </span>
            <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
              {dayPlan.day}
            </h3>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {dayPlan.plan?.map((place, placeIndex) => (
              <PlaceCard
                key={`${place.placeName}-${placeIndex}`}
                place={place}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default PlacesToVisit;
