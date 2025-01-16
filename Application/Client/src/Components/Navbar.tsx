import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = React.useState(false);

    const checkLoggedIn = () => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLogged(true);
        }
        else {
            setIsLogged(false);
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, [])

    useEffect(() => {
        checkLoggedIn();
    }, [isLogged]);

    const logOut = () => {

        if (isLogged) {
            localStorage.clear();
            setIsLogged(false)
        } else {
            navigate('/signin')
        }
    }


    return (
        <div>
            <div className="sm:bg-neutral-950 sm:rounded-full sm:z-50 sm:border-[0.5px] sm:border-x-slate-600 sm:border-y-neutral-700 fixed top-10 left-1/2 w-full sm:w-1/4 -translate-x-[50%] h-20 p-5">
                <ToastContainer />
                <div className="hidden sm:flex sm:justify-evenly sm:px-2 sm:font-switzer sm:text-white sm:text-center sm:text-xl sm:font-medium sm:tracking-wider sm:items-center sm:w-full sm:h-full sm:hover:cursor-pointer">
                    <span className="sm:hover:bg-gray-800 sm:rounded-xl sm:p-3">Home</span>
                    <span onClick={() => {
                        if (isLogged) {
                            navigate('/dashboard')
                        }
                        else {
                            toast.info("Please login to continue", {
                                position: "top-center",
                                autoClose: 800,
                                className: 'text-neutral-950 bg-amber-100  text-xs font-switzer font-semibold'
                            })

                            setTimeout(() => {
                                navigate('/signin')
                            }, 1500)
                        }

                    }} className="sm:hover:bg-gray-800 sm:rounded-xl sm:p-3">Todos</span>
                    <span onClick={logOut} className="sm:hover:bg-gray-800 sm:rounded-xl sm:p-3">{isLogged == true ? "Logout" : "Login"}</span>

                </div>
               
                <div className="sm:hidden  absolute z-50 top-0 w-[70vw] left-1/2 -translate-x-[50%] rounded-full  flex justify-evenly items-center  bg-neutral-950/40 border-[0.9px] border-neutral-700 font-switzer text-md text-amber-50 p-1">
                    <span onClick={()=> navigate('/')} className="sm:hover:bg-gray-800 rounded-xl p-3">Home</span>
                    <span onClick={()=> {
                        if (isLogged) {
                            navigate('/dashboard')
                        }
                        else {
                            toast.info("Please login to continue", {
                                position: "top-center",
                                autoClose: 800,
                                className: 'text-neutral-950 bg-amber-100  text-xs font-switzer font-semibold'
                            })

                            setTimeout(() => {
                                navigate('/signin')
                            }, 1500)
                        }
                    }} className="sm:hover:bg-gray-800 rounded-xl p-3">Todos</span>
                    <span onClick={logOut} className="sm:hover:bg-gray-800 sm:rounded-xl sm:p-3">{isLogged == true ? "Logout" : "Login"}</span>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
