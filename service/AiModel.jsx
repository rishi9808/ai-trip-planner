const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a Hotels option list with HotelName , Hotel address, Proce , hotel image url, geo coordinates,rating,descriptions and suggest itinerary with placeName , PlaceDetails, Place Image Url ,Geo Coordinates, ticket Pricing, Time to travel to each of the location for 3 days with each day plan with best time to visit in JSON format\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotelOptions": [\n    {\n      "hotelName": "The D Las Vegas",\n      "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$50 - $100 per night",\n      "hotelImageUrl": "https://www.theDcasino.com/media/images/hotel/the-d-hotel-exterior.jpg",\n      "geoCoordinates": "36.1699° N, 115.1423° W",\n      "rating": "3.5 stars",\n      "description": "Located in the heart of Fremont Street, The D offers affordable rooms, a casino, and a variety of dining options."\n    },\n    {\n      "hotelName": "Golden Nugget Las Vegas",\n      "hotelAddress": "129 E Fremont Street, Las Vegas, NV 89101",\n      "price": "$70 - $150 per night",\n      "hotelImageUrl": "https://www.goldennugget.com/las-vegas/media/images/hotel/exterior-wide-shot.jpg",\n      "geoCoordinates": "36.1696° N, 115.1419° W",\n      "rating": "4 stars",\n      "description": "Known for its impressive aquarium and lively atmosphere, Golden Nugget offers a range of rooms and amenities at a reasonable price."\n    },\n    {\n      "hotelName": "Plaza Hotel & Casino",\n      "hotelAddress": "1 Main Street, Las Vegas, NV 89101",\n      "price": "$60 - $120 per night",\n      "hotelImageUrl": "https://www.plazahotelcasino.com/media/images/hotel/plaza-hotel-casino-exterior.jpg",\n      "geoCoordinates": "36.1697° N, 115.1422° W",\n      "rating": "3.5 stars",\n      "description": "Located on Fremont Street, Plaza offers a comfortable stay with a classic Vegas vibe and a range of dining options."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "morning": {\n        "placeName": "Fremont Street Experience",\n        "placeDetails": "Experience the vibrant atmosphere of Fremont Street with its iconic canopy, street performers, and free concerts.",\n        "placeImageUrl": "https://www.fremontstreetexperience.com/media/images/fremont-street-experience-canopy.jpg",\n        "geoCoordinates": "36.1699° N, 115.1423° W",\n        "ticketPricing": "Free",\n        "timeToTravel": "Walkable from most hotels on Fremont Street"\n      },\n      "afternoon": {\n        "placeName": "Neon Museum",\n        "placeDetails": "Explore the history of Las Vegas through a collection of iconic neon signs.",\n        "placeImageUrl": "https://www.neonmuseum.org/media/images/neon-museum-exterior.jpg",\n        "geoCoordinates": "36.1725° N, 115.1394° W",\n        "ticketPricing": "$20 - $30 per person",\n        "timeToTravel": "15-20 minutes by car or 30-40 minutes by bus"\n      },\n      "evening": {\n        "placeName": "Free Show at a Casino",\n        "placeDetails": "Enjoy a free show at a casino like the Bellagio Fountains or the Wynn\'s Lake of Dreams.",\n        "placeImageUrl": "https://www.bellagio.com/media/images/bellagio-fountains.jpg",\n        "geoCoordinates": "36.1117° N, 115.1722° W",\n        "ticketPricing": "Free",\n        "timeToTravel": "Varies depending on hotel location"\n      }\n    },\n    "day2": {\n      "morning": {\n        "placeName": "Hoover Dam",\n        "placeDetails": "Take a day trip to the impressive Hoover Dam and learn about its history and engineering.",\n        "placeImageUrl": "https://www.nps.gov/hove/planyourvisit/images/hooverdam-panorama-1.jpg",\n        "geoCoordinates": "36.0260° N, 114.9305° W",\n        "ticketPricing": "$30 - $40 per person",\n        "timeToTravel": "1 hour drive from Las Vegas"\n      },\n      "afternoon": {\n        "placeName": "Red Rock Canyon National Conservation Area",\n        "placeDetails": "Hike or drive through stunning red rock formations and enjoy scenic views.",\n        "placeImageUrl": "https://www.blm.gov/media/images/red-rock-canyon-national-conservation-area.jpg",\n        "geoCoordinates": "36.1187° N, 115.2166° W",\n        "ticketPricing": "$15 per vehicle",\n        "timeToTravel": "30-40 minutes drive from Las Vegas"\n      },\n      "evening": {\n        "placeName": "Fremont Street Experience",\n        "placeDetails": "Enjoy the vibrant atmosphere of Fremont Street in the evening, with its lights, music, and street performers.",\n        "placeImageUrl": "https://www.fremontstreetexperience.com/media/images/fremont-street-experience-canopy.jpg",\n        "geoCoordinates": "36.1699° N, 115.1423° W",\n        "ticketPricing": "Free",\n        "timeToTravel": "Walkable from most hotels on Fremont Street"\n      }\n    },\n    "day3": {\n      "morning": {\n        "placeName": "Stratosphere Tower",\n        "placeDetails": "Ride the thrilling rides at the top of the Stratosphere Tower and enjoy panoramic views of Las Vegas.",\n        "placeImageUrl": "https://www.stratospherehotel.com/media/images/stratosphere-tower.jpg",\n        "geoCoordinates": "36.1702° N, 115.1387° W",\n        "ticketPricing": "$20 - $30 per person",\n        "timeToTravel": "Walkable from most hotels on the Strip"\n      },\n      "afternoon": {\n        "placeName": "Las Vegas Strip",\n        "placeDetails": "Explore the famous Las Vegas Strip, walk through casinos, and enjoy the sights and sounds of the city.",\n        "placeImageUrl": "https://www.visitlasvegas.com/media/images/las-vegas-strip.jpg",\n        "geoCoordinates": "36.1116° N, 115.1732° W",\n        "ticketPricing": "Free",\n        "timeToTravel": "Walkable from most hotels on the Strip"\n      },\n      "evening": {\n        "placeName": "Free Show at a Casino",\n        "placeDetails": "Enjoy a free show at a casino like the Bellagio Fountains or the Wynn\'s Lake of Dreams.",\n        "placeImageUrl": "https://www.bellagio.com/media/images/bellagio-fountains.jpg",\n        "geoCoordinates": "36.1117° N, 115.1722° W",\n        "ticketPricing": "Free",\n        "timeToTravel": "Varies depending on hotel location"\n      }\n    }\n  }\n}\n```\n\n**Notes:**\n\n* This itinerary is just a suggestion and can be customized based on your interests and preferences.\n* Prices are approximate and may vary depending on the season and availability.\n* Consider using public transportation or ride-sharing services to get around Las Vegas, which can save you money on parking and gas.\n* Look for deals and discounts on attractions, shows, and food to maximize your budget.\n* This itinerary assumes a cheap budget, so be prepared to compromise on some luxuries or amenities. \n* Don\'t forget to pack comfortably for the desert climate and wear comfortable shoes for walking.\n* Enjoy your trip!',
        },
      ],
    },
  ],
});

