import React from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService'
import { useEffect } from 'react';
import { useState } from 'react';
import PostItem from '../../components/posts/postItem';
import { toast } from 'react-toastify';

export default function ReportedPosts() {
    const [reportedPosts, setReportedPosts] = useState([]);

    useEffect(() => {
        doApiReportedPosts();
    }, [reportedPosts])

    const doApiReportedPosts = async () => {
        try {
            const url = API_URL + "/posts/reported";
            const data = await doApiGet(url);
            setReportedPosts(data);
        } catch (error) {
            console.log(error);
            toast.error("There is a problem, please try again later");
        }
    }

    const confirmPost = async (_idConfirm) => {
        try {
            if (window.confirm("confirm post?")) {
                const url = API_URL + "/posts/reportPost/" + _idConfirm + "/true";
                const data = await doApiMethod(url, "PATCH");
                if (data.modifiedCount) {
                    toast.success("post confirmed")
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("There is a problem, please try again later");
        }
    }
    const deletePost = async (_idDel) => {
        try {
            if (window.confirm("are you sure you want to delete this post?")) {
                const url = API_URL + "/posts/" + _idDel;
                await doApiMethod(url, "DELETE");
            }
        } catch (error) {
            console.log(error);
            toast.error("There is a problem, please try again later");
        }
    }

    return (
        <div className='container'>
            <h2 className='p-4'>Reported Posts</h2>
            {reportedPosts.map(item => {
                return (
                    <div className='border border-dark p-1 p-md-5 mb-4' key={item._id} >
                        <div>date created : {(item.date_created).substring(0, 10)}</div>
                        <PostItem key={item._id} item={item} />
                        <button onClick={() => { deletePost(item._id) }} className='btn btn-danger mx-1 mt-2'>Delete post</button>
                        <button onClick={() => { confirmPost(item._id) }} className='btn btn-success mx-1 mt-2'>Confirm post</button>
                    </div>
                )
            })}
        </div>
    )
}
