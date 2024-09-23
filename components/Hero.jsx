import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl mx-56 font-extrabold pt-10 text-center">
            <span className="text-red-500 leading-snug">
                Discover your next adventure with AI:
            </span>
            Personalized itineraries at your fingertips
        </h1>
        <p className="text-muted-foreground my-5 text-lg">Your Personal Travel Assistant is here to help you plan your next trip.
        </p>
        <Link href="/create-trip">
        <Button>Get started, Its free</Button>
        </Link>
    </div>
  )
}

export default Hero
