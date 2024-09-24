import React from 'react'

const Footer = () => {
  return (
    <div>
     
        <footer className='flex flex-col justify-center items-center h-20 mt-40 border-t-2'>
            <h2 className='text-gray-500'>© 2024 Travel Buddy</h2>
            <p
            className='text-gray-500 text-xs'
            >
                Made with ❤️ by <a href='www.github.com/rishi9808' className='text-primary'>Rishi</a>
            </p>
        </footer>
    </div>
  )
}

export default Footer
