import Link from "next/link";
import React from "react";
import {
  ArrowRight,
  CalendarCheck,
  MapPin,
  PlaneTakeoff,
  Sparkles,
} from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const stats = [
  { label: "Trips planned this month", value: "12K+" },
  { label: "Average time saved", value: "6h" },
  { label: "Destinations covered", value: "180+" },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden pb-32">
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center bg-[url(/travel.gif)]"
        style={{
          backgroundImage:
            "url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/7c437491643371.5e3789ca6ce29.gif')",
        }}
      />

      <div className="absolute inset-0 -z-20 bg-background/80 backdrop-blur-sm" />

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/25 via-transparent to-transparent opacity-80" />
        <div className="absolute left-1/2 top-12 size-[28rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:px-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur">
            <Sparkles className="size-4" />
            Travel planning, reinvented
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Plan unforgettable journeys with an AI co-pilot by your side
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Tell us your travel dreams and we will craft a personal itinerary in
            seconds, balancing bucket-list moments with hidden gems tailored to
            your pace and budget.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" asChild>
              <Link href="/create-trip" className="flex items-center gap-2">
                Start planning now
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/my-trips">Browse saved adventures</Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="border border-border/50 bg-background/80 shadow-sm backdrop-blur"
              >
                <CardContent className="pt-6">
                  <p className="text-3xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative">
          <Card className="border-0 bg-background/80 shadow-xl ring-1 ring-border/50 backdrop-blur">
            <CardContent className="pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <PlaneTakeoff className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AI preview</p>
                    <p className="text-lg font-medium">Kyoto in full bloom</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600">
                  5-day escape
                </span>
              </div>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-4 shadow-sm">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CalendarCheck className="size-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Day 1 · Cultural immersion
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sunrise at Fushimi Inari shrine, tea ceremony in Gion, and
                      lantern-lit stroll along Shirakawa canal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-4 shadow-sm">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="size-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Curated for your vibe
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We balance must-see locations with locals-only finds,
                      matched to your travel style and dietary needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-4 shadow-sm">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Real-time tuning
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Adjust the pace, budget, or focus and watch the itinerary
                      update instantly with fresh recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="absolute -bottom-12 -right-8 hidden max-w-xs rounded-2xl border border-border/40 bg-background/90 p-5 text-sm shadow-lg backdrop-blur-md md:block">
            <p className="font-medium text-foreground">Need inspiration?</p>
            <p className="mt-1 text-muted-foreground">
              Ask our AI for foodie tours, remote work retreats, family
              adventures, or anything else you imagine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
