import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = React.useState(false);

    const checkLoggedIn = ()=>{
        const token = localStorage.getItem('token');

        if (token) {
            setIsLogged(true);
        }
        else {
            setIsLogged(false);

            toast.info("Please login to continue", {
                position: "top-center",
                autoClose: 2000,
                className: 'text-neutral-950 bg-amber-100  text-xs font-switzer font-semibold'
            })
        }
    }

    useEffect(() => {
        checkLoggedIn();    
    }, [])

    useEffect(() => {
        checkLoggedIn();
    }, [isLogged]);

    const logOut = ()=>{

        if(isLogged){
            localStorage.clear();
            setIsLogged(false)
        }else{
            navigate('/signin')
        }
    }


    return (
        <div>
            <div className="sm:bg-neutral-950 sm:rounded-full sm:z-50 sm:border-[0.5px] sm:border-x-slate-600 sm:border-y-neutral-700 fixed top-10 left-1/2 w-full sm:w-1/4 -translate-x-[50%] h-20 p-5">
            <ToastContainer/>
                <div className="hidden sm:flex sm:justify-evenly sm:px-2 sm:font-switzer sm:text-white sm:text-center sm:text-xl sm:font-medium sm:tracking-wider sm:items-center sm:w-full sm:h-full sm:hover:cursor-pointer">
                    <span className="sm:hover:bg-gray-800 sm:rounded-xl sm:p-3">Home</span>
                    <span onClick={()=>{
                        if(isLogged){
                        navigate('/dashboard')
                        }
                        else{
                            toast.info("Please login to continue", {
                                position: "top-center",
                                autoClose: 800,
                                className: 'text-neutral-950 bg-amber-100  text-xs font-switzer font-semibold'
                            })

                            setTimeout(()=>{
                                navigate('/signin')
                            },1500)
                        }

                    }} className="sm:hover:bg-gray-800 sm:rounded-xl sm:p-3">Todos</span>
                    <span onClick={logOut} className="sm:hover:bg-gray-800 sm:rounded-xl sm:p-3">{isLogged == true ? "Logout" : "Login"}</span>
                    
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 fixed top-0 left-10 stroke-slate-50  sm:hidden">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </div>
    );
};

export default Navbar ;
