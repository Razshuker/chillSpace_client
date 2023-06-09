import React from 'react'
import { useForm } from 'react-hook-form'
import { API_URL, TOKEN_KEY, doApiMethod } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();

    const onSub = async (_data) => {
        try {
            const url = API_URL + "/users/login";
            const data = await doApiMethod(url, "POST", _data);
            if (data.token) {
                localStorage.setItem(TOKEN_KEY, data.token);
                nav("users");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container-fluid'>
            <div className="container">
                <h1 className='display-1 text-center'>ADMIN LOGIN</h1>

                <form onSubmit={handleSubmit(onSub)} className='col-md-4 mx-auto' >
                    <input placeholder='Email' {...register("email", { required: true, minLength: 2 })} className="form-control mt-4" type="email" />
                    {errors.email && <div className="text-danger">* Enter valid email</div>}
                    <input placeholder='Password' {...register("password", { required: true, minLength: 2 })} className="form-control mt-4" type="password" />
                    {errors.password && <div className="text-danger">* Enter valid password</div>}
                    <button className='btn btn-outline-dark mt-5'>LOGIN</button>
                </form>
            </div>
        </div>
    )
}
