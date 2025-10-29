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
import { ArrowRight, CalendarDays, HandPlatter, Users } from "lucide-react";

const TripCard = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!trip?.userSelection?.destination?.label) {
      return;
    }
    getPlacePhoto();
  }, [trip]);

  const getPlacePhoto = async () => {
    try {
      setIsLoading(true);
      const response = await getPlaceDetails({
        textQuery: trip?.userSelection?.destination?.label,
      });
      const photoName = response?.data?.places?.[0]?.photos?.[2]?.name;
      if (!photoName) {
        setIsLoading(false);
        return;
      }

      const photo_url = PHOTO_REF_URL.replace("NAME", photoName);
      setPhotoUrl(photo_url);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load trip photo", error);
      setIsLoading(false);
    }
  };
  return (
    <Card className="group flex h-full flex-col overflow-hidden border border-border/70 bg-background/80 shadow-lg backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="relative mb-2 h-44 overflow-hidden rounded-none p-0">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Loading preview…
            </span>
          </div>
        ) : (
          <img
            src={photoUrl || "/placeholder-image.jpg"}
            alt={trip?.userSelection?.destination?.label || "Trip preview"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent p-5">
          <CardTitle className="text-lg text-foreground">
            {trip?.userSelection?.destination?.label || "Unnamed escape"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {trip?.userSelection?.destination?.label}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-5 pt-2">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
            <CalendarDays className="size-3.5" />
            {trip?.userSelection?.days || "—"} days
          </span>
          <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground">
            <HandPlatter className="size-3.5" />
            {trip?.userSelection?.budget || "Budget"}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground">
            <Users className="size-3.5" />
            {trip?.userSelection?.travel_with || "Travelers"}
          </span>
        </div>

        <div className="mt-auto">
          <Button
            className="w-full"
            onClick={() => trip?.id && router.push(`/view-trip/${trip.id}`)}
            disabled={!trip?.id}
          >
            View itinerary
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground">
        Last generated: {trip?.tripData?.generatedOn || "Recently"}
      </CardFooter>
    </Card>
  );
};

export default TripCard;
