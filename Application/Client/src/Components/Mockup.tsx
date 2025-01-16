import React from 'react'
import mockup from '../assets/MobileMockup.png'
function Mockup() {
    return (
        <div className='w-full min-h-full '>
            <div className='bg-gradient-to-r from-gray-700/10 via-slate-500/10 to-slate-900/10 rounded-2xl border-[0.5px] border-x-slate-700 border-y-slate-800 h-1/3 sm:h-1/4 mt-6 sm:mt-12 flex flex-col justify-center items-center py-16'>
                <img src={mockup} alt="" className='object-cover w-3/4 h-full sm:w-1/4'/>

                <button className=' mt-10 px-4 py-2 sm:mt-16 sm:px-16 sm:py-4 bg-violet-950/40 w-1/3 text-slate-50 border-[2px] border-x-violet-900 border-y-violet-600 hover:transition hover:ease-out hover:duration-700 rounded-full text-md sm:text-xl font-bold font-switzer'>Responsive as well</button>
            </div>
        </div>
    )
}

export default Mockup
