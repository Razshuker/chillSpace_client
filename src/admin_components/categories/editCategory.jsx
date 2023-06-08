import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditCategory() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [category, setCategory] = useState({});
    const nav = useNavigate();
    const params = useParams();

    useEffect(() => {
        doApi();
    }, []);

    const doApi = async () => {
        const url = API_URL + "/categories/single/" + params["id"];
        const data = await doApiGet(url);
        setCategory(data);
    }

    const onSub = async (_bodyData) => {
        try {
            const url = API_URL + "/categories/" + params["id"];
            const data = await doApiMethod(url, "PUT", _bodyData);
            if (data.modifiedCount) {
                alert("category update");
                nav("/admin/categories");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container-fluid'>
            <div className="container">
                <h2 className='text-center display-3'>Edit category: {category.name}</h2>
                {category.name && <form onSubmit={handleSubmit(onSub)} className='col-md-8' >
                    <label className='mt-3'>Category name</label>
                    <input defaultValue={category.name} {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.name && <div className="text-danger">* Enter valid name</div>}
                    <label className='mt-3'>Category code</label>
                    <input defaultValue={category.category_code} {...register("category_code", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.category_code && <div className="text-danger">* Enter valid category_code</div>}
                    <label className='mt-3'>Description</label>
                    <textarea defaultValue={category.description} rows={3} {...register("description", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.description && <div className="text-danger">* Enter valid description</div>}
                    <button className=' text-center btn btn-success mt-5'>update</button>
                </form>}
            </div>
        </div>
    )
}
