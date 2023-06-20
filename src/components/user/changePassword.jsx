import React from 'react'
import { useForm } from "react-hook-form"
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const nav = useNavigate();


    const onChangePassword = async (_reqData) => {
        try {
            delete _reqData.confirm_password;
            const url = API_URL + "/users/changePassword";
            const data = await doApiMethod(url, "PATCH", _reqData);
            if (data.modifiedCount) {
                alert("password changed");
                localStorage.removeItem(TOKEN_KEY);
                nav("/login");
            }
        } catch (error) {
            console.log(error);
            alert("there is a problem, try again later")
        }
    }

    return (
        <div className="container-fluid">
            <div className="container">
                <h2>Change Password:</h2>
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleSubmit(onChangePassword)} className='col-md-6' >
                        <input placeholder='old password' {...register("oldPassword", { required: true, minLength: 2 })} className="form-control" type="password" />
                        {errors.oldPassword && <div className="text-danger">* Enter valid old password</div>}
                        <input placeholder='new password' {...register("newPassword", { required: true, minLength: 2 })} className="form-control" type="password" />
                        {errors.newPassword && <div className="text-danger">* Enter valid new password</div>}
                        <input placeholder='confirm new password' {...register("confirm_password", {
                            required: true, validate: (value) => {
                                const { newPassword } = getValues();
                                return newPassword === value;
                            }
                        })} className="form-control" type="password" />
                        {errors.confirm_password && <div className="text-danger">* passwords aren't match</div>}
                        <button className='password_btn'>change password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
