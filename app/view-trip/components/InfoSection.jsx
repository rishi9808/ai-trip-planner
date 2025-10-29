import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { getPlaceDetails } from "../../../service/GlobalApi";
import { PHOTO_REF_URL } from "../../../service/GlobalApi";
import { Clock, Compass, PiggyBank, Share2, Users } from "lucide-react";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("/placeholder-image.jpg");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (trip) {
      fetchHeroPhoto();
    }
  }, [trip]);

  const fetchHeroPhoto = async () => {
    if (!trip?.userSelection?.destination?.label) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const result = await getPlaceDetails({
        textQuery: trip.userSelection.destination.label,
      });
      const photos = result?.data?.places?.[0]?.photos || [];

      for (let i = 0; i < Math.min(photos.length, 3); i++) {
        try {
          const photoRef = photos[i].name;
          const candidateUrl = PHOTO_REF_URL.replace("NAME", photoRef);
          await testImage(candidateUrl);
          setPhotoUrl(candidateUrl);
          setLoadError(false);
          setIsLoading(false);
          return;
        } catch (err) {
          console.warn("Hero photo failed, trying next", err);
        }
      }

      throw new Error("No suitable destination photos");
    } catch (error) {
      console.error("Failed to load destination photo", error);
      setPhotoUrl("/placeholder-image.jpg");
      setLoadError(true);
      setIsLoading(false);
    }
  };

  const testImage = (url) =>
    new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("Window not available"));
      }
      const img = new window.Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

  const destinationLabel = trip?.userSelection?.destination?.label;

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-muted/40 shadow-xl">
        {isLoading ? (
          <div className="flex h-80 items-center justify-center bg-muted">
            <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Loading destination...
            </span>
          </div>
        ) : (
          <img
            src={photoUrl}
            alt={destinationLabel || "Destination preview"}
            className="h-80 w-full object-cover"
            onError={(event) => {
              event.currentTarget.src = "/placeholder-image.jpg";
              event.currentTarget.onerror = null;
              setLoadError(true);
            }}
            loading="lazy"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex flex-col gap-2 text-blue-800">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-blue-900">
              <Compass className="size-3.5" /> Curated getaway
            </span>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {destinationLabel || "Your next adventure"}
            </h2>
          </div>
        </div>
      </div>

      {loadError && (
        <p className="text-center text-sm text-red-500">
          Could not load imagery for this destination. Showing a placeholder
          instead.
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div>
            <h3 className="text-2xl font-semibold text-foreground">
              Plan overview
            </h3>
            <p className="mt-2 text-base text-muted-foreground">
              {trip?.tripData?.summary ||
                "Let this itinerary guide you through must-see landmarks, hidden neighborhoods, and unforgettable flavors tailored to your travel style."}
            </p>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-2xl bg-muted px-3 py-2 font-medium text-muted-foreground">
              <Clock className="size-4 text-primary" />
              {trip?.userSelection?.days || "—"} days
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-muted px-3 py-2 font-medium text-muted-foreground">
              <PiggyBank className="size-4 text-primary" />
              {trip?.userSelection?.budget || "—"}
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-muted px-3 py-2 font-medium text-muted-foreground">
              <Users className="size-4 text-primary" />
              {trip?.userSelection?.travel_with || "—"}
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5 text-sm text-primary">
            Personalize freely—adjust daily pace, swap experiences, or
            regenerate ideas. We'll preserve every version so you can pick the
            perfect flow.
          </div>

          <p className="text-sm text-muted-foreground">
            Generated with real-time weather, seasonality insights, and local
            favorites to keep your itinerary vibrant and balanced.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-background/80 p-6 shadow-sm backdrop-blur">
          <h4 className="text-lg font-semibold text-foreground">
            Share your itinerary
          </h4>
          <p className="text-sm text-muted-foreground">
            Send a link to friends, invite collaborators, or download a copy for
            offline adventures.
          </p>
          <Button variant="outline" className="w-full sm:w-auto">
            <Share2 className="mr-2 size-4" /> Share trip
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
