import React, { useContext, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
// import { format, render, cancel, register } from 'timeago.js';
import { ContextAuth } from '../context/AuthContext';
import { format } from 'timeago.js';
// import AUTH from '../constants/AUTH';
import { post } from '../hooks/client/Requests';

import {useNavigate } from 'react-router-dom';

const Home = () => {

    const { dispatch, error: contextErr, user, } = useContext(ContextAuth);
    const navigate = useNavigate()
    const { data, error } = useFetch('/polls/getPolls');
    console.log(data && data)

    const handleLogout = async()=>{
        dispatch({type: "LOGOUT"});
        post('auth/logout');
        navigate('/login')
    }


  return (
    <div className='h-screen w-full flex justify-center grad'>
        <div className="main border max-w-xl w-full h-max mt-5 p-5 rounded-lg bg-white">

        <div className="user leading-5 text-right">
            <small className='text-xs  text-gray-400'>Logged in as</small>
            <p className='text-lg'>{user && user}</p>
        </div>


            <div className="title border-b-2 pb-2  border-blue-500 flex items-center justify-between">
                <h1 className='text-xl'>Your Active Polls</h1>
                <p>{data?.length} Polls</p>
            </div>

            <div className="my-3 text-center">
                <Link to={'/new'} className='block py-1 px-2 w-full border-2 border-blue-500 rounded-lg'>New Poll</Link>
            </div>
            
            <div className="poll-container mb-4   max-h-[600px]">

            <div className="polls mb-4 overflow-y-scroll">

                 
                 
               {data?.map(item=>{
                return (
                    <div key={item._id} className="poll border-2 py-4 my-4 rounded px-2 flex justify-between items-center hover:border-blue-500 transition-all duration-300 ease">
                    <div className="flex flex-col">
                    <h1>{item?.title}</h1>
                    <small>Created: {format(item?.createdAt)}</small>
                    <a href={item?.identifier} className='text-xs'>
                    Link:
                       <p className=' hover:text-blue-500'>  {(item?.identifier).substring(0, 25)}</p>
                        </a>
                    
                    </div>
                    <div className="">
                    <p>{item?.poll?.reduce((a, b)=> { return a + b.votes}, 0)} Votes</p>
                    <button className='text-white my-2 inline-block'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                    </div>
                    
                    
                    </div> 
                )
               })} 

                 
            

                       
            </div>


            </div>
            
            
            <div className="logout text-right">
                <button onClick={handleLogout} className='py-2 px-3 hover:border-white  hover:shadom-lg hover:bg-blue-500 hover:text-white border border-blue-500 rounded-xl'>Logout</button>
            </div>

        </div>
    </div>
  )
}

export default Home