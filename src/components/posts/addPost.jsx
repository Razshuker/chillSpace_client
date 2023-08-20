import React, { useEffect, useRef, useState } from 'react'
import "../../css/posts.css"
import { AiFillHeart, AiOutlinePushpin, AiOutlineComment, AiOutlineHeart, AiOutlineExclamationCircle } from "react-icons/ai";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useContext } from 'react';
import { MyContext } from '../../context/myContext';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function AddPost(props) {
    const { userInfo } = useContext(MyContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [placesList, setPlacesList] = useState([]);
    const fileRef = useRef();
    const { uploadImage } = useContext(MyContext);
    const nav = useNavigate();


    useEffect(() => {
        console.log(fileRef);

        getPlacesNames();
    }, [])

    const getPlacesNames = async () => {
        try {
            const url = API_URL + "/places?perPage=0";
            const data = await doApiGet(url);
            setPlacesList(data);
        } catch (error) {
            console.log(error);
        }
    }

    const onSub = async (_data) => {
        try {
            if (fileRef.current.files.length > 0) {
                _data.img_url = await uploadImage(fileRef);
            } else {
                _data.img_url = "";
            } _data.user_id = userInfo._id;
            console.log(_data);
            const url = API_URL + "/posts";
            const data = await doApiMethod(url, "POST", _data);
            if (data._id) {
                nav("/posts");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="newPost container-fluid">
            <h2 className='newPostH2'>Add your post</h2>
            {placesList.length > 0 &&
                <div className="container">
                    <div className='postItem border p-3  mt-4 row '>
                        <form onSubmit={handleSubmit(onSub)} className='postInfo col-md-7 '>
                            <div className='row align-items-center justify-content-between pb-4'>
                                <div className='col-9'>
                                    <div className='row'>
                                        <div className='col-2 p-0 d-flex align-items-center'>
                                            {userInfo.img_url ? <img src={userInfo.img_url} className='profile-pic' /> : <AccountCircle className='profile_icon' fontSize='large' />}
                                        </div>
                                        <div className='col-9 ms-3'>
                                            <h5>{userInfo.nickname}</h5>
                                            <div className='col-auto'>
                                                <input placeholder="post's title" {...register("title", { required: true, minLength: 2 })} className="form-control" type="text" />
                                                {errors.title && <div className="text-danger">* Enter valid title</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className='justify-content-end d-flex h4 '>
                                        <button disabled className='btnIcon'> <AiOutlineExclamationCircle /> </button>
                                    </div>
                                    {moment(Date.now()).fromNow()}
                                    {/* {item.location && <div className='col-auto p-1'> <AiOutlinePushpin className='h5' />location</div>} */}
                                    <div className='col-auto p-1'> <AiOutlinePushpin className='h5' />
                                        <select {...register("place_url", { required: false, minLength: 2 })} className="form-select" type="select" >
                                            <option value="" >choose place</option>
                                            {placesList.map(item => {
                                                return (
                                                    <option key={item._id} value={item._id} >{item.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='m-1 col-md-5 postPic'>
                                    <input ref={fileRef} className="form-control" type="file" />
                                </div>
                                <div className='col-md-6'>
                                    <textarea rows={6} placeholder='description' {...register("description", { required: true, minLength: 2 })} className="form-control" type="textarea" />
                                    {errors.description && <div className="text-danger">* Enter valid description</div>}
                                </div>
                            </div>
                            <div className='float-end'>
                                <button disabled className='btnIcon'>
                                    <AiOutlineHeart className='h2' />
                                </button>
                            </div>
                            <button className='addBtn'>add post</button>
                        </form>

                        <div className='col-md-5 text-center'>
                            <h5 className='text-center'>comments</h5>
                            <div className='p-2'>
                                <div className='row col-auto pt-4 align-items-center'>
                                    <div className="commentsArea"></div>
                                    <div className='col-10 '>
                                        <textarea disabled rows={1} className=' postInputs input-group m-auto text-center' placeholder='Write your comment...' />
                                    </div>
                                    <button disabled className=' col-2 btnIcon'>
                                        <AiOutlineComment className='display-6' />
                                    </button>
                                </div>
                            </div>
                        </div >
                    </div >
                </div>}
            <Link to={"/posts"} className='d-flex justify-content-center mt-5 text-dark'>Back to Posts</Link>
        </div>
    )
}
