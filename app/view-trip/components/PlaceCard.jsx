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
import Image from "next/image";

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
        let loaded = false;
        for (let i = 0; i < Math.min(photos.length, 3) && !loaded; i++) {
          try {
            const photoRef = photos[i].name;
            const photo_url = PHOTO_REF_URL.replace("NAME", photoRef);
            console.log(`Trying photo ${i+1}/${Math.min(photos.length, 3)}: ${photo_url}`);
            
            // Test if the image is loadable
            const testImg = new Image();
            testImg.onload = () => {
              setPhotoUrl(photo_url);
              setIsLoading(false);
              loaded = true;
            };
            testImg.onerror = () => {
              console.warn(`Photo ${i+1} failed to load`);
              if (i === Math.min(photos.length, 3) - 1) {
                throw new Error("All photos failed to load");
              }
            };
            testImg.src = photo_url;
            
            // Add a timeout to prevent hanging
            await new Promise(resolve => setTimeout(resolve, 2000));
            if (loaded) break;
          } catch (photoError) {
            console.warn(`Error with photo ${i}:`, photoError);
          }
        }
        
        if (!loaded) {
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
    <Card className="w-[400px] h-full">
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
