import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5 border shadow-md">
      <Image src="/logo.svg" alt="logo" width={150} height={150} />
      <Button>Sign In</Button>
    </div>
  )
}

export default Header
