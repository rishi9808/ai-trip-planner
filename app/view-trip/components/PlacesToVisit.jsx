import Link from "next/link";
import React, { useEffect } from "react";
import PlaceCard from "./PlaceCard";

const PlacesToVisit = ({ trip }) => {
  useEffect(() => {
    console.log(trip?.tripData?.itinerary);
  }, [trip]);
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
{/* [
    {
        "plan": [
            {
                "placeDetails": "A historic palace built in the 16th century, showcasing a fusion of Portuguese and Indian architectural styles.",
                "geoCoordinates": "9.9591° N, 76.2678° E",
                "placeName": "Mattancherry Palace",
                "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Mattancherry_Palace.jpg/1200px-Mattancherry_Palace.jpg",
                "timeToTravel": "10 minutes from Fort Kochi",
                "ticketPricing": "₹10 per person"
            },
            {
                "placeName": "Jewish Synagogue",
                "placeDetails": "A 16th-century synagogue, one of the oldest in the Commonwealth.",
                "ticketPricing": "₹5 per person",
                "timeToTravel": "5 minutes walk from Mattancherry Palace",
                "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Kochi_Synagogue.jpg/1200px-Kochi_Synagogue.jpg",
                "geoCoordinates": "9.9598° N, 76.2673° E"
            },
            {
                "geoCoordinates": "9.9558° N, 76.2654° E",
                "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Fort_Kochi%2C_Kerala.jpg/1200px-Fort_Kochi%2C_Kerala.jpg",
                "placeDetails": "A historic area with colonial architecture, including the Dutch Palace, St. Francis Church, and the Chinese Fishing Nets.",
                "timeToTravel": "5 minutes walk from Jewish Synagogue",
                "placeName": "Fort Kochi",
                "ticketPricing": "Free"
            },
            {
                "placeDetails": "Experience the traditional Kerala dance form of Kathakali, known for its elaborate costumes and expressive storytelling.",
                "geoCoordinates": "9.9558° N, 76.2654° E",
                "ticketPricing": "₹200-$500 per person",
                "timeToTravel": "Available at various venues in Fort Kochi",
                "placeName": "Kathakali Performance",
                "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Kathakali_performance_at_Kerala_Kathakali_Centre.jpg/1200px-Kathakali_performance_at_Kerala_Kathakali_Centre.jpg"
            }
        ],
        "day": "Day 1"
    },
    {
        "day": "Day 2",
        "plan": [
            {
                "geoCoordinates": "9.9758° N, 76.2935° E",
                "ticketPricing": "₹10 per person",
                "timeToTravel": "30 minutes from Fort Kochi",
                "placeName": "Bolgatty Palace",
                "placeDetails": "A historic palace located on Bolgatty Island, offering stunning views of the harbor and a glimpse into the colonial era.",
                "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bolgatty_Palace_Kochi.jpg/1200px-Bolgatty_Palace_Kochi.jpg"
            },
            {
                "placeDetails": "A scenic promenade along the waterfront, offering breathtaking views of the harbor and the city skyline.",
                "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Marine_Drive_Kochi.jpg/1200px-Marine_Drive_Kochi.jpg",
                "placeName": "Marine Drive",
                "timeToTravel": "15 minutes from Bolgatty Palace",
                "ticketPricing": "Free",
                "geoCoordinates": "9.9614° N, 76.2751° E"
            },
            {
                "geoCoordinates": "9.9811° N, 76.3010° E",
                "timeToTravel": "20 minutes from Marine Drive",
                "placeDetails": "A historic palace that showcases the royal heritage of the Cochin Kingdom, with artifacts, paintings, and sculptures.",
                "ticketPricing": "₹10 per person",
                "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Hill_Palace_Museum_Kochi.jpg/1200px-Hill_Palace_Museum_Kochi.jpg",
                "placeName": "Hill Palace Museum"
            },
            {
                "placeName": "Spice Market",
                "ticketPricing": "Free",
                "geoCoordinates": "9.9625° N, 76.2691° E",
                "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kochi_Spice_Market.jpg/1200px-Kochi_Spice_Market.jpg",
                "timeToTravel": "15 minutes from Hill Palace Museum",
                "placeDetails": "Explore the vibrant spice market, where you can find a wide variety of spices, herbs, and other local products."
            }
        ]
    }
]*/}
        {trip?.tripData?.itinerary.map((day, index) => (
            <div key={index} >
            <h2 className="font-bold text-xl mt-5">{day.day}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {day.plan.map((place, index) => (
                  <div className="my-3">
                    <h2 className="font-medium text-sm text-orange-600">{place.time_range}</h2>
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