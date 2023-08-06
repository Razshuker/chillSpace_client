import React, { useEffect, useRef, useState } from 'react'
import '../css/posts.css'
import PostItem from './posts/postItem'
import { API_URL, TOKEN_KEY, doApiGet } from '../services/apiService';
import { IoSearchOutline, IoArrowForwardSharp, IoSwapVerticalSharp } from "react-icons/io5"
import { BsPostcardHeart } from "react-icons/bs"
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PostsLoading from './posts/postsLoading';
import { toast } from 'react-toastify';

export default function PostsList() {
    const [postsAr, setPostsAr] = useState([]);
    const [reverse, setReverse] = useState(false);
    const [query] = useSearchParams();
    const inputRf = useRef();
    const nav = useNavigate();

    useEffect(() => {
        const searchQ = query.get("s") || "";
        getPosts(searchQ);
    }, [query, reverse])
// for finding posts by the places id
    const getPlaceId = async (_name) => {
        try {
            const url = API_URL + "/places/placeId/" + _name;
            const data = await doApiGet(url);
            // console.log(data);
            return data;
        } catch (error) {
            
        }
    }

    const getPosts = async (_search) => {
        try {
            // const id = await getPlaceId(_search)
            let url = API_URL + "/posts?s=" + _search;
            // let url = API_URL + "/posts?s=" + id;
            if (reverse) {
                url += `&reverse=yes`;
            }
            const data = await doApiGet(url);
            setPostsAr(data);
        } catch (error) {
            console.log(error);
            toast.error("there is a problem, try again later")
        }
    }

    const onSortClick = () => {
        setReverse(!reverse);
    }

    return (
        <div className='container-fluid pb-5'>
            <div className='container'>
            <div className="px-3">
                {localStorage[TOKEN_KEY] && <Link to={"add"} className='addBtn-posts'>
                    <div className="d-flex align-items-center justify-content-center">
                        <BsPostcardHeart className='iconAdd' />
                        <p className='m-0 ps-2'>Add new post</p>
                    </div>
                </Link>}
                <div className='row justify-content-between align-items-center'>
                    <div className='col-auto pt-4  d-flex align-items-center'>
                        {reverse == false ?
                            <button className='postInputs' onClick={onSortClick}  >new <IoArrowForwardSharp />  old  <IoSwapVerticalSharp className='h4 mx-2 my-0' /></button>
                            :
                            <button className='postInputs' onClick={onSortClick}  >old <IoArrowForwardSharp />  new  <IoSwapVerticalSharp className='h4 mx-2 my-0' /></button>
                        }
                    </div>
                    <div className='d-flex justify-content-end pt-4 col-md-6 '>
                        <input onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                nav("?s=" + inputRf.current.value);
                            }
                        }} ref={inputRf} placeholder='Search by title...' className='postInputs input-group' />
                        <button onClick={() => {
                            nav("?s=" + inputRf.current.value);
                        }} className='searchBtn'><IoSearchOutline className='search_icon' /></button>
                    </div>
                </div>
            </div>
            <div className=''>
                {postsAr.length == 0 ?
                    <>
                        <PostsLoading />
                        <PostsLoading />
                    </>
                    :
                    postsAr.map(item => {
                        return (
                            <PostItem key={item._id} item={item} />
                        )
                    })

                }
            </div>
            </div>
        </div>


    )
}
