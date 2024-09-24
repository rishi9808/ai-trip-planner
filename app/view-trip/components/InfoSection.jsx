import { useEffect } from "react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { getPlaceDetails } from "../../../service/GlobalApi";
import { PHOTO_REF_URL } from "../../../service/GlobalApi";

const InfoSection = (trip) => {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    trip.trip && getPlacePhoto();
  }, [trip.trip]);

  const getPlacePhoto = async () => {
    const place = {
      textQuery: trip.trip?.userSelection?.destination?.label,
    };
    const result = await getPlaceDetails(place).then((res) => {
      console.log(res.data.places[0].photos[2].name);

      const photo_url = PHOTO_REF_URL.replace(
        "NAME",
        res.data.places[0].photos[2].name
      );
      setPhotoUrl(photo_url);
    });
  };
  return (
    <div>
      <img
        src={photoUrl}
        alt="banner"
        className="w-full h-[340px] object-cover rounded-xl"
      />
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
