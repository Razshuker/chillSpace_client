import React, { useEffect, useState } from 'react'
import '../../css/posts.css'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

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

    const  onReportComment = async(_idComment) => {
        if(window.confirm("Are you sure you want to report this post?")){
                if(!comment.report){
                    try {
                      const url = API_URL + "/comments/reportComment/"+_idComment+"/false";
                      await doApiMethod(url,"PATCH");

                    } catch (error) {
                        console.log(error);
                    }
                }
        }
    }

    return (
        <div className='comment row m-0' key={comment._id}>
            <div className='col-1 d-flex p-0'>
                {userInfo.img_url ? <img src={userInfo.img_url} className='profile-pic-comment' /> : <AccountCircle fontSize='large' />}
            </div>
            <div className='col-9 text-start ps-4'>
                <p className='small m-0'><strong>{userInfo.nickname}</strong></p>
                <p className='col-auto mt-1 mb-0'>{comment.text}</p>
            </div>
            <div className='justify-content-end d-flex p-0 col-1 '>
                <button  onClick={()=> onReportComment(comment._id)} className='btnIcon'> <AiOutlineExclamationCircle /> </button>
            </div>
        </div>)
}
