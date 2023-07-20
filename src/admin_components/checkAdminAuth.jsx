import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { API_URL, TOKEN_KEY, doApiGet } from '../services/apiService';

export default function CheckAdminAuth() {
    const nav = useNavigate();

    useEffect(() => {
        doApi();
    },[])

    const doApi = async()=>{
        try {
            const url = API_URL + "/users/checkToken";
            const data = await doApiGet(url);
            if(data.role != "admin"){
                alert("Acceess to ADMIN only");
                localStorage.removeItem(TOKEN_KEY);
                nav("/admin")
            }
            
        } catch (error) {
         alert("there is a problem, try to login again");
         nav("/admin");
         localStorage.removeItem(TOKEN_KEY);
        }
    }


  return (
<></>
    )
}
