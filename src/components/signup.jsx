import React, { useContext, useRef, useState } from 'react'
import '../css/signup.css'
import { useForm } from "react-hook-form"
import { CgProfile } from "react-icons/cg";
import { API_URL, doApiMethod } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { imageToString } from '../services/cloudService';
import { MyContext } from '../context/myContext';


export default function Signup() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const nav = useNavigate();
    const fileRef = useRef();
    const { uploadImage } = useContext(MyContext);

    const onSub = async (_data) => {
        try {
            _data.full_name = _data.first_name + " " + _data.last_name;
            delete _data.first_name;
            delete _data.last_name;
            delete _data.confirm_password;
            if (fileRef.current.files.length > 0) {
                _data.img_url = await uploadImage(fileRef);
            } else {
                _data.img_url = "";
            }
            const url = API_URL + '/users';
            const user = await doApiMethod(url, "POST", _data);
            if (user._id) {
                alert("user add");
                nav("/login");
            }
        } catch (error) {
            console.log(error);
            alert("there is a problem, try again later")
        }
    }

    return (
        <div style={{ backgroundImage: 'url("images/sign-upBG.jpg")' }} className='sign-up container_fluid d-flex align-items-center'>
            <h1 className='col-12'>SIGN UP</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <CgProfile style={{ fontSize: "16em", color: "rgb(117, 100, 89)" }} />
                        <input ref={fileRef} type='file' className='input_upload' />
                    </div>
                    <form onSubmit={handleSubmit(onSub)} className='row col-md-8' >
                        <div className="col-md-6">
                            <input placeholder='First name' {...register("first_name", { required: true, minLength: 2 })} className="form-control" type="text" />
                            {errors.first_name && <div className="text-danger">* Enter valid first_name</div>}
                            <input placeholder='Last name' {...register("last_name", { required: true, minLength: 2 })} className="form-control" type="text" />
                            {errors.last_name && <div className="text-danger">* Enter valid last_name</div>}
                            <input placeholder='Email' {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className="form-control" type="email" />
                            {errors.email && <div className="text-danger">* Enter valid email</div>}
                            <input placeholder='Phone' {...register("phone", { required: true, minLength: 2 })} className="form-control" type="tel" />
                            {errors.phone && <div className="text-danger">* Enter valid phone</div>}
                        </div>
                        <div className="col-md-6">
                            <input placeholder='Nickname' {...register("nickname", { required: true, minLength: 2 })} className="form-control" type="text" />
                            {errors.nickname && <div className="text-danger">* Enter valid nickname</div>}
                            <input placeholder='City' {...register("location", { required: true, minLength: 2 })} className="form-control" type="text" />
                            {errors.location && <div className="text-danger">* Enter valid city</div>}
                            <input placeholder='Password' {...register("password", { required: true, minLength: 2 })} className="form-control" type="password" />
                            {errors.password && <div className="text-danger">* Enter valid password</div>}
                            <input placeholder='Confirm password' {...register("confirm_password", {
                                required: true, validate: (value) => {
                                    const { password } = getValues();
                                    return password === value;
                                }
                            })} className="form-control" type="password" />
                            {errors.confirm_password && <div className="text-danger">* Password aren't match</div>}
                        </div>
                        <button className='sign-up_btn'>Sign up</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
