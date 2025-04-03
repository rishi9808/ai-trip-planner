import { useEffect } from "react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { getPlaceDetails, checkImageExists } from "../../../service/GlobalApi";
import { PHOTO_REF_URL } from "../../../service/GlobalApi";

const InfoSection = (trip) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (trip.trip) {
      setIsLoading(true);
      setLoadError(false);
      getPlacePhoto();
    }
  }, [trip.trip]);

  const getPlacePhoto = async () => {
    try {
      const place = {
        textQuery: trip.trip?.userSelection?.destination?.label,
      };
      
      const result = await getPlaceDetails(place);
      const photos = result?.data?.places[0]?.photos;
      
      if (photos && photos.length > 0) {
        // Try multiple photos if available
        let loaded = false;
        for (let i = 0; i < Math.min(photos.length, 3) && !loaded; i++) {
          try {
            const photoRef = photos[i].name;
            const photo_url = PHOTO_REF_URL.replace("NAME", photoRef);
            console.log(`InfoSection: Trying photo ${i+1}/${Math.min(photos.length, 3)}: ${photo_url}`);
            
            // Test if the image is loadable
            const testImg = new Image();
            testImg.onload = () => {
              setPhotoUrl(photo_url);
              setIsLoading(false);
              loaded = true;
            };
            testImg.onerror = () => {
              console.warn(`InfoSection: Photo ${i+1} failed to load`);
              if (i === Math.min(photos.length, 3) - 1) {
                throw new Error("All photos failed to load");
              }
            };
            testImg.src = photo_url;
            
            // Add a timeout to prevent hanging
            await new Promise(resolve => setTimeout(resolve, 2000));
            if (loaded) break;
          } catch (photoError) {
            console.warn(`InfoSection: Error with photo ${i}:`, photoError);
          }
        }
        
        if (!loaded) {
          throw new Error("No photos could be loaded");
        }
      } else {
        throw new Error("No photos available for this place");
      }
    } catch (error) {
      console.error("InfoSection: Error fetching place photos:", error);
      setPhotoUrl("/placeholder-destination.jpg");
      setLoadError(true);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="w-full h-[340px] bg-gray-200 rounded-xl flex items-center justify-center"></div>
          <p className="text-gray-500">Loading destination image...</p>
        </div>
      ) : (
        <img
          src={photoUrl}
          alt="banner"
          className="w-full h-[340px] object-cover rounded-xl"
          onError={(e) => {
            console.error("Banner image failed to load:", e);
            e.target.src = "/placeholder-destination.jpg";
            e.target.onerror = null;
            setLoadError(true);
          }}
        />
      )}
      {loadError && (
        <div className="text-xs text-red-400 mt-1 text-center">
          Could not load image for this destination
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            📍{trip.trip?.userSelection?.destination?.label}
          </h2>
          <div className="flex gap-x-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm">
              🧭 {trip.trip?.userSelection?.days} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm">
              💸{trip.trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm">
              🥂 {trip.trip?.userSelection?.travel_with} Trip
            </h2>
          </div>
        </div>
        <div>
          <Button>Share trip</Button>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
