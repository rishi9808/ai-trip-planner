"use client";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../service/firebaseConfig";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TripCard from "../view-trip/components/TripCard";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Plane, Sparkles } from "lucide-react";

const MyTrips = () => {
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    const tripsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTrips(tripsData);
    console.log("Trips", tripsData);
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-muted/30 py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 sm:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Plane className="size-4" />
              Your adventures
            </span>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              Trips you have crafted with AI
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Revisit plans, fine-tune itineraries, or share them with friends.
              New ideas are only a few clicks away.
            </p>
          </div>
          <Button
            className="w-full sm:w-auto"
            onClick={() => router.push("/create-trip")}
          >
            Plan a new trip
          </Button>
        </header>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={`skeleton-${index}`}
                className="h-full animate-pulse border border-border/50 bg-background/80"
              >
                <div className="h-40 w-full rounded-t-xl bg-muted" />
                <CardContent className="space-y-4 pt-6">
                  <div className="h-4 w-2/3 rounded bg-muted" />
                  <div className="h-3 w-full rounded bg-muted" />
                  <div className="h-10 w-full rounded bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : trips.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </ul>
        ) : (
          <Card className="border border-dashed border-primary/40 bg-background/70 py-12 text-center shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Sparkles className="size-5 text-primary" />
                No trips yet
              </CardTitle>
              <CardDescription className="max-w-md mx-auto text-base">
                When you plan with AI Trip Planner, your itineraries will live
                here for quick edits and sharing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/create-trip")}>
                Create your first trip
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default MyTrips;

{
  /* 
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
      // </ul> */
}
