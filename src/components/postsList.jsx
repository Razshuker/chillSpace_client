import React, { useEffect, useState } from 'react'
import PostItem from './posts/postItem'
import { API_URL, doApiGet } from '../services/apiService';

export default function PostsList() {
    const [postsAr,setPostsAr] = useState([]);

    useEffect(()=>{
        doApi();
    },[])

    const doApi = async()=>{
        const url = API_URL + "/posts";
        const data = await doApiGet(url);
        setPostsAr(data);
    }
  return (

    <div className='container-fluid p-md-5'>
        <div className='container'>
        {postsAr.map(item=> {
            return(
                <PostItem key={item._id} item={item}/>
            )
        })}
        </div>
    </div>

  )
}
