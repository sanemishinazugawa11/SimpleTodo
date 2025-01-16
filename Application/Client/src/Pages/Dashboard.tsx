import { useEffect, useState } from 'react';
import Card from '../Components/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();

  interface Todo {
    todo_id: number;
    title: string;
    description: string;
    completed: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [addTodo, setaddTodo] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todo/getTodos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTodos(response.data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const getFilteredTodos = () => {
    if (filter === 'pending') {
      return todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    } else {
      return todos;
    }
  };

  const submitTodo = async () => {
    if (title === '' || description === '') {
      toast.info("Invalid inputs", {
        position: "top-center",
        autoClose: 1000,
        className: 'text-neutral-950 bg-amber-100  text-xs font-switzer font-semibold'
      })
      return;
    }
    console.log(title + description)
    const response = await axios.post('http://localhost:5000/api/todo/createTodo', {
      title: title,
      description: description
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.success) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 800,
        className: 'text-neutral-950 bg-amber-100  text-xs font-switzer font-semibold'
      });
      fetchTodos();
      setaddTodo(false);
    }

  }

  if (todos.length === 0) {
    return <div className='sm:relative min-h-screen w-screen bg-neutral-950 overflow-x-hidden overflow-y-scroll'>

      <ToastContainer />
      <div onClick={() => setaddTodo(true)} className='hover:cursor-pointer absolute z-50 w-20 h-8 font-switzer font-semibold px-1 sm:text-md text-sm right-3 sm:w-32 sm:h-10 flex justify-center items-center rounded-md  sm:left-5 top-10 hover:bg-amber-400 sm:bottom-10 bg-amber-300'>Add Todo</div>
      <div onClick={() => navigate('/')} className='hover:cursor-pointer absolute z-50 w-20 h-8 font-switzer font-semibold px-1 sm:text-md text-sm right-3 sm:w-32 sm:h-10 flex justify-center items-center rounded-md  sm:left-5 top-2 sm:top-24 hover:bg-yellow-400 sm:bottom-10 bg-yellow-300'>Home</div>
      {
        addTodo === true ?
          <div className=' fixed sm:absolute z-50 bottom-0 transition-all duration-300 ease-in-out sm:-translate-x-[50%] w-full sm:left-1/2 sm:w-1/3 bg-neutral-950 h-auto flex p-3 rounded-lg flex-col gap-3 sm:mb-5 border-neutral-800 border-[0.8px]'>

            <div className=' flex justify-between'>
              <h1 className='font-switzer text-2xl  text-amber-200 font-semibold'>Add todo</h1>
              <svg onClick={() => setaddTodo(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="hover:cursor-pointer bg-amber-300/50 p-[2px] hover:bg-amber-200 rounded-full size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className='font-switzer text-amber-50 text-lg font-semibold tracking-wide text'>Title :</h2>
            <input onChange={(e) => {
              setTitle(e.target.value);
            }} placeholder='title ' type="text" className='bg-neutral-800/30 font-switzer rounded-md p-1 h-20 text-amber-50' />
            <h2 className='font-switzer text-amber-50 text-lg font-semibold tracking-wide'>Description</h2>
            <input onChange={
              (e) => {
                setDescription(e.target.value);
              }
            } placeholder='description ' type="text" className='bg-neutral-800/30 font-switzer rounded-md p-1 h-20 text-amber-50' />
            <div className='w-full flex justify-center items-center'>
              <button onClick={submitTodo} className='w-1/2 bg-amber-300 p-2 rounded-md font-switzer font-semibold mt-5 hover:bg-amber-500'>Done</button>

            </div>
          </div> : null
      }
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='h-24 w-24 rounded-full  bg-amber-300 animate-ping '></div>
      </div>



    </div>;
  }

  return (
    <div className='sm:relative min-h-screen w-screen bg-neutral-950 overflow-x-hidden overflow-y-scroll'>

      <ToastContainer />
      <div onClick={() => setaddTodo(true)} className='hover:cursor-pointer absolute z-50 w-20 h-8 font-switzer font-semibold px-1 sm:text-md text-sm right-3 sm:w-32 sm:h-10 flex justify-center items-center rounded-md  sm:left-5 top-10 hover:bg-amber-400 sm:bottom-10 bg-amber-300'>Add Todo</div>
      <div onClick={() => navigate('/')} className='hover:cursor-pointer absolute z-50 w-20 h-8 font-switzer font-semibold px-1 sm:text-md text-sm right-3 sm:w-32 sm:h-10 flex justify-center items-center rounded-md  sm:left-5 top-1 sm:top-24 hover:bg-yellow-400 sm:bottom-10 bg-yellow-300'>Home</div>

      {
        addTodo === true ?
          <div className=' fixed sm:absolute z-50 bottom-0 transition-all duration-300 ease-in-out sm:-translate-x-[50%] w-full sm:left-1/2 sm:w-1/3 bg-neutral-950 h-auto flex p-3 rounded-lg flex-col gap-3 sm:mb-5 border-neutral-800 border-[0.8px]'>

            <div className=' flex justify-between'>
              <h1 className='font-switzer text-2xl  text-amber-200 font-semibold'>Add todo</h1>
              <svg onClick={() => setaddTodo(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="hover:cursor-pointer bg-amber-300/50 p-[2px] hover:bg-amber-200 rounded-full size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className='font-switzer text-amber-50 text-lg font-semibold tracking-wide text'>Title :</h2>
            <input onChange={(e) => {
              setTitle(e.target.value);
            }} placeholder='title ' type="text" className='bg-neutral-800/30 font-switzer rounded-md p-1 h-20 text-amber-50' />
            <h2 className='font-switzer text-amber-50 text-lg font-semibold tracking-wide'>Description</h2>
            <input onChange={
              (e) => {
                setDescription(e.target.value);
              }
            } placeholder='description ' type="text" className='bg-neutral-800/30 font-switzer rounded-md p-1 h-20 text-amber-50' />
            <div className='w-full flex justify-center items-center'>
              <button onClick={submitTodo} className='w-1/2 bg-amber-300 p-2 rounded-md font-switzer font-semibold mt-5 hover:bg-amber-500'>Done</button>

            </div>
          </div> : null
      }


      <div className='fixed top-5 w-1/2 left-1/4 sm:top-56 sm:h-96 sm:left-0 border-[0.8px] border-x-neutral-700 border-y-neutral-700 bg-gradient-to-r from-neutral-800/80 via-neutral-800/70 to-neutral-800/60 p-3 rounded-2xl sm:w-36 flex justify-evenly items-center sm:-translate-x-10 sm:hover:translate-x-2 hover:transition-all sm:hover:ease-in-out sm:hover:duration-300 gap-5 sm:flex-col'>
        <svg onClick={() => setFilter('all')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hover:bg-amber-400 size-6 sm:size-16 bg-amber-300 rounded-full h-10 w-10 sm:h-16 sm:w-16 p-2 hover:cursor-pointer text-center">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
        </svg>
        <svg onClick={() => setFilter('pending')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hover:bg-amber-400 size-6 sm:size-16 bg-amber-300 rounded-full h-10 w-10 sm:h-16 sm:w-16 p-2 hover:cursor-pointer text-center">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <svg onClick={() => setFilter('completed')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hover:bg-amber-400 size-6 sm:size-16 bg-amber-300 rounded-full h-10 w-10 sm:h-16 sm:w-16 p-2 hover:cursor-pointer text-center">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <div className='sm:absolute min-h-screen top-0 mt-20 sm:mt-0 bg-neutral-900/10 p-6 sm:top-0 sm:left-40 sm:p-3 w-screen flex gap-3 flex-wrap flex-col sm:flex-row overflow-y-scroll overflow-x-hidden'>
        {getFilteredTodos().map((todo, index) => {
          return <Card title={todo.title} key={index} description={todo.description} status={todo.completed} todo_id={todo.todo_id} />
        })}
      </div>
    </div>
  );
}

export default Dashboard;

