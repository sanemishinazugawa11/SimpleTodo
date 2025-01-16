import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const submitDetails = async () => {
        if (!username || !email || !password) {
            toast.warn("Please fill all the details.", {
                position: "bottom-center",
                autoClose: 1000,
                className: 'text-neutral-950 bg-amber-100 font-switzer font-semibold'
            })
            return;
        }

        else if (password.length < 8) {
            toast.warn("Password should be of minimum 8 characters.", {
                position: "bottom-center",
                autoClose: 1500,
                className: 'text-neutral-950 bg-amber-100  text-xs font-switzer font-semibold'
            })
            return;
        }


        console.log(username, email, password);
        const response = await axios.post('http://localhost:5000/api/user/signup', {
            username: username,
            email: email,
            password: password
        });
        console.log(response.data);
        toast.info(response.data.message, {
            position: "bottom-center",
            autoClose: 1500,
            className: 'text-neutral-950 bg-amber-100  text-xs font-switzer font-semibold'
        })

        if (response.data.success) {
            const token = response.data.token;
            localStorage.setItem('token', token);
        }

        toast.info("Redirecting you", {
            position: "top-center",
            autoClose: 1500,
            className: 'text-neutral-950 bg-amber-100  text-xs font-switzer font-semibold'
        })
        setTimeout(() => {
            navigate('/');
        }, 2000)


    }







    return (
        <div className='w-screen min-h-screen overflow-hidden bg-neutral-950 flex gap-5 justify-between'>
            <ToastContainer />
            <div className='w-[60vw] flex flex-col items-center justify-center bg-gradient-to-r from-sky-500 via-red-500 to-violet-500 bg-clip-text   p-16'>
                <h1 className='text-8xl text-transparent font-switzer font-semibold text-center'>"Begin where you are. Use what you have. Do what you can."</h1>
            </div>
            <div className='  w-[40vw] text-white flex flex-col items-center justify-center'>


                <div className='bg-neutral-950/60 w-3/4 h-[60vh] rounded-xl border-[0.8px] border-slate-700 p-5 flex flex-col justify-center m-5 gap-2 '>
                <h1 className='text-4xl mb-8 font-switzer font-semibold text-center'>Signup</h1>
                    <h1 className='font-switzer text-lg font-semibold tracking-wide'>Enter your username :</h1>
                    <input onChange={handleUsername} type='text' placeholder='Username' className='w-full p-2 rounded-md border-[0.8px] border-slate-600 bg-neutral-600/30 font-switzer ' />
                    <h1 className='font-switzer text-lg font-semibold tracking-wide'>Enter your email :</h1>
                    <input onChange={handleEmail} type='email' placeholder='Email' className='w-full p-2 rounded-md border-[0.8px] border-slate-600 bg-neutral-600/30 font-switzer ' />
                    <h1 className='font-switzer text-lg font-semibold tracking-wide'>Enter your password :</h1>
                    <input onChange={handlePassword} type='password' placeholder='Password' className='w-full p-2 rounded-md border-[0.8px] border-slate-600 bg-neutral-600/30 font-switzer ' />

                    <h3 className='font-switzer text-xs '>* please enter a password of minimum 8 characters</h3>

                    <button onClick={submitDetails} className='w-full bg-amber-500 text-neutral-950 hover:bg-amber-400 hover:transition hover:duration-300 hover:ease-in-out mt-3 py-3 rounded-md font-switzer font-semibold text-lg tracking-wide '>Signup</button>
                    <h3 className='font-switzer text-xs '>* By clicking you accept the Terms and Conditions </h3>
                    <h3 onClick={()=> navigate('/signin')} className='font-switzer text-xs  '>Already a user? <span className='text-sky-400 underline hover:cursor-pointer text-xs font-switzer'>click here</span> </h3>

                </div>
                <div>
                    <div className='h-[0.8px] bg-gradient-to-r from-slate-950 via-slate-600 to-stone-950 w-[60vw] rounded-full'></div>
                </div>
            </div>
        </div>
     
    )
}


export default Signup