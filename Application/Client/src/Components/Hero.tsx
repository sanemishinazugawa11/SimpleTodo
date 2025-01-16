import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Hero() {
    const navigate = useNavigate();
    const [isLogged , setIsLogged] = React.useState(false);
    useEffect(() => {
        if(localStorage.getItem('token')){
            setIsLogged(true);
        }  
    },[]);

    const handleClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.info("Login to continue", {
                position: "top-center",
                autoClose: 800,
                className: 'text-neutral-950 bg-amber-100  text-xs font-switzer font-semibold'
            })
            setTimeout(() => {
                navigate('/signin')
            }, 2000)
        }else{
            navigate('/dashboard')
        }

        
    }
    return (
        <div className='h-auto w-auto'>
            <ToastContainer />
            <div className=' tracking-wide font-switzer select-text  text-gray-200 text-center flex flex-col justify-center items-center'>

                <span className='text-amber-200 text-2xl sm:text-5xl font-bold '>Create and manage simple minimal todos.</span>

                <span className='mt-2 sm:mt-4 text-sm sm:text-xl text-white w-[90%] '>A clutter-free to-do app designed to streamline your task management.
                    Focus on what truly matters with an intuitive interface and minimal distractions, allowing you to effortlessly organize and complete your daily tasks. Perfect for those who seek simplicity and efficiency.
                </span>

            </div>

            <div className='w-full h-full mt-6 sm:mt-12 flex justify-center items-center'>
                <div className='hover:cursor-pointer bg-amber-200 sm:text-2xl sm:w-1/4 px-10  py-3 sm:py-5 rounded-full hover:bg-amber-300 hover:transition hover:ease-out hover:duration-700 flex gap-1 justify-center items-center'>
                    <button onClick={handleClick} className='font-semibold font-switzer text-md sm:text-2xl'>{isLogged ? "Go to dashboard" : "Get Started"}</button>


                </div>


            </div>
        </div>
    )
}

export default Hero