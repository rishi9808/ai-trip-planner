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

const PlaceCard = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    place && getPlacePhoto();
  }, [place]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
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
    <Card className="w-[400px] h-full">
      <CardHeader>
        <CardTitle>{place.placeName}</CardTitle>
        <CardDescription>{place.placeDetails}</CardDescription>
      </CardHeader>
      <div className="flex-col">
        <CardContent className="flex gap-5 ">
          <div>
            <img
              src={photoUrl}
              alt=""
              className="rounded-lg w-[300px] h-[10rem] object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <CardDescription className="my-2">
              🚘 {place.timeToTravel}
            </CardDescription>
            <CardDescription className="mb-2 text-sm">
              💰{place.ticketPricing}
            </CardDescription>

            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${place.placeName},${place.geoCoordinates}`}
              target="_blank"
            >
              <Button>View on Map</Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </div>
    </Card>
  );
};

export default PlaceCard;
