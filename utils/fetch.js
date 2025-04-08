"use client"

import { useState } from "react";


export const fetchData= async ({url,options})=>
{
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [data,setData] = useState(false);


    try{

        const response = await fetch(url,options)
        const data= await response.json();

        if(!response.ok)
        {
            setError(data);
        }
        else{
            setData(data)
        }


    }catch(error)
    {
        console.error("Error fetching data:",error)

    }finally{
        setLoading(true);

    }

    return{data,loading,error}
}