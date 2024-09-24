import Image from 'next/image'
import React, { useEffect } from 'react'
import { Button } from '../../../components/ui/button'

const InfoSection = (trip) => {

  useEffect(() => {
    console.log(trip.trip?.userSelection?.destination?.label);
  }, [trip])
  return (
    <div>
      <img src='/banner.jpg' alt='banner' className='w-full h-[340px] object-cover rounded-xl'/>
      <div className='flex justify-between items-center'>

      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip.trip?.userSelection?.destination?.label}</h2>
        <div className='flex gap-x-5'>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm'>{trip.trip?.userSelection?.days} Days</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm'>{trip.trip?.userSelection?.budget} Budget</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm'>{trip.trip?.userSelection?.travel_with} Trip</h2>
        </div>
      </div>
      <div>
        <Button>Share trip</Button>
      </div>
      </div>
     
    </div>
  )
}

export default InfoSection
