import React, { useEffect, useState } from 'react'
import "../../css/posts.css"
import { Link } from 'react-router-dom'
import { AiFillLike, AiOutlinePushpin } from "react-icons/ai";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';

// not finished

export default function PostItem(props) {
    const item = props.item;
    const [likes,setLikes] = useState(item.likes.length);

    const getTimePassed = (date) => {
        const now = new Date().getTime();
        const pastDate = new Date(date).getTime();
        const timeDiff = now - pastDate;


        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years >= 1) {
            return `${years}y ago`;
        } else if (months >= 1) {
            return `${months}m ago`;
        } else if (days >= 1) {
            return `${days}d ago`;
        } else if (hours >= 1) {
            return `${hours}h ago`;
        } else if (minutes >= 1) {
            return `${minutes}m ago`;
        }
        return `${seconds}s ago`;
    }
    const changeLike = async (_idPost) => {
        try {
            const url = API_URL + "/posts/changeLike/" + _idPost;
            await doApiMethod(url,"PATCH");
            getLikes();
        } catch (error) {
            console.log(error);
        }
    }
// might not be necesery , right now i could'nt find another way to render the likes to the client
    const getLikes = async()=>{
        try {
            const url = API_URL + "/posts/single/"+item._id;
            const data = await doApiGet(url);
            console.log((data.likes).length);
            setLikes((data.likes).length)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='postItem border p-4  mt-4 row '>
            <div className='postInfo col-md-7 '>
                <div className='row align-items-center justify-content-between'>
                    <div className='col-6'>
                        <div className='row p-2'>
                            <div className='col-4 profile-pic p-0'>
                                <AccountCircle className='profile_icon' fontSize='large' />
                            </div>
                            <div className='col-6'>
                                <h3>Nickname</h3>
                                <h5 className=''>{item.title}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className=' col-auto '>{getTimePassed(item.date_created)}</div>
                        <div className='col-auto p-1'> <AiOutlinePushpin className='h5' />location</div>
                    </div>
                </div>

                <div className='row'>
                    <div className='m-1 col-md-5 postPic'>picture</div>
                    <div className='col-md-6'>{item.description}</div>
                </div>
                <div className='float-end'>
                    <button onClick={() => {changeLike(item._id)}} className='btnLike'><AiFillLike className=' h3' /></button>
                    <span className='p-1'>{likes}</span>
                </div>
            </div>

            <div className='col-md-5 text-center'>
                <h5 className='text-center'>comments</h5>
                <div className='comment row border'>
                    <div className='col-2  profile-pic-comment'>
                        <AccountCircle fontSize='large' />
                    </div>
                    <div className='col-9 d-flex align-items-center'>
                        your comment
                    </div>
                </div>
                <div className='comment row border'>
                    <div className='col-2  profile-pic-comment'>
                        <AccountCircle fontSize='large' />
                    </div>
                    <div className='col-9 d-flex align-items-center'>
                        your comment
                    </div>
                </div>
                <div className='comment row border'>
                    <div className='col-2  profile-pic-comment'>
                        <AccountCircle fontSize='large' />
                    </div>
                    <div className='col-9 d-flex align-items-center'>
                        your comment
                    </div>
                </div>

                <div className='p-2'>
                    <Link to={"#"}>more comments</Link>
                    <br />
                    <button className='btn btn-light mt-4'>Write your comment...</button>
                </div>
            </div>

        </div>


    )
}
