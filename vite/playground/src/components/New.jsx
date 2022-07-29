import React, { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const New = () => {

  const [options, setOption] = useState([]);
  const [title, setTitle] = useState('')

  const [input, setInput] = useState('');

  const [error, setError] = useState('');

  const create = ()=>{
    if(input.length < 1){
      setError('Input Should not be empty');
    }
    else{
      setError('');
      setOption(prev=>{
        return [...prev, {name: input,votes: 0, id: uuidv4()}]
      })
      setInput('');
    }
  }
  const handleDelete = (current)=>{
    setOption(prev=>{
        return prev.filter(item =>{
           return item.id != current.id
        })
      })
  }

  const navigate = useNavigate();

  const savePoll = async()=>{
    const request = await axios.post('http://localhost:5000/api/polls/new', {options: options, title: title},
    {withCredentials: true}

    );
    const response = await request.data;
    console.log(response)
    if(response.success){
      navigate('/')
    }
  }

  return (
    <div className='h-screen w-full flex justify-center items-center grad'>
        <div className="main border max-w-md w-full p-5 rounded-lg bg-white">

              <Link  to={'/'} className='py-4 my-5'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              </Link>

              <div className="title leading-3 border-b pb-4 mb-2 flex justify-between items-center">
                <div className="">
                <h1 className='text-xl'>Create a new Poll</h1>
                <small className='text-gray-400'> You can add Upto 4 Options</small>
                </div>
                <div className="">
                  <button onClick={savePoll} disabled={options.length < 2} className='disabled:bg-red-500 py-3 rounded-sm px-2 active:scale-90 transition-all duration-300 text-white bg-[#55a630]'>Create</button>
                </div>


              </div>

              <div className="">
              <input maxLength={30} onChange={(e)=> setTitle(e.target.value)} value={title} placeholder='Title' type="text" className='w-full placeholder:text-xs p-2 rounded-lg mb-3 mt-2 outline-none border-2 border-blue-500 focus:border-orange-400 '/>
              <small className='text-gray-400'>Options</small>
              </div>
               {/* <div id="input" className='w-full flex flex-col'>
              <div className=" flex  justify-between">
                <small className='text-gray-400'>Title</small>
                  {error && <small className='text-red-500'>{error}</small>}
                  </div>
                  
              </div> */}
             
          <div className="studio flex flex-col gap-4">
          
              {options?.map(option=>{
                return (
                  <div key={option.id} className="poll w-full border h-14 rounded-lg group overflow-hidden flex justify-center items-center relative">
                  <p>{option?.name}</p>
                  
                  <svg onClick={()=> handleDelete(option)} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-2 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>

                  </div>
                )
              })}

              
{
  options.length < 4 && 
             <div id="input" className='w-full flex flex-col'>
              <div className=" flex  justify-between">
                  {/* <small className='text-gray-400'>Option</small> */}
                  {error && <small className='text-red-500'>{error}</small>}
                  </div>
                  <input maxLength={30} onChange={(e)=> setInput(e.target.value)} value={input} placeholder='Option' type="text" className='placeholder:text-xs p-2 rounded-lg mb-3 mt-2 outline-none border-2 border-blue-500 focus:border-orange-400 '/>
                  
                  <button onClick={()=> create()} className='rounded-lg py-2 border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 ease'>Add</button>
              </div>
}           



          </div>


        </div>
        </div>
  )
}

export default New;