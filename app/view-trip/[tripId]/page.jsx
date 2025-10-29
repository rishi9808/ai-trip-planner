"use client";
import { db } from "../../../service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

const ViewTrip = ({ params: { tripId } }) => {
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);
  const getTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTripData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  return (
    <main className="min-h-screen bg-muted/20 pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pt-10 sm:px-6 md:px-10 lg:px-12">
        <InfoSection trip={tripData} />
        <Hotels trip={tripData} />
        <PlacesToVisit trip={tripData} />
      </div>
      <Footer />
    </main>
  );
};

export default ViewTrip;
