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
            <ToastContainer />

            <div className=" bg-neutral-950/80 backdrop-blur-md text-white rounded-full z-50 border-[0.5px] flex justify-evenly items-center border-x-slate-600 border-y-neutral-700 fixed top-10 left-1/2  w-[80%] sm:w-[50%]  -translate-x-[50%] h-[10vh] ">
                <span className="hover:underline hover:cursor-pointer sm:rounded-xl font-semibold font-switzer sm:text-lg lg:text-xl xl:text-2xl">Home</span>
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

                }} className="hover:underline hover:cursor-pointer sm:rounded-xl font-semibold font-switzer sm:text-lg lg:text-xl xl:text-2xl">Todos</span>
                <span onClick={logOut} className="hover:underline hover:cursor-pointer sm:rounded-xl font-semibold font-switzer sm:text-lg lg:text-xl xl:text-2xl">{isLogged == true ? "Logout" : "Login"}</span>


            </div>
        </div>
    );
};

export default Navbar;
