import React, { useEffect, useRef, useState } from 'react'
import PostItem from './posts/postItem'
import { API_URL, doApiGet } from '../services/apiService';
import { IoSearchOutline, IoArrowForwardSharp , IoSwapVerticalSharp} from "react-icons/io5"
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function PostsList() {
    const [postsAr, setPostsAr] = useState([]);
    const [query] = useSearchParams();
    const inputRf = useRef();
    const nav = useNavigate();

    useEffect(() => {
        const searchQ = query.get("s") || "";
        doApi(searchQ);
    }, [query])

    const doApi = async (_search) => {
        try {
            const url = API_URL + "/posts?s=" + _search;
            const data = await doApiGet(url);
            setPostsAr(data);
        } catch (error) {
            console.log(error);
            alert("there is a problem, try again later")
        }
    }
    const onSearchClick = () => {
        nav("?s=" + inputRf.current.value);

    }
    const onInputEnter = (e) => {
        if (e.key == "Enter") {
            nav("?s=" + inputRf.current.value);
        }
    }
    return (
        <div className='container-fluid'>
            <div className="px-5">
                <Link to={"add"}>Add new post</Link>
                <div className='row justify-content-between  align-items-center'>
                    <div  className='col-2 border'>
                    <button className='postInputs'>new <IoArrowForwardSharp />  old  <IoSwapVerticalSharp className='h4 mx-2 my-0'/></button>
                    </div>
                    <div className='d-flex justify-content-end py-4 border col-6'>
                        <input onKeyDown={(e) => { onInputEnter(e) }} ref={inputRf} placeholder='Search by title...' className='postInputs input-group' />
                        <button onClick={onSearchClick} className='searchBtn'><IoSearchOutline className='search_icon' /></button>
                    </div>
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
