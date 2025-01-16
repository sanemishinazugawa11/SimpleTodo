import React from 'react'

function Footer() {
  return (
    <div className='w-full h-full bg-gradient-to-r from-slate-950/20 via-slate-900/80 to-zinc-950/30 mt-10 rounded-lg'>
      <div className=' w-full h-full flex flex-col justify-center items-center px-16 py-10 font-switzer'>
        <span className='text-white text-md sm:text-lg font-semibold'>© 2025. All rights reserved.</span>
      
        <span className='text-white text-lg sm:text-xl font-semibold' >Made by Bhuvan.</span>
      </div>
    </div>
  )
}

export default Footer