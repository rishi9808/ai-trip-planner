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
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (place) {
      setIsLoading(true);
      setLoadError(false);
      getPlacePhoto();
    }
  }, [place]);

  const testImageLoad = (url) => {
    if (typeof window === "undefined") {
      return Promise.reject(new Error("Window object not available"));
    }
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load: ${url}`));
      img.src = url;
    });
  };

  const getPlacePhoto = async () => {
    try {
      const data = {
        textQuery: place?.placeName,
      };
      const result = await getPlaceDetails(data);

      const photos = result?.data?.places[0]?.photos;
      console.log("Photos from API:", photos);

      if (photos && photos.length > 0) {
        // Try multiple photos if available
        const photosToTry = Math.min(photos.length, 3);
        let loadedUrl = null;

        for (let i = 0; i < photosToTry; i++) {
          try {
            const photoRef = photos[i].name;
            const photo_url = PHOTO_REF_URL.replace("NAME", photoRef);
            console.log(`Trying photo ${i + 1}/${photosToTry}: ${photo_url}`);

            // Test if the image loads successfully
            await testImageLoad(photo_url);
            loadedUrl = photo_url;
            console.log(`Successfully loaded photo ${i + 1}`);
            break;
          } catch (photoError) {
            console.warn(`Photo ${i + 1} failed to load:`, photoError.message);
            // Continue to next photo
          }
        }

        if (loadedUrl) {
          setPhotoUrl(loadedUrl);
          setIsLoading(false);
        } else {
          throw new Error("No photos could be loaded");
        }
      } else {
        throw new Error("No photos available for this place");
      }
    } catch (error) {
      console.error("Error fetching place photos:", error);
      setPhotoUrl("/placeholder-image.jpg");
      setLoadError(true);
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-80">
      <CardHeader>
        <CardTitle>{place.placeName}</CardTitle>
        <CardDescription>{place.placeDetails}</CardDescription>
      </CardHeader>
      <div className="flex-col">
        <CardContent className="flex gap-5 ">
          <div>
            {isLoading ? (
              <div className="rounded-lg w-[300px] h-[10rem] bg-gray-200 flex items-center justify-center">
                Loading image...
              </div>
            ) : (
              <img
                src={photoUrl}
                alt={`Image of ${place.placeName}`}
                className="rounded-lg w-[300px] h-[10rem] object-cover"
                onError={(e) => {
                  console.error("Image failed to load:", e);
                  e.target.src = "/placeholder-image.jpg";
                  e.target.onerror = null;
                  setLoadError(true);
                }}
              />
            )}
            {loadError && (
              <div className="text-xs text-red-400 mt-1 text-center">
                Could not load image for this place
              </div>
            )}
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
