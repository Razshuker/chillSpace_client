import React from 'react'
import '../css/signup.css'
import { useForm } from "react-hook-form"

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSub = () => {

    }

    return (
        <div style={{ backgroundImage: 'url("images/sign-upBG.jpg")' }} className='sign-up container_fluid'>
            <h1>SIGN UP</h1>
            <div className="d-flex align-items-center">


                <div className="container">
                    <div className="row">
                        <div className="col-md-4">

                        </div>
                        <form onSubmit={handleSubmit(onSub)} className='row col-md-8' >
                            <div className="col-md-6">
                                <input placeholder='First name' {...register("first_name", { required: true, minLength: 2 })} className="form-control" type="text" />
                                {errors.first_name && <div className="text-danger">* Enter valid first_name</div>}
                                <input placeholder='Last name' {...register("last_name", { required: true, minLength: 2 })} className="form-control" type="text" />
                                {errors.last_name && <div className="text-danger">* Enter valid last_name</div>}
                                <input placeholder='Email' {...register("email", { required: true, minLength: 2 })} className="form-control" type="email" />
                                {errors.email && <div className="text-danger">* Enter valid email</div>}
                                <input placeholder='Phone' {...register("phone", { required: true, minLength: 2 })} className="form-control" type="tel" />
                                {errors.phone && <div className="text-danger">* Enter valid phone</div>}
                            </div>
                            <div className="col-md-6">
                                <input placeholder='Nickname' {...register("nickname", { required: true, minLength: 2 })} className="form-control" type="text" />
                                {errors.nickname && <div className="text-danger">* Enter valid nickname</div>}
                                <input placeholder='City' {...register("city", { required: true, minLength: 2 })} className="form-control" type="text" />
                                {errors.city && <div className="text-danger">* Enter valid city</div>}
                                <input placeholder='Password' {...register("password", { required: true, minLength: 2 })} className="form-control" type="password" />
                                {errors.password && <div className="text-danger">* Enter valid password</div>}
                                <input placeholder='Confirm password' {...register("confirm_password", { required: true, minLength: 2 })} className="form-control" type="password" />
                                {errors.confirm_password && <div className="text-danger">* Enter valid confirm_password</div>}
                            </div>
                            <button className='sign-up_btn'>Sign up</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
