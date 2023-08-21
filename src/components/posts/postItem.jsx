import React, { useEffect, useRef, useState } from 'react'
import "../../css/posts.css"
import { AiFillHeart, AiOutlinePushpin, AiOutlineComment, AiOutlineHeart, AiOutlineExclamationCircle } from "react-icons/ai";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import CommentsList from './commentsList';
import { useContext } from 'react';
import { MyContext } from '../../context/myContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from "moment";
import Dropdown from 'react-bootstrap/Dropdown';


export default function PostItem(props) {
    const item = props.item;
    const [likes, setLikes] = useState(item.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [userPostInfo, setUserPostInfo] = useState({});
    const [placeInfo, setPlaceInfo] = useState({});
    const [comments, setComments] = useState([]);
    const commentRef = useRef();
    const { userInfo } = useContext(MyContext);
    const nav = useNavigate();

    useEffect(() => {
        doApiUserInfo();
        getPlaceInfo();
        doApiComments(item._id);

    }, [])

    const doApiComments = async (_idPost) => {
        try {
            const url = API_URL + "/comments/" + _idPost;
            const data = await doApiGet(url);
            setComments(data);
        } catch (error) {
            console.log(error);
        }
    }

    const doApiUserInfo = async () => {
        try {
            if(item.user_id){
                const url = API_URL + "/users/userInfo/" + item.user_id;
                const data = await doApiGet(url);
                setUserPostInfo(data)
                if (likes?.includes(data?._id)) {
                    setIsLiked(true)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getPlaceInfo = async () => {
        if (item.place_url) {
            try {
                const url = API_URL + `/places/single/${item.place_url}`;
                const data = await doApiGet(url);
                setPlaceInfo(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const changeLike = async (_idPost) => {
        try {
            if (userInfo._id) {
                const url = API_URL + "/posts/changeLike/" + _idPost;
                await doApiMethod(url, "PATCH");
                getLikes();
                setIsLiked(!isLiked)
            }
            else {
                toast.warning("Log in to like posts")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getLikes = async () => {
        try {
            const url = API_URL + "/posts/single/" + item._id;
            const data = await doApiGet(url);
            setLikes(data.likes);
        } catch (error) {
            console.log(error);
        }
    }

    const addComment = async (_comment) => {
        try {
            if (userInfo._id) {
                if (commentRef.current.value != "") {
                    try {
                        const user_id = userInfo._id;
                        const text = commentRef.current.value;
                        const post_id = item._id;
                        const commentData = { user_id, text, post_id };
                        const url = API_URL + "/comments";
                        const data = await doApiMethod(url, "POST", commentData);
                        if (data._id) {
                            commentRef.current.value = "";
                            doApiComments(item._id)
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            } else {
                toast.warning("Login to comment")
            }
        } catch (error) {

        }
    }

    const onReportPost = async (_idPost) => {
            if (!item.report) {
                try {
                    const url = API_URL + "/posts/reportPost/" + _idPost + "/false";
                    await doApiMethod(url, "PATCH");

                } catch (error) {
                    console.log(error);
                }
        }
    }

    return (
        <div className='postItem m-0 p-3 p-lg-4 mt-4 row border border-dark border-opacity-10'>
            <div className='postInfo col-md-8 row m-0'>
                <div className={`row p-0 m-0 justify-content-between pb-4 ${item.place_url ? "align-items-center" : "align-items-start"}`}>
                    <div className={`p-0 m-0 d-flex col-lg-auto  me-auto ${item.place_url ? "col-12" : "col-6"}`}>
                        <div className='col-auto p-0 d-flex m-0 align-items-center'>
                            {userPostInfo.img_url ? <img src={userPostInfo.img_url} className='profile-pic' /> : <AccountCircle className='profile_icon' fontSize='large' />}
                        </div>
                        <div className='col-auto ps-2'>
                            <h5 className='small m-0 pt-1 '>{userPostInfo.nickname}</h5>
                            <h4 className='col-auto m-0'>{item.title}</h4>
                        </div>
                    </div>

                    <div className={`d-flex justify-content-lg-end  justify-content-between  pt-md-0 p-0 m-0 col-lg-5 ${item.place_url ? "col-12 pt-3 align-items-center" : "col-6"}`}>
                        <div className=' px-lg-4 col-md-auto'>
                            {item.place_url && <button onClick={() => {
                                nav(`/places/${placeInfo._id}`);
                            }} className=' col-auto locationBtn d-flex align-items-center p-2'> <AiOutlinePushpin className='h5 m-0' />{placeInfo.name}</button>}
                        </div>
                        <div className='col-md-auto row align-items-start  opacity-75 pe-3' style={{ fontSize: "0.8em" }}>
                            {moment(item.date_created).fromNow()}
                        </div>
                    </div>

                </div>
                <div className='row'>
                    {item.img_url && <img src={item.img_url} alt="place pic" className='m-1 col-md-5 postPic' />}
                    <div className='col-md-6 description'>{item.description}</div>
                </div>
                <div className='row align-items-end m-0 p-0'>
                    <div className='mt-auto m-0'>
                        <div className='float-end d-flex justify-content-between  align-items-center py-2' >
                            <div className='d-flex pe-2 ' >
                                <div className=''>
                                    <button onClick={() => { changeLike(item._id) }} className='btnIcon'>
                                        <span>
                                            {isLiked ? <AiFillHeart className=' h2 m-0 text-danger' /> : <AiOutlineHeart className='h2 m-0 ' />}
                                        </span>
                                    </button>
                                </div>
                                <span className='px-1 d-flex align-items-center'>{likes.length}</span>
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle variant=""  className='btnIcon' id="dropdown-basic">
                                <AiOutlineExclamationCircle className='h2 m-0' />                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => onReportPost(item._id)}>report this post</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

            <div className='postCommets col-md-4 text-center d-flex ps-3' style={{ flexDirection: "column" }}>
                <h5 className='text-center pb-2'>comments</h5>
                <div className='pb-3'> <CommentsList comments={comments} /></div>
                <div className='row align-items-end' style={{ flex: "1 1 0%" }}>
                    <div className='row col-12 align-items-center mt-auto ms-0' >
                        <div className='col-10 ' >
                            <textarea rows={1} onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                    addComment()
                                }
                            }} ref={commentRef} className=' postInputs input-group m-auto text-center' placeholder='Write your comment...' />
                        </div>
                        <button className=' col-2 btnIcon'>
                            <AiOutlineComment onClick={addComment} className='display-6' />
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}
