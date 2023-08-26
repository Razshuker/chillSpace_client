import React, { useState } from 'react'
import '../../css/updateAccount.css'
import { useForm } from "react-hook-form"
import { API_URL, TOKEN_KEY, doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ChangePassword() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const nav = useNavigate();
    const [passwordError, setPasswordError] = useState(false);

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPasswordError(!validatePassword(newPassword));
    };

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);
        const isLengthValid = password.length >= 8;

        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLengthValid;
    };

    const onChangePassword = async (_reqData) => {
        try {
            if (!validatePassword(_reqData.password)) {
                setPasswordError(true);
                return;
            }
            delete _reqData.confirm_password;
            const url = API_URL + "/users/changePassword";
            const data = await doApiMethod(url, "PATCH", _reqData);
            if (data.modifiedCount) {
                toast.success("password changed");
                localStorage.removeItem(TOKEN_KEY);
                nav("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error("there is a problem, try again later")
        }
    }

    return (
        <div className="container-fluid">
            <div className="container pb-5">
                <h2 className='p-3 text-center'>Change Password:</h2>
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleSubmit(onChangePassword)} className='col-md-6' >
                        <input placeholder='old password' {...register("oldPassword", { required: true, minLength: 2 })} className="form-control inputUpdate" type="password" />
                        {errors.oldPassword && <div className="text-danger">* Enter valid old password</div>}
                        <input onInput={handlePasswordChange} placeholder='new password' {...register("newPassword", { required: true, minLength: 2 })} className="form-control inputUpdate" type="password" />
                        {errors.newPassword && <div className="text-danger">* Enter valid new password</div>}
                        {passwordError && <div className="text-danger">*The password must contain 7 characters including an uppercase letter, a lowercase letter, a number and a special character.</div>}
                        <input placeholder='confirm new password' {...register("confirm_password", {
                            required: true, validate: (value) => {
                                const { newPassword } = getValues();
                                return newPassword === value;
                            }
                        })} className="form-control inputUpdate" type="password" />
                        {errors.confirm_password && <div className="text-danger">* passwords aren't match</div>}
                        <button className='password_btn'>change password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
