"use client";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      console.log(userData);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  return (
    <div className="flex justify-between items-center p-5 border shadow-md">
      <Image src="/logo.svg" alt="logo" width={150} height={150} />
      {user ? (
        <div className="flex">
          <Button variant="outline" className="rounded-full">
            My Trips
          </Button>

          <Popover>
            <PopoverTrigger>
              <img
                src={user?.picture}
                alt={user?.name}
                className="rounded-full size-10 ml-2"
              />
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-4 flex">
                <div>
                  <p className="text-sm">Signed in as</p>
                  <p className="font-bold">{user?.name}</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      localStorage.removeItem("user");
                      setUser(null);
                    }}
                  >
                    Sign out
                  </Button>
                </div>
                <div>
                  <img
                    src={user?.picture}
                    alt={user?.name}
                    className="rounded-full size-24 object-cover ml-2"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <a href="/create-trip">
          <Button>Get Started</Button>
        </a>
      )}
    </div>
  );
};

export default Header;
