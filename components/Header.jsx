"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      console.log(userData);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClassName = cn(
    "sticky top-0 z-50 w-full border-b transition-all duration-300",
    isScrolled
      ? "border-border/70 bg-background/80 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/65"
      : "border-transparent bg-background/20 backdrop-blur"
  );

  return (
    <header className={headerClassName}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Image
            src="/logo.png"
            alt="AI Trip Planner"
            width={80}
            height={40}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link
            href="/#features"
            className="transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="transition-colors hover:text-primary"
          >
            How it works
          </Link>
          <Link
            href="/#testimonials"
            className="transition-colors hover:text-primary"
          >
            Stories
          </Link>
          <Link
            href="/my-trips"
            className="transition-colors hover:text-primary"
          >
            My trips
          </Link>
        </nav>

        {user ? (
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link href="/create-trip">New itinerary</Link>
            </Button>

            <Popover>
              <PopoverTrigger className="flex items-center">
                <img
                  src={user?.picture}
                  alt={user?.name}
                  className="ml-1 size-10 rounded-full border border-white/40 object-cover"
                  referrerPolicy="no-referrer"
                />
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex items-start gap-4">
                  <img
                    src={user?.picture}
                    alt={user?.name}
                    className="size-16 rounded-full border border-border object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">
                      Signed in as
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {user?.name}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={() => {
                        localStorage.removeItem("user");
                        setUser(null);
                      }}
                    >
                      Sign out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="rounded-full bg-primary px-6 text-primary-foreground shadow-lg hover:bg-primary/90"
            >
              <Link href="/create-trip">Get started</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
