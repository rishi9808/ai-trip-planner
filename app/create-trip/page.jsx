"use client";

import { useMemo, useState } from "react";
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
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ArrowRight, CheckCircle, Clock, Compass, Loader2 } from "lucide-react";

const CreateTripPage = () => {
  const [destination, setDestination] = useState(null);
  const [formData, setFormData] = useState({});
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const summaryItems = useMemo(
    () => [
      {
        label: "Destination",
        value: formData?.destination?.label || "Not selected",
      },
      { label: "Travelers", value: formData?.travel_with || "Not selected" },
      { label: "Days", value: formData?.days || "—" },
      { label: "Budget", value: formData?.budget || "Not selected" },
    ],
    [formData]
  );

  return (
    <section className="relative min-h-screen bg-muted/40 py-14 sm:py-20">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-border/70 bg-background/95 px-10 py-8 text-center shadow-2xl">
            <Loader2 className="size-10 animate-spin text-primary" />
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Curating a plan just for you
              </p>
              <p className="text-sm text-muted-foreground">
                Gathering hidden gems, balancing your pace, and tailoring
                recommendations.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.08),_transparent_55%)]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 md:flex-row md:gap-12 lg:px-8">
        <div className="md:w-2/5">
          <div className="sticky top-28 space-y-6 md:space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Compass className="size-3.5" />
                Plan in minutes
              </span>
              <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Tell us the essentials and we will craft your dream escape
              </h1>
              <p className="mt-4 text-muted-foreground">
                Personalize every detail—from budget and travel companions to
                the pace you prefer. Our AI refines the plan instantly so you
                can focus on the fun parts.
              </p>
            </div>

            <Card className="border border-border/60 bg-background/70 shadow-lg backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                  Trip Summary
                </CardTitle>
                <CardDescription>
                  Keep track of your selections as you go. You can tweak
                  anything before generating your itinerary.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {summaryItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="max-w-[60%] text-right font-medium text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="hidden flex-col gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-6 py-5 text-sm text-primary shadow-sm md:flex">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle className="size-4" />
                What you get
              </div>
              <p className="text-primary/80">
                A curated day-by-day itinerary, hotel picks, must-see spots, and
                smart suggestions tailored to how you love to travel.
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-3/5">
          <Card className="border-0 bg-background/90 shadow-xl ring-1 ring-border/50 backdrop-blur">
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl font-semibold">
                Your travel canvas
              </CardTitle>
              <CardDescription>
                Start with the basics. We will transform them into a polished
                itinerary you can share or edit anytime.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="space-y-3">
                <h2 className="text-lg font-medium text-foreground">
                  Where are you heading?
                </h2>
                <div className="rounded-lg border border-border/70 bg-background p-2 shadow-sm">
                  <GooglePlacesAutocomplete
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
                    selectProps={{
                      destination,
                      onChange: (value) => {
                        setDestination(value);
                        handleFormChange("destination", value);
                      },
                      placeholder: "Search global destinations...",
                      styles: {
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "transparent",
                          border: "none",
                          boxShadow: "none",
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "hsl(var(--foreground))",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "hsl(var(--foreground))",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 10,
                        }),
                      },
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-medium text-foreground">
                  Trip duration
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    placeholder="Number of days"
                    type="number"
                    min={1}
                    max={5}
                    className="h-11"
                    onChange={(e) => handleFormChange("days", e.target.value)}
                  />
                  <div className="flex items-center gap-3 rounded-lg border border-dashed border-border/70 bg-muted/40 p-3 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    Trips up to five days get the most detailed itineraries.
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-medium text-foreground">
                  Budget comfort
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {SelectBudgetOptions.map((option) => {
                    const isActive = formData.budget === option.title;
                    return (
                      <button
                        type="button"
                        key={option.id}
                        onClick={() => handleFormChange("budget", option.title)}
                        className={`group flex h-full flex-col gap-2 rounded-xl border p-4 text-left transition-all ${
                          isActive
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-border/60 bg-background/80 hover:border-primary/60 hover:bg-primary/5"
                        }`}
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <span className="text-base font-semibold text-foreground">
                          {option.title}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {option.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-medium text-foreground">
                  Who is coming along?
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {SelectTravelesList.map((option) => {
                    const isActive = formData.travel_with === option.title;
                    return (
                      <button
                        type="button"
                        key={option.id}
                        onClick={() =>
                          handleFormChange("travel_with", option.title)
                        }
                        className={`group flex h-full flex-col gap-2 rounded-xl border p-4 text-left transition-all ${
                          isActive
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-border/60 bg-background/80 hover:border-primary/60 hover:bg-primary/5"
                        }`}
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <span className="text-base font-semibold text-foreground">
                          {option.title}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {option.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  className="w-full sm:w-auto"
                  size="lg"
                  disabled={loading}
                  onClick={handleGenerateTrip}
                >
                  {loading ? "Generating..." : "Generate itinerary"}
                  {!loading && <ArrowRight className="ml-2 size-4" />}
                </Button>
                <p className="text-sm text-muted-foreground">
                  You can refine or regenerate as many times as you want.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" alt="AI Trip Planner" className="h-10" />
              <h2 className="mt-6 text-lg font-semibold text-foreground">
                Sign in with Google
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Save itineraries, sync across devices, and revisit your favorite
                trips anytime.
              </p>
              <Button className="mt-5 w-full" onClick={login}>
                Continue with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CreateTripPage;
