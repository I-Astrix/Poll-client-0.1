import axios from "axios";
import fetch from "./client";

export const get = async(url)=>{
    const response = await fetch.get(url , {
     withCredentials: true
    });
    // if(response.data.success === true){
    //   setStatus('Success'); 
    // }
    // else{
    //   setStatus('Error');
    // }
}

export const post = async(url, body)=>{    
    const response = await fetch.post(url, { ...body }, {
     withCredentials: true
    });
    // if(response.data.success === true){
    //   setStatus('Success');
    // }
    // else{
    //   setStatus('Error');
    // }
}