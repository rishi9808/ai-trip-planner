import Link from "next/link";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const Hotels = ({ trip }) => {
  useEffect(() => {
    console.log(trip?.tripData?.hotelOptions);
  }, [trip]);
  return (
    <div>
      <h1 className="font-bold text-4xl my-5">Hotel Recommendations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`}
            target="_blank"
          >
            <Card key={index} className="size-full flex flex-col items-center ">
              <CardHeader className="h-[120px]">
                <CardTitle>{hotel.hotelName}</CardTitle>
                <CardDescription>{hotel.hotelAddress}</CardDescription>
              </CardHeader>
              <CardContent className="">
                <div>
                  <img
                    src="/banner.jpg"
                    alt=""
                    className="rounded-lg  object-cover"
                  />
                </div>
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
        ))}
      </div>
    </div>
  );
};

export default Hotels;
