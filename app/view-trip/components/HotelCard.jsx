import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPlaceDetails } from "../../../service/GlobalApi";
import { PHOTO_REF_URL } from "../../../service/GlobalApi";

const HotelCard = ({ hotel, index }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    hotel && getPlacePhoto();
  }, [hotel]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };
    const result = await getPlaceDetails(data).then((res) => {
      console.log(res.data.places[0].photos[2].name);

      const photo_url = PHOTO_REF_URL.replace(
        "NAME",
        res.data.places[0].photos[2].name
      );
      setPhotoUrl(photo_url);
    });
  };

  return (
    <div>
      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`}
        target="_blank"
      >
        <Card key={index} className="h-[24rem]  w-full">
          <CardHeader>
            <div>
              <img
                src={photoUrl}
                alt=""
                className="rounded-lg object-cover h-[180px] w-full"
              />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle>{hotel.hotelName}</CardTitle>
            <CardDescription className="my-1">
              {hotel.hotelAddress}
            </CardDescription>
            <div className="flex flex-col justify-center">
              <CardDescription className="my-2 font-bold">
                💵 {hotel.price}
              </CardDescription>
              <CardDescription className="mb-2 text-sm">
                ⭐ {hotel.rating}
              </CardDescription>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default HotelCard;
