import React from 'react'
import { useForm } from "react-hook-form"
import { API_URL, doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Add() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();

    const onSub = async (_reqBody) => {
        try {
            const url = API_URL + `/${_reqBody.select}s`;
            const data = await doApiMethod(url, "POST", { [_reqBody.select + "_name"]: _reqBody.name });
            if (data._id) {
                toast.success(_reqBody.select + " added");
                nav("/admin/types&tags")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-fluid">
            <h2 className='text-center my-5 display-4'>ADD TAG / TYPE</h2>
            <div className="container d-flex justify-content-center">
                <form onSubmit={handleSubmit(onSub)} className="col-md-6" >
                    <label>select tag/type</label>
                    <select {...register("select", { required: true, minLength: 2 })} className="form-select" type="select" >
                        <option value="" >choose type/tag</option>
                        <option value="type" >type</option>
                        <option value="tag" >tag</option>
                    </select>
                    {errors.select && <div className="text-danger">* You must choose one</div>}
                    <label>name</label>
                    <input {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.name && <div className="text-danger">* Enter valid name</div>}
                    <div className="d-flex justify-content-center">
                        <button className='btn btn-outline-dark my-4'>Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
