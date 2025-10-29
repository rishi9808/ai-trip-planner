import Link from "next/link";

import Hero from "../components/Hero";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Bot,
  Compass,
  Globe2,
  MessageCircle,
  Sparkles,
  Wallet,
} from "lucide-react";

const features = [
  {
    title: "AI trip architect",
    description:
      "Let our generative AI understand your travel style, budget, and must-dos to craft day-by-day itineraries instantly.",
    icon: Sparkles,
  },
  {
    title: "Collaborative planning",
    description:
      "Share your itinerary link, gather inputs from friends in real time, and keep every detail synced across devices.",
    icon: MessageCircle,
  },
  {
    title: "Budget smart",
    description:
      "See transparent cost breakdowns, swap experiences with cheaper alternates, and stay on track with spending goals.",
    icon: Wallet,
  },
];

const steps = [
  {
    title: "Tell us where & why",
    description:
      "Share who is going, how long you have, and the vibe you're after—from foodie adventures to nature retreats.",
    icon: Compass,
  },
  {
    title: "Fine-tune in seconds",
    description:
      "Adjust pace, swap activities, or expand to new cities. The AI instantly rebalances your itinerary and logistics.",
    icon: Bot,
  },
  {
    title: "Launch your adventure",
    description:
      "Export to your calendar, get live navigation tips, and receive smart reminders before every experience.",
    icon: Globe2,
  },
];

const testimonials = [
  {
    quote:
      "I planned a two-week Japan trip in under ten minutes. The AI mixed iconic sights with tucked-away ramen spots we never would have found on our own.",
    name: "Priya K.",
    role: "Product designer",
    location: "San Francisco",
  },
  {
    quote:
      "Our remote team retreat went from idea to booked schedule in a single afternoon. The budgeting tools kept every decision simple.",
    name: "Luis M.",
    role: "Operations lead",
    location: "Lisbon",
  },
  {
    quote:
      "As a digital nomad, I rely on quick, accurate plans. This is the only tool that adapts to my pace and constantly surfaces new hotspots.",
    name: "Aisha R.",
    role: "Content creator",
    location: "Bali",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col gap-24 bg-background pb-24 pt-32 md:pt-40">
      <Hero />
      <section id="features" className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Why travelers love us
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Everything you need to go from idea to itinerary
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Powerful planning tools, powered by AI, wrapped in a delightful
            interface that keeps your next escape exciting from the first spark.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="h-full border border-border/60 bg-muted/40 shadow-sm backdrop-blur"
              >
                <CardHeader className="space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="how-it-works" className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                How it works
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Your itinerary ready in under five minutes
              </h2>
            </div>
            <p className="md:max-w-md text-muted-foreground">
              Forget endless tabs and spreadsheets. Answer a few questions,
              refine with natural language prompts, and watch a complete trip
              take shape.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={step.title}
                  className="h-full border border-border/60 bg-background/80 shadow-sm backdrop-blur"
                >
                  <CardHeader className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                        Step {index + 1}
                      </span>
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Trusted by explorers
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Stories from travelers who plan with AI daily
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From bucket-list adventures to remote work sprints, Trip Planner
            helps travelers everywhere make the most of their time.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="h-full border border-border/60 bg-background/70 shadow-md backdrop-blur"
            >
              <CardContent className="pt-6">
                <p className="text-base leading-relaxed text-foreground">
                  “{testimonial.quote}”
                </p>
                <div className="mt-6">
                  <p className="font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} · {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.35),_transparent_45%)]" />
          <CardContent className="relative px-8 py-12 sm:px-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
                  Ready to build your next escape?
                </h2>
                <p className="mt-3 max-w-xl text-primary-foreground/80">
                  Join thousands of travelers who trust AI Trip Planner to
                  curate routes, uncover hidden gems, and keep every detail
                  organized.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary shadow-lg hover:bg-white/90"
                  asChild
                >
                  <Link href="/create-trip">Build my itinerary</Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="border border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20"
                  asChild
                >
                  <Link href="#features">Discover the platform</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
