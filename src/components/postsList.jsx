import React, { useEffect, useRef, useState } from 'react'
import PostItem from './posts/postItem'
import { API_URL, doApiGet } from '../services/apiService';
import { IoSearchOutline } from "react-icons/io5"
import { Link } from 'react-router-dom';

export default function PostsList() {
    const [postsAr, setPostsAr] = useState([]);
    const inputRf = useRef();

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        try {
            const url = API_URL + "/posts";
            const data = await doApiGet(url);
            setPostsAr(data);
        } catch (error) {
            console.log(error);
            alert("there is a problem, try again later")
        }
    }

    return (
        <div className='container-fluid'>
            <div className="px-5">
                <Link to={"add"}>Add new post</Link>
                <div className='d-flex justify-content-end py-4'>
                    <input ref={inputRf} placeholder='Search by name or description...' className='searchInput input-group' />
                    <button className='searchBtn'><IoSearchOutline className='search_icon' /></button>
                </div>
            </div>
            <div className='container'>
                {postsAr.map(item => {
                    return (
                        <PostItem key={item._id} item={item} />
                    )
                })}
            </div>
        </div>

    )
}
