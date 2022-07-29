import React, { useEffect, useState } from 'react'
import client from './client/client';

const useFetch = (url) => {

const [error, setError] = useState(false);
const [data, setData] = useState([]);
const [fetching, setFetching] = useState(false);

    useEffect(()=>{
        const fetchData = async()=>{
            setFetching(true);
            try{
                const request = await client.get(url);
                const response = await request.data;
                setData(response);
            }
            catch(err){
                setError(false);
            }finally{
                setFetching(false);
            }
        }   
        fetchData()     
    }, [url])

  return { error, data, fetching } 
}

export default useFetch;