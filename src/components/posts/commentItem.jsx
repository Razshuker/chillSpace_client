import React from 'react'
import "../../css/posts.css"
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function CommentItem() {
    return (
            <div className='comment row border'>
                <div className='col-1  profile-pic-comment d-flex'>
                    <AccountCircle fontSize='large' />
                </div>
                <div className='col-10 text-start'>
                <div className='small'>Nickname</div>
                <div className='col-auto'>Lorem ipsum dolor sit amett.</div>
                </div>
            </div>
    )
}
