export const SelectTravelesList = [
  {
    id: 1,
    title: "Solo",
    desc: "A solo traveles in exploration",
    icon: "👤",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Two travels in tandem",
    icon: "👫",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A family of traveles",
    icon: "👨‍👩‍👧‍👦",
    people: "4 People",
  },
  {
    id: 4,
    title: "Group",
    desc: "A group of traveles",
    icon: "👨‍👩‍👧‍👦",
    people: "5+ People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💰",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Balanced cost and quality",
    icon: "💸",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Indulge in luxury",
    icon: "💎",
  },
];

export const AI_PROMPT =
  "Generate a Travel Plan for Location: {destination}, for {days} Days for {travel_with} with a {budget} budget. Give me a Hotels option list with HotelName , Hotel address, Proce , hotel image url, geo coordinates,rating,descriptions and suggest itinerary with placeName , PlaceDetails, Place Image Url ,Geo Coordinates, ticket Pricing, Time to travel to each of the location for {days} days with each day plan with best time to visit in JSON format";
