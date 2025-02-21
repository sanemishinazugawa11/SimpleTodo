import mockup from '../assets/MobileMockup.png'
function Mockup() {
    return (
        <div className='w-full min-h-full '>
            <div className='bg-gradient-to-r from-gray-700/10 via-slate-500/10 to-slate-900/10 rounded-2xl py-8 border-[0.5px] border-x-slate-700 border-y-slate-800 flex flex-col items-center justify-evenly mt-20 '>
                <img src={mockup} alt="" className='object-cover  h-full w-[80%] sm:w-auto'/>

                <button className=' w-[70%] sm:w-[40%] lg:w-[30%] mt-10 px-2 py-3 bg-violet-950/40  text-slate-50 border-[2px] border-x-violet-900 border-y-violet-600 hover:transition hover:ease-out hover:duration-700 rounded-full  font-bold font-switzer'>Responsive as well</button>
            </div>
        </div>
    )
}

export default Mockup
