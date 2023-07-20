import React from 'react'
import { useEffect } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useState } from 'react';
import CommentItem from '../../components/posts/commentItem';

export default function ReportedComments() {
    const [reportedCom, setReportedCom] = useState([]);

    useEffect(() => {
        doApiReportedCom();
    }, [reportedCom])

    const doApiReportedCom = async () => {
        try {
            const url = API_URL + "/comments/reported";
            const data = await doApiGet(url);
            setReportedCom(data);
        } catch (error) {

        }
    }

    const confimComment = async (_idConfirm) => {
        try {
            if(window.confirm("consfim comment?")){
                const url = API_URL + "/comments/reportComment/"+_idConfirm + "/true";
                await doApiMethod(url,"PATCH");
            }
        } catch (error) {
            
        }
    }
    const deleteComment = async (_idDel) => {
        try {
            if(window.confirm("are you sure you want to delete this comment?")){
                const url = API_URL + "/comments/" + _idDel;
                await doApiMethod(url,"DELETE");
            }
        } catch (error) {
            
        }
    }


    return (
        <div className='container'>
            <h2 className='p-4'>Reported Comments</h2>
            {reportedCom.map(item => {
                return (
                    <div className='border border-dark p-5 mb-4' key={item._id} >
                        <div>date created : {(item.date_created).substring(0, 10)}</div>
                        <div>post ID : {(item.post_id).substring(0, 10)}</div>

                        <div className="bg-opacity-25 bg-danger col-auto p-1 ">
                        <CommentItem  key={item._id} comment={item} />
                        </div>
                        <button onClick={()=> {deleteComment(item._id)}} className='btn btn-danger mx-1 mt-2'>Delete comment</button>
                        <button onClick={()=>{confimComment(item._id)}} className='btn btn-success mx-1 mt-2'>Confirm comment</button>
                    </div>
                )
            })}
        </div>
    )
}
