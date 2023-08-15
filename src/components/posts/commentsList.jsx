import React, { useEffect, useState } from 'react'
import "../../css/posts.css"
import { API_URL, doApiGet } from '../../services/apiService';
import CommentItem from './commentItem';

export default function CommentsList(props) {
    const [comments, setComments] = useState([]);
    const postId = props.postId;

    // find a way to do this without the loop
    useEffect(() => {
        doApiComments(postId);
    }, [comments])

    const doApiComments = async (_idPost) => {
        try {
            const url = API_URL + "/comments/" + _idPost;
            const data = await doApiGet(url);
            setComments(data);
        } catch (error) {
            console.log(error);
        }
    }

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
