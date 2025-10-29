import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { getPlaceDetails } from "../../../service/GlobalApi";
import { PHOTO_REF_URL } from "../../../service/GlobalApi";
import { MapPin, Star } from "lucide-react";

const HotelCard = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState("/placeholder-image.jpg");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadPhoto = async () => {
      if (!hotel?.hotelName) {
        setIsLoading(false);
        return;
      }
      try {
        const result = await getPlaceDetails({ textQuery: hotel.hotelName });
        const photos = result?.data?.places?.[0]?.photos || [];
        if (!photos.length) {
          throw new Error("No hotel photos available");
        }
        const ref = photos[0]?.name;
        if (!ref) {
          throw new Error("Missing photo reference");
        }
        const candidate = PHOTO_REF_URL.replace("NAME", ref);
        if (!isMounted) return;
        setPhotoUrl(candidate);
        setLoadError(false);
      } catch (error) {
        console.warn("Hotel photo fallback", error);
        if (isMounted) {
          setPhotoUrl("/placeholder-image.jpg");
          setLoadError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPhoto();
    return () => {
      isMounted = false;
    };
  }, [hotel?.hotelName]);

  return (
    <Link
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${hotel?.hotelName || ""}, ${hotel?.hotelAddress || ""}`
      )}`}
      target="_blank"
      className="block h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden border border-border/70 bg-background/90 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <CardHeader className="relative h-44 overflow-hidden rounded-b-none p-0">
          {isLoading ? (
            <div className="flex h-full items-center justify-center bg-muted">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Loading…
              </span>
            </div>
          ) : (
            <img
              src={photoUrl}
              alt={hotel?.hotelName || "Hotel preview"}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.src = "/placeholder-image.jpg";
                event.currentTarget.onerror = null;
                setLoadError(true);
              }}
              loading="lazy"
            />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/40 to-transparent p-4">
            <CardTitle className="text-lg text-foreground">
              {hotel?.hotelName || "Hotel name"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 pt-5">
          <CardDescription className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 text-primary" />
            {hotel?.hotelAddress || "Address not available"}
          </CardDescription>
          <div className="flex flex-wrap gap-2 text-sm">
            {hotel?.price && (
              <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                {hotel.price}
              </span>
            )}
            {hotel?.rating && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground">
                <Star className="size-3.5 text-amber-500" />
                {hotel.rating}
              </span>
            )}
          </div>
          {loadError && (
            <p className="text-xs text-red-500">
              Image preview unavailable. Tap to open in Maps.
            </p>
          )}
        </CardContent>
        <CardFooter className="pt-0 text-sm font-medium text-primary">
          View in Google Maps →
        </CardFooter>
      </Card>
    </Link>
  );
};

export default HotelCard;
