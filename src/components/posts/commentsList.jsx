import React, { useEffect, useState } from 'react'
import "../../css/posts.css"
import { API_URL, doApiGet } from '../../services/apiService';
import CommentItem from './commentItem';

export default function CommentsList(props) {
    const [comments, setComments] = useState([]);
    const postId = props.postId;

    useEffect(() => {
        doApiComments(postId);
    }, [comments])

    const doApiComments = async (_idPost) => {
        const url = API_URL + "/comments/" + _idPost;
        const data = await doApiGet(url);
        setComments(data);
    }

    return (
        <div  className='ps-3'
        style={{ overflowY: 'auto', overflowX: 'hidden' , height:"150px" }}>
            {comments.map((item, i) => {
                return (
                    <CommentItem comment={item} key={item._id} />
                )
            })
            }
        </div>
    )
}
