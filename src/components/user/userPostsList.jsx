import React, { useContext, useEffect, useRef, useState } from 'react'
import '../../css/posts.css'
import PostItem from '../posts/postItem'
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';
import { IoSearchOutline, IoArrowForwardSharp, IoSwapVerticalSharp } from "react-icons/io5"
import { BsPostcardHeart } from "react-icons/bs"
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PostsLoading from '../posts/postsLoading';
import { toast } from 'react-toastify';
import { MyContext } from '../../context/myContext';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { Dropdown } from 'react-bootstrap';

export default function UserPostsList() {
    const [postsAr, setPostsAr] = useState([]);
    const [reverse, setReverse] = useState(false);
    const [query] = useSearchParams();
    const { userInfo } = useContext(MyContext);
    const inputRf = useRef();
    const nav = useNavigate();

    useEffect(() => {
        getPosts();
    }, [reverse, postsAr])

    const getPosts = async () => {
        try {
            let url = API_URL + "/posts?userId=" + userInfo._id;
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

    const deletePost = async (_idDel) => {
        try {
            const url = API_URL + "/posts/" + _idDel;
            await doApiMethod(url, "DELETE");
        } catch (error) {
            console.log(error);
            toast.error("There is a problem, please try again later");
        }
    }

    return (
        <div className='container-fluid pb-5'>
            <div className="px-5 mt-5">
                <Link to={"/posts/add"} className='addBtn-posts'>
                    <div className="d-flex align-items-center justify-content-center">
                        <BsPostcardHeart className='iconAdd' />
                        <p className='m-0 ps-2'>Add new post</p>
                    </div>
                </Link>
                <div className='row justify-content-between  align-items-center'>
                    <div className='col-md-2'>
                        {reverse == false ?
                            <button className='postInputs' onClick={onSortClick}  >new <IoArrowForwardSharp />  old  <IoSwapVerticalSharp className='h4 mx-2 my-0' /></button>
                            :
                            <button className='postInputs' onClick={onSortClick}  >old <IoArrowForwardSharp />  new  <IoSwapVerticalSharp className='h4 mx-2 my-0' /></button>
                        }
                    </div>
                </div>
            </div>
            <div className='container'>
                <h2 className='text-center nameTitle'>{userInfo.full_name}'s posts:</h2>
                {postsAr.length == 0 ?
                    <div>
                        <PostsLoading />
                        <PostsLoading />
                    </div>
                    :
                    postsAr.map(item => {
                        return (
                            <div key={item._id}>
                                <div className='pb-3' >
                                    <PostItem key={item._id} item={item} />
                                </div>
                                <div className=' d-flex align-items-center justify-content-end'>
                                    <CiEdit role='button' onClick={() => {
                                        nav("edit/" + item._id);
                                    }} className='h3' />
                                    <Dropdown>
                                        <Dropdown.Toggle variant="" id="dropdown-basic">
                                            <AiOutlineDelete role='button' className='h3 text-danger' />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { deletePost(item._id) }}>delete this post</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <hr />
                                <br />
                            </div>
                        )
                    })
                }
            </div>
        </div>


    )
}
