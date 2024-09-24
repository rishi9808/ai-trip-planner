import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const PlaceCard = ({ place }) => {
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
              src="/banner.jpg"
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

            <Button
              href={`https://www.google.com/maps/search/?api=1&query=${place.placeName},${place.geoCoordinates}`}
              target="_blank"
            >
              View on Map
            </Button>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </div>
    </Card>
  );
};

export default PlaceCard;
