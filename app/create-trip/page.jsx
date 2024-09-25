"use client";

import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../../components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "../../constants/options";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { chatSession } from "../../service/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../../components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../service/firebaseConfig";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const createTrip = () => {
  const [destination, setDestination] = useState(null);
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (err) => console.log(err),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        handleGenerateTrip();
      })
      .catch((err) => {
        console.log("Error", err);
        console.log(err);
      });
  };

  const handleFormChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.days ||
      !formData?.destination ||
      !formData?.budget ||
      !formData?.travel_with
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (formData.days < 1) {
      toast.error("Days should be greater than 0");
      return;
    }

    if (formData.days > 5) {
      toast.error("Days should be less than 5");
      return;
    }

    setLoading(true);
    const FINAL_PROMOPT = AI_PROMPT.replace(
      "{destination}",
      formData.destination.label
    )
      .replaceAll("{days}", formData.days)
      .replace("{budget}", formData.budget)
      .replace("{travel_with}", formData.travel_with);

    console.log(FINAL_PROMOPT);

    const result = await chatSession.sendMessage(FINAL_PROMOPT);

    console.log(result.response.text());
    setLoading(false);
    toast.success("Trip generated successfully");
    saveTripDetails(result.response.text());
  };

  const saveTripDetails = async (tripData) => {
    setLoading(true);
    const docid = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
    // Save the trip details to the database

    await setDoc(doc(db, "AITrips", docid), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user.email,
      id: docid,
    });
    // toast({
    //   variant: "success",
    //   title: "Success",
    //   description: "Trip generated successfully",
    // });
    setLoading(false);
    router.push(`/view-trip/${docid}`);
  };

  return (
    <div
      className="sm:px-10 md:px-32 lg:px-56 xl:px-10
    mt-10"
    >
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="text-muted-foreground my-5 text-lg">
        Just provide some basic information about your trip and we will generate
        a personalized itinerary for you.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl font-medium my-3">
            What is your destination of your choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
            selectProps={{
              destination,
              onChange: (destination) => {
                setDestination(destination);
                handleFormChange("destination", destination);
              },
              placeholder: "Search for a destination",
            }}
          />
        </div>
        <div>
          <h2 className="text-xl font-medium mt-10 mb-3">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Enter number of days"
            type="number"
            onChange={(e) => handleFormChange("days", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-medium mt-10 mb-3">
          What is your budget for the trip?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((option) => (
            <div
              key={option.id}
              className={`cursor-pointer border p-4 mb-5 rounded-lg hover:shadow-lg shadow-sm
                ${
                  formData.budget === option.title
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              onClick={() => handleFormChange("budget", option.title)}
            >
              <h2 className="">{option.icon}</h2>
              <h2 className=" font-bold text-lg">{option.title}</h2>
              <h2 className=" font-normal text-base text-muted-foreground">
                {option.desc}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-medium mt-10 mb-3">
          Who do you plan to travel with?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((option) => (
            <div
              key={option.id}
              className={`cursor-pointer border p-4 mb-5 rounded-lg hover:shadow-lg shadow-sm
                ${
                  formData.travel_with === option.title
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              onClick={() => handleFormChange("travel_with", option.title)}
            >
              <h2 className="">{option.icon}</h2>
              <h2 className=" font-bold text-lg">{option.title}</h2>
              <h2 className=" font-normal text-base text-muted-foreground">
                {option.desc}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center ">
        {loading ? (
          <Button className="w-full mt-5" disabled>
            Loading...
          </Button>
        ) : (
          <Button className="w-full mt-5" onClick={handleGenerateTrip}>
            Generate Trip
          </Button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7 text-black">
                Sign in with Google
              </h2>
              <p className=" text-muted-foreground">
                Sign in to the App with Google Authentication securely to
                continue.
              </p>
              <Button className="w-full mt-5" onClick={login}>
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default createTrip;
