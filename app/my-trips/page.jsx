"use client";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../service/firebaseConfig";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPlaceDetails } from "../../service/GlobalApi";
import { PHOTO_REF_URL } from "../../service/GlobalApi";
import TripCard from "../view-trip/components/TripCard";

const MyTrips = () => {
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(null);

  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    trips && getPlacePhoto();
  }, [trips]);

  const getPlacePhoto = async () => {
    const place = {
      textQuery: trips[0]?.userSelection?.destination?.label,
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

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      router.push("/");
    } else {
      setUser(storedUser);
      getTripDetails(storedUser);
    }
  }, [router]);

  const getTripDetails = async (user) => {
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    const tripsData = querySnapshot.docs.map((doc) => doc.data());
    setTrips(tripsData);
    console.log("Trips", tripsData);
  };

  return (
    <div className="p-7 ">
      <h1 className="text-3xl font-bold my-10">My Trips</h1>
      <ul className="grid grid-cols-3 gap-5 ">
        {trips.map((trip, index) => (
          <TripCard key={index} trip={trip} />
        ))}
      </ul>
    </div>
  );
};

export default MyTrips;

{/* 
//     <li key={index}>
      //       <div className="border">
      //           <img src={photoUrl} alt="trip" />
      //         <h2>{trip?.userSelection?.destination?.label}</h2>
      //         <div className="flex gap-3">
      //           <p className="bg-gray-300 px-2 rounded-full">{trip?.userSelection?.travel_with}</p>
      //           <p className="bg-gray-300 px-2 rounded-full">{trip?.userSelection?.days} Days</p>
      //           <p className="bg-gray-300 px-2 rounded-full">{trip?.userSelection?.budget} Budget</p>
      //         </div>
      //       </div>
      //     </li>
      //   ))}
      // </ul> */}