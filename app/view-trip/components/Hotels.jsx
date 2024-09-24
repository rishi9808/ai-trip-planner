import Link from 'next/link';
import React, { useEffect } from 'react'

const Hotels = ({trip}) => {

    useEffect(() => {
        console.log(trip?.tripData?.hotelOptions);
    }
    , [trip]);
  return (
    <div>
      <h1 className='font-bold text-xl mt-5'>Hotel Recommendation</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
        {trip?.tripData?.hotel_options.map((hotel, index) => (
            <Link href={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`} target="_blank" key={index}>
      <div className='border p-3  rounded-lg shadow-sm hover:scale-105 transition-all cursor-pointer'>
        <img src="/banner.jpg" alt="" className='rounded-lg' />
        <div className='my-2 flex flex-col gap-2'>
            <h2 className='font-medium'>{hotel.hotelName}</h2>
            <p className='text-gray-500'>{hotel.hotelAddress}</p>
            <h2 className='text-sm'>{hotel.price}</h2>
            <h2 className='text-sm'>{hotel?.rating}</h2>
        </div>
      </div>
        </Link>
         ))} 
      </div>
      
    </div>
  )
}

export default Hotels
