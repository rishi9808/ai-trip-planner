"use client";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useEffect, useState } from "react";
import { getPlaceDetails } from "../../../service/GlobalApi";
import { PHOTO_REF_URL } from "../../../service/GlobalApi";
import { useRouter } from "next/navigation";

const TripCard = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!trip?.userSelection?.destination?.label) {
      return;
    }
    getPlacePhoto();
  }, [trip]);

  const getPlacePhoto = async () => {
    try {
      const response = await getPlaceDetails({
        textQuery: trip?.userSelection?.destination?.label,
      });
      const photoName = response?.data?.places?.[0]?.photos?.[2]?.name;
      if (!photoName) {
        return;
      }

      const photo_url = PHOTO_REF_URL.replace("NAME", photoName);
      setPhotoUrl(photo_url);
    } catch (error) {
      console.error("Failed to load trip photo", error);
    }
  };
  return (
    // <li key={index}>
    //   <div className="border">
    //       <img src={photoUrl} alt="trip" />
    //     <h2>{trip?.userSelection?.destination?.label}</h2>
    //     <div className="flex gap-3">
    //       <p className="bg-gray-300 px-2 rounded-full">{trip?.userSelection?.travel_with}</p>
    //       <p className="bg-gray-300 px-2 rounded-full">{trip?.userSelection?.days} Days</p>
    //       <p className="bg-gray-300 px-2 rounded-full">{trip?.userSelection?.budget} Budget</p>
    //     </div>
    //   </div>
    // </li>

    <Card className="shadow-md hover:scale-105 transition-all">
      <CardHeader>
        <img
          src={photoUrl}
          alt=""
          className="rounded-lg w-full h-[10rem] object-cover"
        />
      </CardHeader>
      <div>
        <CardContent className="flex flex-col gap-5 ">
          <div>
            <CardTitle>{trip?.userSelection?.destination?.label}</CardTitle>
            <CardDescription>
              {trip?.userSelection?.destination?.label}
            </CardDescription>
          </div>
          <Button
            onClick={() => trip?.id && router.push(`/view-trip/${trip.id}`)}
            disabled={!trip?.id}
          >
            View Trip
          </Button>
          <div className="flex items-center gap-3">
            <CardDescription className="text-xs bg-gray-300 p-2 rounded-full">
              🚘 {trip?.userSelection?.days} Days
            </CardDescription>
            <CardDescription className="text-xs bg-gray-300 p-2 rounded-full">
              💰{trip?.userSelection?.budget} Budget
            </CardDescription>
            <CardDescription className="text-xs bg-gray-300 p-2 rounded-full">
              💰{trip?.userSelection?.travel_with} Travel
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </div>
    </Card>
  );
};

export default TripCard;
