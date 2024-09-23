"use client";

import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { Button } from "@/components/ui/button";

const createTrip = () => {
  const [destination, setDestination] = useState(null);
  const [formData, setFormData] = useState([]);

  const handleFormChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenerateTrip = () => {
    if (formData?.days > 5) {
      return;
    }
    console.log(formData);
  };

  return (
    <div
      className="sm:px-10 md:px-32 lg:px-56 xl:px-10
    mt-10"
    >
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="text-muted-foreground my-5 text-lg">
        Just provide some basic information about your trip and we will generate
        a personalized itinerary for you.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl font-medium my-3">
            What is your destination of your choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
            selectProps={{
              destination,
              onChange: (destination) => {
                setDestination(destination);
                handleFormChange("destination", destination);
              },
              placeholder: "Search for a destination",
            }}
          />
        </div>
        <div>
          <h2 className="text-xl font-medium mt-10 mb-3">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Enter number of days"
            type="number"
            onChange={(e) => handleFormChange("days", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-medium mt-10 mb-3">
          What is your budget for the trip?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((option) => (
            <div
              key={option.id}
              className={`cursor-pointer border p-4 mb-5 rounded-lg hover:shadow-lg shadow-sm
                ${
                  formData.budget === option.title
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              onClick={() => handleFormChange("budget", option.title)}
            >
              <h2 className="">{option.icon}</h2>
              <h2 className=" font-bold text-lg">{option.title}</h2>
              <h2 className=" font-normal text-base text-muted-foreground">
                {option.desc}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-medium mt-10 mb-3">
          Who do you plan to travel with?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((option) => (
            <div
              key={option.id}
              className={`cursor-pointer border p-4 mb-5 rounded-lg hover:shadow-lg shadow-sm
                ${
                  formData.travel_with === option.title
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              onClick={() => handleFormChange("travel_with", option.title)}
            >
              <h2 className="">{option.icon}</h2>
              <h2 className=" font-bold text-lg">{option.title}</h2>
              <h2 className=" font-normal text-base text-muted-foreground">
                {option.desc}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end ">
        <Button
          className="px-4 py-3 mb-10 mt-5 "
          size="large"
          onClick={handleGenerateTrip}
        >
          Generate Trip
        </Button>
      </div>
    </div>
  );
};

export default createTrip;
