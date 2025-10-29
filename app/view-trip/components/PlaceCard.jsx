import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "../../../components/ui/button";
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
import { Clock, MapPin, Ticket } from "lucide-react";

const PlaceCard = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState("/placeholder-image.jpg");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadPhoto = async () => {
      if (!place?.placeName) {
        setIsLoading(false);
        return;
      }
      try {
        const result = await getPlaceDetails({ textQuery: place.placeName });
        const photos = result?.data?.places?.[0]?.photos || [];
        for (let i = 0; i < Math.min(photos.length, 3); i++) {
          const ref = photos[i]?.name;
          if (!ref) continue;
          const candidate = PHOTO_REF_URL.replace("NAME", ref);
          if (!isMounted) return;
          setPhotoUrl(candidate);
          setLoadError(false);
          break;
        }
      } catch (error) {
        console.warn("Place photo fallback", error);
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
  }, [place?.placeName]);

  return (
    <Card className="flex h-full flex-col overflow-hidden border border-border/70 bg-background/80 shadow-lg backdrop-blur">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-xl text-foreground">
              {place?.placeName || "Experience"}
            </CardTitle>
            <CardDescription>{place?.placeDetails}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5">
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
          {isLoading ? (
            <div className="flex h-44 items-center justify-center bg-muted">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Loading…
              </span>
            </div>
          ) : (
            <img
              src={photoUrl}
              alt={`Preview of ${place?.placeName || "location"}`}
              className="h-44 w-full object-cover"
              onError={(event) => {
                event.currentTarget.src = "/placeholder-image.jpg";
                event.currentTarget.onerror = null;
                setLoadError(true);
              }}
              loading="lazy"
            />
          )}
        </div>
        {loadError && (
          <p className="text-xs text-red-500">
            Image preview unavailable. Tap map to explore more visuals.
          </p>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          {place?.timeToTravel && (
            <span className="inline-flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm font-medium text-muted-foreground">
              <Clock className="size-4 text-primary" />
              {place.timeToTravel}
            </span>
          )}
          {place?.ticketPricing && (
            <span className="inline-flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm font-medium text-muted-foreground">
              <Ticket className="size-4 text-primary" />
              {place.ticketPricing}
            </span>
          )}
        </div>

        <Button asChild variant="outline" className="w-full">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${place?.placeName || ""}, ${place?.geoCoordinates || ""}`
            )}`}
            target="_blank"
          >
            <MapPin className="mr-2 size-4" />
            View on Maps
          </Link>
        </Button>
      </CardContent>
      <CardFooter className="hidden" />
    </Card>
  );
};

export default PlaceCard;
