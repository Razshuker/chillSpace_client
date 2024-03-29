import React, { useContext, useEffect, useRef, useState } from 'react'
import '../../css/posts.css'
import PostItem from '../posts/postItem'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { IoArrowForwardSharp, IoSwapVerticalSharp } from "react-icons/io5"
import { BsPostcardHeart } from "react-icons/bs"
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PostsLoading from '../posts/postsLoading';
import { toast } from 'react-toastify';
import { MyContext } from '../../context/myContext';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { Dropdown } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function UserPostsList() {
    const [postsAr, setPostsAr] = useState([]);
    const [reverse, setReverse] = useState(false);
    const [query] = useSearchParams();
    const [noMorePosts, setNoMorePosts] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo } = useContext(MyContext);
    const nav = useNavigate();
    const [displayLimit, setDisplayLimit] = useState(5); // Set the initial limit here
    const [postsCount, setPostsCount] = useState();
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (userInfo._id) {
            count();
        }
    }, [query])

    useEffect(() => {
        if (displayLimit >= postsCount) {
            setNoMorePosts(true);
        }
    }, [displayLimit])

    useEffect(() => {
        getPosts();
    }, [reverse, userInfo._id, postsAr.length])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const count = async () => {
        try {
            let url = API_URL + "/posts/count?user=" + userInfo._id;
            const data = await doApiGet(url);
            setPostsCount(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getPosts = async () => {
        try {
            setIsLoading(true);
            if (userInfo._id) {
                let url = API_URL + "/posts?perPage=0&user=" + userInfo._id;
                if (reverse) {
                    url += `&reverse=yes`;
                }
                const data = await doApiGet(url);
                setIsLoading(false);
                if (data.length == 0) {
                    setNoMorePosts(true);
                }
                postsAr.splice(0, Infinity);
                setPostsAr(data);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error("there is a problem, try again later")
        }
    }

    const onSortClick = () => {
        setReverse(!reverse);
    }

    const deletePost = async (_idDel) => {
        try {
            setIsLoading(true);
            const url = API_URL + "/posts/" + _idDel;
            const data = await doApiMethod(url, "DELETE");
            if (data.deletedCount) {
                getPosts();
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("There is a problem, please try again later");
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

    return (

        <div className='myPosts container-fluid pt-5 pb-5'>

            <h4 className='text-center nameTitle'>{userInfo.full_name}'s posts:</h4>
            <div className="px-5 mt-lg-3">
                <Link to={"/posts/add"} className='addBtn-posts'>
                    <div className="d-flex align-items-center justify-content-center">
                        <BsPostcardHeart className='iconAdd' />
                        <p className='m-0 ps-2'>Add new post</p>
                    </div>
                </Link>
                <div className='row justify-content-between  align-items-center'>
                    <div className='col-auto'>
                        {reverse == false ?
                            <button className='postInputs' onClick={onSortClick}  >new <IoArrowForwardSharp />  old  <IoSwapVerticalSharp className='h4 mx-2 my-0' /></button>
                            :
                            <button className='postInputs' onClick={onSortClick}  >old <IoArrowForwardSharp />  new  <IoSwapVerticalSharp className='h4 mx-2 my-0' /></button>
                        }
                    </div>
                </div>
            </div>
            <div className='container'>
                {isLoading && postsAr.length == 0 ?
                    <div>
                        <PostsLoading />
                        <PostsLoading />
                    </div>
                    :
                    <InfiniteScroll style={{ overflowX: "hidden" }}
                        dataLength={displayedPosts.length}
                        next={fetchPosts}
                        hasMore={!noMorePosts && !isLoading}
                        loader={<PostsLoading />}
                    >
                        {postsAr.length === 0 && !isLoading ? (
                            <h2 className='row justify-content-center align-items-center display-5' style={{ height: 300 }}>No results found.</h2>
                        ) : (
                            displayedPosts.map(item => {
                                return (
                                    <div key={item._id}>
                                        <div className='pb-3' >
                                            <PostItem key={item._id} item={item} />
                                        </div>
                                        <div className=' d-flex align-items-center justify-content-end'>
                                            <CiEdit role='button' onClick={() => {
                                                nav("edit/" + item._id);
                                            }} className='h3' />
                                            {/* <Dropdown>
                                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                                    <AiOutlineDelete role='button' className='h3 text-danger' />
                                                </Dropdown.Toggle> */}
                                            <Button variant="outlined" onClick={handleClickOpen} className='btnIcon'>
                                                <AiOutlineDelete role='button' className='h3 text-danger' />
                                            </Button>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Delete post"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Are you sure you want to delete this post?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose} className='text-dark'>Disagree</Button>
                                                    <Button onClick={() => {
                                                        handleClose();
                                                        deletePost(item._id);
                                                    }} autoFocus>
                                                        Agree
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                            {/* <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => { deletePost(item._id) }}>delete this post</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown> */}
                                        </div>
                                        <hr />
                                        <br />
                                    </div>
                                )
                            })
                        )}
                    </InfiniteScroll>
                }
            </div>
        </div>


    )
}
