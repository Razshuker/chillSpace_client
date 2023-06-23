import React, { useEffect, useState } from 'react'
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
        <div className='comment row border' key={comment._id}>
            <div className='col-1  profile-pic-comment d-flex'>
                <AccountCircle fontSize='large' />
            </div>
            <div className='col-10 text-start'>
                <div className='small'>{userInfo.nickname}</div>
                <div className='col-auto'>{comment.text}</div>
            </div>
        </div>)
}
