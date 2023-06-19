import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

export default function AddPlace() {
    const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm();
    const [tags, setTags] = useState([]);
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCat, setSelectedCat] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        doApiTags()
        doApiTypes();
        doApiCategory();
    }, [])

    const doApiTags = async () => {
        try {
            const url = API_URL + "/tags";
            const data = await doApiGet(url);
            setTags(data);
            // console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
    const doApiTypes = async () => {
        try {
            const url = API_URL + "/types";
            const data = await doApiGet(url);
            setTypes(data);
        } catch (error) {
            console.log(error)
        }
    }
    const doApiCategory = async () => {
        try {
            const url = API_URL + "/categories";
            const data = await doApiGet(url);
            setCategories(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const onSubForm = (_bodyData) => {
        const placeLocation = { lat: (_bodyData['lat'] || ''), lon: (_bodyData['lon'] || '') };
        const openHours = {
            Sunday: _bodyData['open_hours - Sunday'] || '',
            Monday: _bodyData['open_hours - Monday'] || '',
            Tuesday: _bodyData['open_hours - Tuesday'] || '',
            Wednesday: _bodyData['open_hours - Wednesday'] || '',
            Thursday: _bodyData['open_hours - Thursday'] || '',
            Friday: _bodyData['open_hours - Friday'] || '',
            Saturday: _bodyData['open_hours - Saturday'] || '',
        };

        const placeData = {
            ..._bodyData,
            open_hours: openHours,
            location: placeLocation,
            tags_name: selectedTags,
            categories_code: selectedCat
        };

        delete placeData['open_hours - Sunday'];
        delete placeData['open_hours - Monday'];
        delete placeData['open_hours - Tuesday'];
        delete placeData['open_hours - Wednesday'];
        delete placeData['open_hours - Thursday'];
        delete placeData['open_hours - Friday'];
        delete placeData['open_hours - Saturday'];

        delete placeData['lat'];
        delete placeData['lon'];

        console.log(placeData);
        doApiPost(placeData);

    }

    const doApiPost = async (_placeData) => {
        try {
            const url = API_URL + "/places";
            const data = await doApiMethod(url, "POST", _placeData);
            if (data._id) {
                alert("new place added")
                nav(-1)
            }
        } catch (error) {
            console.log(error);
            alert("there is a problem, please try again later");

        }

    }
    const onSelectTag = (_tagName) => {
        const isSelected = selectedTags.includes(_tagName);
        if (!isSelected) {
            setSelectedTags([...selectedTags, _tagName]);
        } else {
            setSelectedTags(selectedTags.filter((name) => name !== _tagName));
        }
    };
    const onSelectCat = (_catCode) => {
        const isSelected = selectedCat.includes(_catCode);
        if (!isSelected) {
            setSelectedCat([...selectedCat, _catCode]);
        } else {
            setSelectedCat(selectedCat.filter((code) => code !== _catCode));
        }
    };

    return (
        <div className='container'>
            <h1>Add new place</h1>
            <form onSubmit={handleSubmit(onSubForm)} >
                <label className="pt-3 pb-1">name</label>
                <input {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
                {errors.name && <div className="text-danger">* Enter a valid name</div>}

                <label className="pt-3 pb-1">image (url)</label>
                <input {...register("img_url", { minLength: 2 })} className="form-control" type="text" />
                {errors.img_url && <div className="text-danger">* Enter a valid url</div>}


                <label className="pt-3 pb-1">city</label>
                <input {...register("city", { required: true, minLength: 2 })} className="form-control" type="text" />
                {errors.city && <div className="text-danger">* Enter a valid city</div>}


                <label className="pt-3 pb-1">phone</label>
                <input {...register("phone", { required: true, minLength: 2 })} className="form-control" type="text" />
                {errors.phone && <div className="text-danger">* Enter a valid phone</div>}


                <label className="pt-3 pb-1">latitude</label>
                <input {...register("lat", { required: true, minLength: 2 })} className="form-control" type="text" />
                {errors.lat && <div className="text-danger">* Enter a valid latitude</div>}

                <label className="pt-3 pb-1">longitude</label>
                <input {...register("lon", { required: true, minLength: 2 })} className="form-control" type="text" />
                {errors.lon && <div className="text-danger">* Enter a valid longitude</div>}


                <label className="pt-3 pb-1">description</label>
                <input {...register("description", { required: true, minLength: 2 })} className="form-control" type="text" />
                {errors.description && <div className="text-danger">* Enter a valid description</div>}


                <label className="pt-3 pb-1">area</label>
                <select {...register("area", { required: true })} className="form-select" type="select" >
                    <option value={""}>
                        choose one of the options:
                    </option>
                    <option value={"north"}>North</option>
                    <option value={"suoth"}>South</option>
                    <option value={"center"}>Center</option>
                    <option value={"jerusalem"}>Jerusalem</option>
                </select>
                <label className="pt-3 pb-1">type</label>
                <select {...register("type", { required: true })} className="form-select " type="select">
                    <option value={""}>
                        choose one of the options:
                    </option>
                    <option></option>
                    {types.map(item => {
                        return (
                            <option value={item.type_name} key={item._id}>{item.type_name}</option>
                        )
                    })}
                </select>



                <label className="pt-3 pb-1 pe-5 h5">tags</label>
                {tags.map(item => {
                    return (
                        <div className="form-check form-check-inline" key={item._id}>
                            <input onClick={() => { onSelectTag(item.tag_name) }} className="form-check-input" type="checkbox" id={item.tag_name} value={item.tag_name} />
                            <label className="form-check-label" htmlFor={item.tag_name}>{item.tag_name}</label>
                        </div>
                    )
                })}
                <br />

                <label className="pt-3 pb-1 pe-5 h5">categories</label>
                {categories.map(item => {
                    return (
                        <div className="form-check form-check-inline" key={item._id}>
                            <input onClick={() => { onSelectCat(item.category_code) }} className="form-check-input" type="checkbox" id={item.category_code} value={item._id} />
                            <label className="form-check-label" htmlFor={item.category_code}>{item.name}</label>
                        </div>
                    )
                })}
                <br />




                <label className="pt-3 pb-1">open_hours - Sunday</label>
                <input {...register('open_hours - Sunday')} className="form-control" type="text" />

                <label className="pt-3 pb-1">open_hours - Monday</label>
                <input {...register('open_hours - Monday')} className="form-control" type="text" />

                <label className="pt-3 pb-1">open_hours - Tuesday</label>
                <input {...register('open_hours - Tuesday')} className="form-control" type="text" />

                <label className="pt-3 pb-1">open_hours - Wednesday</label>
                <input {...register('open_hours - Wednesday')} className="form-control" type="text" />

                <label className="pt-3 pb-1">open_hours - Thursday</label>
                <input {...register('open_hours - Thursday')} className="form-control" type="text" />

                <label className="pt-3 pb-1">open_hours - Friday</label>
                <input {...register('open_hours - Friday')} className="form-control" type="text" />

                <label className="pt-3 pb-1">open_hours - Saturday</label>
                <input {...register('open_hours - Saturday')} className="form-control" type="text" />

                <button className='btn btn-success m-4'> Submit </button>

            </form>
        </div>
    )
}
