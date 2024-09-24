"use client";
import { db } from "../../../service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import InfoSection from  "../components/InfoSection"
import Hotels from  "../components/Hotels"

const ViewTrip = ({ params: { tripId } }) => {

  const [tripData, setTripData] =  useState(null);

    useEffect(() => {
        tripId && getTripData();
    }
    , [tripId]);
    const getTripData = async() => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTripData(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Info section */}
      <InfoSection trip={tripData} />

      {/* Hotels */}
      <Hotels trip={tripData} />

      {/* Daily plan */}
    </div>
  );
};

export default ViewTrip;
