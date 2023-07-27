import React from 'react'
import { useForm } from 'react-hook-form'
import { API_URL, doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddCategory() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();

    const onSub = async (_bodyData) => {
        try {
            const url = API_URL + "/categories";
            const data = await doApiMethod(url, "POST", _bodyData);
            if (data._id) {
                toast.success("category added");
                nav("/admin/categories");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container-fluid'>
            <div className="container">
                <h2 className='text-center display-3'>New category form:</h2>
                <form onSubmit={handleSubmit(onSub)} className='col-md-8' >
                    <label className='mt-3'>Category name</label>
                    <input {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.name && <div className="text-danger">* Enter valid name</div>}
                    <label className='mt-3'>Category code</label>
                    <input {...register("category_code", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.category_code && <div className="text-danger">* Enter valid category_code</div>}
                    <label className='mt-3'>Description</label>
                    <textarea rows={3} {...register("description", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.description && <div className="text-danger">* Enter valid description</div>}
                    <button className=' text-center btn btn-success mt-5'>Add</button>
                </form>
            </div>
        </div>
    )
}
