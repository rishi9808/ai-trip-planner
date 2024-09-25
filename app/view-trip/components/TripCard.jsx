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
import Link from "next/link";

const TripCard = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.destination?.label,
    };
    const result = await getPlaceDetails(data).then((res) => {
      console.log(res?.data?.places[0]?.photos[3]?.name);

      const photo_url = PHOTO_REF_URL.replace(
        "NAME",
        res.data.places[0].photos[2].name
      );
      setPhotoUrl(photo_url);
    });
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

    <Card  className="shadow-md hover:scale-105 transition-all">
        <CardHeader >
                <img
                src={photoUrl}
                alt=""
                className="rounded-lg w-full h-[10rem] object-cover"
                />  
        </CardHeader>
        <div >
          <CardContent className="flex flex-col gap-5 ">
            <div>
              <CardTitle>{trip?.userSelection?.destination?.label}</CardTitle>
              <CardDescription>{trip?.userSelection?.destination?.label}</CardDescription>
            </div>
            <Button>View Trip</Button>
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
          <CardFooter>
            
          </CardFooter>
        </div>
      </Card>
  );
}

export default TripCard;