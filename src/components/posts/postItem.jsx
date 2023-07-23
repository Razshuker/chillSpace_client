import React, { useEffect, useRef, useState } from 'react'
import "../../css/posts.css"
import { AiFillHeart, AiOutlinePushpin, AiOutlineComment, AiOutlineHeart, AiOutlineExclamationCircle } from "react-icons/ai";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import CommentsList from './commentsList';
import { useContext } from 'react';
import { MyContext } from '../../context/myContext';
import TimeDiff from './timeDiff';

export default function PostItem(props) {
    const item = props.item;
    const [likes, setLikes] = useState(item.likes);
    const [isLiked, setIsLiked] = useState(true);
    const [userPostInfo, setUserPostInfo] = useState({});
    const commentRef = useRef();
    const { userInfo } = useContext(MyContext);


    useEffect(() => {
        doApiUserInfo();
        if (likes.includes(userInfo._id)) {
            setIsLiked(false)
        }
    }, [])

    const doApiUserInfo = async () => {
        const url = API_URL + "/users/userInfo/" + item.user_id;
        const data = await doApiGet(url);
        setUserPostInfo(data)
    }

    const changeLike = async (_idPost) => {
        try {
            if (userInfo._id) {
                const url = API_URL + "/posts/changeLike/" + _idPost;
                const data = await doApiMethod(url, "PATCH");
                getLikes();
                setIsLiked(!data.isAdded)
            }
            else {
                alert("Log in to like posts")
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
                    const user_id = userInfo._id;
                    const text = commentRef.current.value;
                    const post_id = item._id;
                    const commentData = { user_id, text, post_id };
                    const url = API_URL + "/comments";
                    const data = await doApiMethod(url, "POST", commentData);
                    if (data._id) {
                        commentRef.current.value = "";
                    }
                }
            } else {
                alert("Login to comment")
            }
        } catch (error) {

        }
    }

    const  onReportPost = async(_idPost) => {
        if(window.confirm("Are you sure you want to report this post?")){
                if(!item.report){
                    try {
                      const url = API_URL + "/posts/reportPost/"+_idPost+"/false";
                      await doApiMethod(url,"PATCH");

                    } catch (error) {
                        console.log(error);
                    }
                }
        }
    }

    return (
        <div className='postItem border p-3  mt-4 row '>
            <div className='postInfo col-md-7 '>
                <div className='row align-items-center justify-content-between pb-4'>
                    <div className='col-9'>
                        <div className='row'>
                            <div className='col-2 p-0 d-flex align-items-center'>
                                {userPostInfo.img_url ? <img src={userPostInfo.img_url} className='profile-pic' /> : <AccountCircle className='profile_icon' fontSize='large' />}
                            </div>
                            <div className='col-9 ms-3'>
                                <h5>{userPostInfo.nickname}</h5>
                                <h4 className='col-auto'>{item.title}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                    <div  className='justify-content-end d-flex h4 '>
                       <button onClick={()=> onReportPost(item._id)} className='btnIcon'> <AiOutlineExclamationCircle/> </button>
                        </div>
                       <TimeDiff data={(item.date_created)} className='col-auto'/>
                        {/* {item.location && <div className='col-auto p-1'> <AiOutlinePushpin className='h5' />location</div>} */}
                        <div className='col-auto p-1'> <AiOutlinePushpin className='h5' />location</div>
                    </div>
                </div>

                <div className='row'>
                    {item.img_url && <img src={item.img_url} alt="place pic" className='m-1 col-md-5 postPic' />}
                    <div className='col-md-6'>{item.description}</div>
                </div>
                <div className='float-end'>
                    <button onClick={() => { changeLike(item._id) }} className='btnIcon'>
                        {!isLiked ? <AiFillHeart className=' h2 text-danger' /> : <AiOutlineHeart className='h2' />}
                    </button>
                    <span className='p-1'>{likes.length}</span>
                </div>
            </div>

            <div className='col-md-5 text-center'>
                <h5 className='text-center'>comments</h5>
                <CommentsList postId={item._id} />
                <div className='p-2'>
                    <div className='row col-auto pt-4 align-items-center'>
                        <div className='col-10 '>
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
