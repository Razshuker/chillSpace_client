import React, { useEffect, useState } from 'react'
import '../../css/posts.css'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { API_URL, doApiGet } from '../../services/apiService';

export default function CommentItem(props) {
    const comment = props.comment;
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        doApiUserInfo(comment.user_id);
    }, [])


    const doApiUserInfo = async (_idUser) => {
        const url = API_URL + "/users/userInfo/" + _idUser;
        const data = await doApiGet(url);
        setUserInfo(data);
    }


    return (
        <div className='comment row' key={comment._id}>
            <div className='col-1 d-flex'>
                {userInfo.img_url ? <img src={userInfo.img_url} className='profile-pic-comment' /> : <AccountCircle fontSize='large' />}
            </div>
            <div className='col-10 text-start ms-2'>
                <p className='small m-0'><strong>{userInfo.nickname}</strong></p>
                <p className='col-auto mt-1 mb-0'>{comment.text}</p>
            </div>
        </div>)
}
