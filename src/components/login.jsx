import React, { useContext, useEffect } from 'react'
import '../css/login.css'
import { useForm } from "react-hook-form"
import { API_URL, TOKEN_KEY, doApiMethod } from '../services/apiService';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../context/myContext';
import { toast } from 'react-toastify';

export default function Login(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();
    const { getUserInfo } = useContext(MyContext);

    const clearLocalStorage = () => {
        localStorage.removeItem(TOKEN_KEY);
        console.log("cleared");
    }

    useEffect(() => {
        // delete the local storage every 10 hours (when the token is invalid)
        setInterval(clearLocalStorage, 36000000);
    }, [localStorage[TOKEN_KEY]]);

    const onSub = async (_data) => {
        try {
            const url = API_URL + '/users/login';
            const data = await doApiMethod(url, "POST", _data);
            if (data.token) {
                localStorage.setItem(TOKEN_KEY, data.token);
                toast.success("you logged in")
                getUserInfo();
                nav(-1);
                if (props.handleClose) {
                    props.handleClose();
                }
            }
        } catch (error) {
            console.log(error.response.data.err);
            toast.error(error.response.data.err)
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
                <Link onClick={props.handleClose} to={"/sign-up"} className='text-center col-12'>don't have an account?</Link>
            </form>
        </div>
    )
}
