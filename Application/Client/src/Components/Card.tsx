import React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function Card({ title, description, status, todo_id }: CardProps) {

  const updateTodo = async (todo_id: number) => {
    try {
      const token = localStorage.getItem('token'); // Correctly retrieve the token
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const response = await axios.post(`http://localhost:5000/api/todo/updateTodo?id=${todo_id}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      toast.info("Updated Successfully, Reload the page", {
        position: "top-center",
        autoClose: 1500,
        className: 'text-neutral-950 bg-amber-100  text-xs font-switzer font-semibold'
      })
      console.log('Response:', response.data);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='bg-neutral-900/40 p-5 border-[0.5px] flex flex-col justify-center border-x-zinc-800 border-y-zinc-800 m-2 rounded-xl h-auto w-auto sm:h-64 sm:w-1/5'>
      <ToastContainer />
      <h1 className='text-xl text-left break-words truncate overflow-y-hidden font-bold font-switzer text-amber-50 capitalize tracking-wide'>{title}</h1>
      <p className='text-md text-left break-words overflow-y-hidden h-32 leading-6 mt-3 font-switzer text-slate-300'>{description}</p>
      {
        status === false ?
          <div className='flex mt-3 justify-between items-center'>
            <div className='bg-yellow-500/50 text-yellow-200 font-semibold px-1 border-2 border-x-yellow-200 border-y-yellow-300 py-[0.5px] rounded-xl text-xs w-16 h-6 flex justify-center items-center font-switzer'>Pending</div>
            <button onClick={() => updateTodo(todo_id)} className='flex justify-center items-center font-semibold bg-amber-300 rounded-md hover:bg-amber-400 hover:transition-all hover:duration-150 hover:ease-in-out w-20 h-8 font-switzer gap-1 text-sm p-1'>Mark
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          :
          <div className='flex mt-3 justify-between items-center'>
            <div className='bg-green-700/50 text-green-200 font-semibold px-1 border-2 border-x-green-200 border-y-green-300 py-[0.5px] rounded-xl text-xs w-20 h-6 flex justify-center items-center font-switzer'>Completed</div>
          </div>
      }
    </div>
  )
}

interface CardProps {
  todo_id: number;
  title: string;
  description: string;
  status: boolean;
}

export default Card;
