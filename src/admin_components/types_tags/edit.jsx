import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();
    const params = useParams();
    const [item, setItem] = useState({});
    const [itemName, setItemName] = useState(params["editElement"] + "_name");


    useEffect(() => {
        getItem();
    }, []);


    const getItem = async () => {
        try {
            const url = API_URL + "/" + params["editElement"] + "s/single/" + params["id"];
            const data = await doApiGet(url);
            setItem(data);
        } catch (error) {
            console.log(error);
        }
    }

    const onSub = async (_reqBody) => {
        try {
            const url = API_URL + `/${_reqBody.select}s/` + item._id;
            const data = await doApiMethod(url, "PUT", { [_reqBody.select + "_name"]: _reqBody.name });
            if (data.modifiedCount) {
                alert(_reqBody.select + " edit");
                nav("/admin/types&tags")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-fluid">
            {item._id && <React.Fragment>
                <h2 className='text-center my-5 display-4'>ADD TAG / TYPE</h2>
                <div className="container d-flex justify-content-center">
                    <form onSubmit={handleSubmit(onSub)} className="col-md-6" >
                        <label>select tag/type</label>
                        <select disabled defaultValue={params["editElement"]} {...register("select", { required: true, minLength: 2 })} className="form-select" type="select" >
                            <option value="" >choose type/tag</option>
                            <option value="type" >type</option>
                            <option value="tag" >tag</option>
                        </select>
                        {errors.select && <div className="text-danger">* You must choose one</div>}
                        <label>name</label>
                        <input defaultValue={item[itemName]} {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
                        {errors.name && <div className="text-danger">* Enter valid name</div>}
                        <div className="d-flex justify-content-center">
                            <button className='btn btn-outline-dark my-4'>Edit</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>}
        </div>
    )
}
