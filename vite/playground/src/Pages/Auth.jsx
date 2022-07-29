import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AuthForm.css';
import { motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { ContextAuth } from '../context/AuthContext';




const Auth = () => {

  const { dispatch, error: contextErr, user } = useContext(ContextAuth);

  const [tab, setTab] = useState(0);
  const [eye, setEye] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: ''
  });


  

  const BASE_URL = 'http://localhost:5000/api/auth/';

  const fetch = async(e, url)=>{
      e.preventDefault();
      dispatch({type: "LOGIN_START"})
      const response = await axios.post(BASE_URL + url , {  ...form }, {
       withCredentials: true
      });
      if(response.data.success === true){
        console.log( response.data.fullName)
        dispatch({type: "LOGIN_SUCCESS", payload: response.data.fullName})
        setStatus('Success')
        navigate('/home')
      }
      else{
        setStatus('Error')
        dispatch({type: "LOGIN_ERROR"})

      }
      console.log(response.data);
  }




  return (

    <div className='h-screen w-full flex justify-center items-center grad'> 


    <div className='form-parent bg-white'>
        <div className="form-tabs">

          <div onClick={()=>{setTab(0), setForm({
    email: '',
    password: '',
    fullName: ''
  })}} className={`${tab === 0 && 'active'} tab`}>Login</div>
          <div onClick={()=> {setTab(1), setForm({
    email: '',
    password: '',
    fullName: ''
  })}} className={`${tab === 1 && 'active'} tab`}>Sign Up</div>

        </div>

{tab === 0 ? <motion.form onSubmit={(e)=> fetch(e, 'login')} className="form-main">

            <div className="form-info">
                <h2>To Continue</h2>
                <small>Login to Notes App</small>
            </div>

            <div className="form-inputs">
           
                <div className="input-box">
                  <input required type="text" name="email" onChange={(e)=> setForm(prev => ({...prev, email: e.target.value}))} value={form.email} placeholder='Email'/>  
                  </div>
                  <div className="input-box pwd">
                  <input required minLength={'8'} type={eye ? "text" : "password"} name="password" onChange={(e)=> setForm(prev => ({...prev, password: e.target.value}))} value={form.password} placeholder='Password'/>   
                  <svg onClick={()=> setEye(prev=> !prev)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                  </div>

                </div> 

                  <div className="status error">
                    <small> {status} </small>
                  </div>

                  <div className="">
                    <button className='confirm'>Login</button>
                    <div className="remember">
                    <input type="checkbox" name="" id=""/>
                    <small>Remember Me</small>
                    </div>
                  </div>
        </motion.form>

: 
<motion.form onSubmit={(e)=> fetch(e, 'register')} className="form-main">

            <div className="form-info">
                <h2>To Continue</h2>
                <small>Provide Us Your</small>
            </div>

            <div className="form-inputs">
            <div className="input-box">
                  <input type="text" minLength={'3'} name="fullName" onChange={(e)=> setForm(prev => ({...prev, fullName: e.target.value}))} value={form.fullName} placeholder='Name'/>  
                  </div>
                <div className="input-box">
                  <input type="text" name="email" onChange={(e)=> setForm(prev => ({...prev, email: e.target.value}))} value={form.email} placeholder='Email'/>  
                  </div>
                  <div className="input-box pwd">
                  <input type={eye ? "text" : "password"} name="password" onChange={(e)=> setForm(prev => ({...prev, password: e.target.value}))} value={form.password} placeholder='Password'/>   
                  <svg onClick={()=> setEye(prev=> !prev)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                  </div>

                </div> 

                  <div className="status error">
                    <small> {status} </small>
                  </div>

                  <div className="">
                    <button className='confirm'>Sign Up</button>
                    <div className="remember">
                    <input type="checkbox" name="" id=""/>
                    <small>Remember Me</small>
                    </div>
                  </div>
        </motion.form>

  }            
        


    </div>
    </div>
  )
}

export default Auth;