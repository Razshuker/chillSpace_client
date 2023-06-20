import React from 'react'
import '../css/login.css'
import { useForm } from "react-hook-form"
import { API_URL, TOKEN_KEY, doApiMethod } from '../services/apiService';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();

    const onSub = async (_data) => {
        try {
            const url = API_URL + '/users/login';
            const data = await doApiMethod(url, "POST", _data);
            if (data.token) {
                localStorage.setItem(TOKEN_KEY, data.token);
                nav("/");
            }
        } catch (error) {
            console.log(error);
            alert("there is a problem, try again later")
        }
    }

    return (
        <div className="loginClient" style={{ backgroundImage: `url("/images/loginBG.jpg")` }}>
            <form onSubmit={handleSubmit(onSub)} className='col-md-4' >
                <h1 className='text-center mb-5'>LOGIN</h1>
                <input placeholder='Email' {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className="form-control" type="text" />
                {errors.email && <div className="text-danger">* Enter valid email</div>}
                <input placeholder='Password' {...register("password", { required: true, minLength: 2 })} className="form-control" type="password" />
                {errors.password && <div className="text-danger">* Enter valid password</div>}
                <button className='login_btn'>LOGIN</button>
                <Link to={"/sign-up"} className='text-center col-12'>don't have an account?</Link>
            </form>
        </div>
    )
}
