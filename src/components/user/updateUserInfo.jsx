import React, { useState, useEffect } from 'react'
import '../../css/updateAccount.css'
import { useForm } from "react-hook-form"
import { CgProfile } from "react-icons/cg";
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import ChangePassword from './changePassword';

export default function UpdateUserInfo() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [user, setUser] = useState({});

    useEffect(() => {
        doApi();
    }, []);

    const doApi = async () => {
        try {
            const url = API_URL + "/users/userInfo";
            const data = await doApiGet(url);
            const index = data.full_name.indexOf(' ');
            data.first_name = data.full_name.substring(0, index);
            data.last_name = data.full_name.substring(index + 1, Infinity);
            setUser(data);
        } catch (error) {
            console.log(error);
            alert("there is a problem, try again later")
        }
    }

    const onSub = async (_data) => {
        try {
            _data.full_name = _data.first_name + " " + _data.last_name;
            delete _data.first_name;
            delete _data.last_name;
            const url = API_URL + "/users/updateUser";
            const data = await doApiMethod(url, "PUT", _data);
            if (data.modifiedCount) {
                alert("user updated");
            }
        } catch (error) {
            console.log(error);
            alert("there is a problem, try again later")
        }
    }

    return (
        <div style={{ backgroundImage: `url("/images/sign-upBG.jpg")` }} className='updateAccount container-fluid d-flex align-items-center'>
            <h2 className='col-12'>UPDATE ACCOUNT DETAILS</h2>
            <div className="container">
                {user.full_name &&
                    <div className="row">
                        <div className="col-md-4">
                            <CgProfile style={{ fontSize: "16em", color: "rgb(117, 100, 89)" }} />
                            <input type='file' className='input_upload' />
                        </div>
                        <form onSubmit={handleSubmit(onSub)} className='row col-md-8' >
                            <div className="col-md-6">
                                <label>First name</label>
                                <input defaultValue={user.first_name} {...register("first_name", { required: true, minLength: 2 })} className="form-control" type="text" />
                                {errors.first_name && <div className="text-danger">* Enter valid first_name</div>}
                                <label>Last name</label>
                                <input defaultValue={user.last_name} {...register("last_name", { required: true, minLength: 2 })} className="form-control" type="text" />
                                {errors.last_name && <div className="text-danger">* Enter valid last_name</div>}
                                <label>Email</label>
                                <input defaultValue={user.email} {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className="form-control" type="email" />
                                {errors.email && <div className="text-danger">* Enter valid email</div>}
                            </div>
                            <div className="col-md-6">
                                <label>Phone</label>
                                <input defaultValue={user.phone} {...register("phone", { required: true, minLength: 2 })} className="form-control" type="tel" />
                                {errors.phone && <div className="text-danger">* Enter valid phone</div>}
                                <label>Nickname</label>
                                <input defaultValue={user.nickname} {...register("nickname", { required: true, minLength: 2 })} className="form-control" type="text" />
                                {errors.nickname && <div className="text-danger">* Enter valid nickname</div>}
                                <label>Location</label>
                                <input defaultValue={user.location} {...register("location", { required: true, minLength: 2 })} className="form-control" type="text" />
                                {errors.location && <div className="text-danger">* Enter valid city</div>}
                            </div>
                            <button className='update_btn'>Update account</button>
                        </form>
                    </div>
                }
                <ChangePassword />
            </div>
        </div>

    )
}
