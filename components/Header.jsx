"use client";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import Image from "next/image";
import React from "react";

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
          <img
            src={user?.picture}
            alt={user?.name}
            className="rounded-full size-10 ml-2"
          />
        </div>
      ) : (
        <Button href="/login">Login</Button>
      )}
    </div>
  );
};

export default Header;
