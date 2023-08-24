import React, { useEffect, useRef, useState } from 'react'
import '../css/posts.css'
import PostItem from './posts/postItem'
import { API_URL, TOKEN_KEY, doApiGet } from '../services/apiService';
import { IoSearchOutline, IoArrowForwardSharp, IoSwapVerticalSharp } from "react-icons/io5"
import { BsPostcardHeart } from "react-icons/bs"
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PostsLoading from './posts/postsLoading';
import { toast } from 'react-toastify';
import SearchUserPosts from './posts/searchUserPosts';
import SearchPlacePosts from './posts/searchPlacePosts';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './loading';
import zIndex from '@mui/material/styles/zIndex';
import { AiOutlineSearch } from 'react-icons/ai';


export default function PostsList() {
    const [postsAr, setPostsAr] = useState([]);
    const [reverse, setReverse] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [select, setSelected] = useState("place");
    const [noMorePosts, setNoMorePosts] = useState(false);
    const [query] = useSearchParams();
    const nav = useNavigate();
    const inputRf = useRef();
    const [displayLimit, setDisplayLimit] = useState(5); // Set the initial limit here
    const [postsCount, setPostsCount] = useState();

    useEffect(() => {
        count();
    }, [query])

    useEffect(() => {
        if (displayLimit >= postsCount) {
            setNoMorePosts(true);
        }
    }, [displayLimit])


    useEffect(() => {
        // const searchQ = query.get("s") || "";
        getPosts();
    }, [query, reverse])

    const count = async () => {
        try {
            let url = API_URL + "/posts/count";
            if (query.get("s")) {
                url += "?s=" + query.get("s")
            }
            else if (query.get("place")) {
                const id = await getPlaceId(query.get("place"));
                url += "?place=" + id;
            }
            else if (query.get("user")) {
                url += "?user=" + query.get("user")
            }
            const data = await doApiGet(url);
            console.log(data);
            setPostsCount(data);
        } catch (error) {
            console.log(error);
        }
    }

    // for finding posts by the places id
    const getPlaceId = async (_name) => {
        try {
            const url = API_URL + "/places/placeId/" + _name;
            const data = await doApiGet(url);
            return data;
        } catch (error) {
        }
    }


    const getPosts = async () => {
        try {
            setIsLoading(true);
            let url = API_URL + "/posts?perPage=0";
            if (query.get("s")) {
                url += "&s=" + query.get("s")
            }
            else if (query.get("place")) {
                const id = await getPlaceId(query.get("place"));
                url += "&place=" + id;
            }
            else if (query.get("user")) {
                url += "&user=" + query.get("user")
            }
            if (reverse) {
                // const mark = url.includes("?");
                // mark ? url += `&` : url += `?`;
                url += "&reverse=yes"
            }
            const data = await doApiGet(url);
            setPostsAr(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("there is a problem, try again later")
            setIsLoading(false)
        }
    }

    const fetchPosts = () => {
        // Simulating a fake async API call that sends
        // 20 more records in 1.5 seconds
        setTimeout(() => {
            setDisplayLimit(prevLimit => prevLimit + 5); // Adjust the increment as needed
        }, 1500);
    };

    const displayedPosts = postsAr.slice(0, displayLimit); // Limit the displayed places


    const onSortClick = () => {
        setReverse(!reverse);
    }

    const handleOnSearch = (item) => {
        nav("?s=" + item)
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
                    <div className='row justify-content-between p-0 align-items-center pt-4 '>
                        <div className='col-auto p-0 d-flex align-items-center'>
                            {reverse == false ?
                                <button className='postInputs' onClick={onSortClick}  >old <IoArrowForwardSharp />  new  <IoSwapVerticalSharp className='h4 mx-2 my-0' /></button>
                                :
                                <button className='postInputs' onClick={onSortClick}  >new <IoArrowForwardSharp />  old  <IoSwapVerticalSharp className='h4 mx-2 my-0' /></button>
                            }
                        </div>
                        <div style={{ zIndex: 1 }} className='row px-0 py-2 pt-3 pt-lg-0 justify-content-between align-items-center m-0 col-lg-8 '>
                            <div className=' p-0 col-3'>
                                <select
                                    className="form-select py-2"
                                    aria-label="Default select example"
                                    onChange={(e) => setSelected(e.target.value)}
                                    value={select}
                                >
                                    <option disabled>Search by..</option>
                                    <option value="place">Place</option>
                                    <option value="user">User</option>
                                    <option value="title">Title</option>
                                </select>
                            </div>
                            {select == "place" && <div className='col-9 '><SearchPlacePosts /></div>}
                            {select == "user" && <div className='col-9'><SearchUserPosts /></div>}
                            {select == "title" && <div className='col-9'>
                                <div className="searchTitleParent form-group">
                                    <div className="searchTitleD ">
                                        <AiOutlineSearch role='button' className="searchTitleI e m-0 h5 translate-middle-y pl-3" onClick={() => { nav("?s=" + inputRf.current.value) }} />
                                        <input onKeyDown={(e) => {
                                            if (e.key == "Enter") {
                                                nav("?s=" + inputRf.current.value);


                                            }
                                        }} ref={inputRf}
                                            className="serchTitleInput form-control px-5 pl-10 border rounded-md focus:ring focus:border-black"
                                            placeholder='Search by title..'
                                        />

                                        <button onClick={() => {
                                            nav("/posts")
                                            inputRf.current.value = ""
                                        }} className='btn btn-close'></button>
                                    </div>
                                </div>
                            </div>}

                        </div>
                    </div>
                </div>
                <div>
                    {isLoading ? (
                        <div>
                            <PostsLoading />
                            <PostsLoading />
                        </div>
                    ) : (
                        <InfiniteScroll
                            dataLength={displayedPosts.length}
                            next={fetchPosts}
                            hasMore={!noMorePosts && !isLoading}
                            loader={<Loading />}
                        >
                            <div>
                                {displayedPosts.length === 0 && !isLoading ? (
                                    <h2 className='row justify-content-center align-items-center display-5' style={{ height: 300 }}>No results found.</h2>
                                ) : (

                                    displayedPosts.map(item => (
                                        <PostItem key={item._id} item={item} />
                                    ))
                                )
                                }
                            </div>
                        </InfiniteScroll>
                    )}
                </div>

            </div>
        </div>


    )
}
