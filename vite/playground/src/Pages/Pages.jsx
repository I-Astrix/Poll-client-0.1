import React, { useContext } from 'react'
import Poll from '../components/Poll';
import {
    BrowserRouter as Router,
    Routes, Route,
  } from "react-router-dom";

import New from '../components/New';
import Home from './Home';
import Auth from './Auth';
import { ContextAuth } from '../context/AuthContext';


const Pages = () => {
  
  const { user } = useContext(ContextAuth);

  return (
    <Router>
        <Routes>

    <Route exact path="/" element={<Auth/>}/>
    <Route exact path="/login" element={<Auth/>}/>
    <Route exact path="/poll" element={<Poll/>}/>
    <Route exact path="/new" element={user ? <New/> : <Auth/>}/>
    <Route exact path="/home" element={user ? <Home/> : <Auth/>}/>
    <Route exact path="/register" element={<Auth/>}/>
   
        </Routes>
    </Router>
  )
}

export default Pages