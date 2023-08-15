import React, { useEffect, useState } from 'react'
import "../../css/posts.css"
import { API_URL, doApiGet } from '../../services/apiService';
import CommentItem from './commentItem';

export default function CommentsList({comments}) {
    return (
        <div className='py-3' style={{ overflowY: 'auto', overflowX: 'hidden' , maxHeight:"280px" }}>
            {comments.map((item, i) => {
                return (
                    <CommentItem className="col-auto" comment={item} key={item._id} />
                )
            })
            }
        </div>
    )
}
