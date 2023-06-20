import React from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../components/loading';

export default function EditPlace() {
    const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm();
    const [tags, setTags] = useState([]);
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCat, setSelectedCat] = useState([]);
    const AREAS = ["south", "north", "center", "jerusalem"];
    const [fitAreas, setAreas] = useState([]);
    const [types, setTypes] = useState([]);
    const params = useParams();
    const [placeDetails, setPlaceDetails] = useState({});
    const nav = useNavigate();


    useEffect(() => {
        doApiGetPlace();
    }, [])

    const doApiGetPlace = async (res, req) => {
        try {
            const url = API_URL + "/places/single/" + params["id"];
        const data = await doApiGet(url);
        console.log(data);
        setPlaceDetails(data);
        const filterArea = AREAS.filter(item => { return item != data.area });
        setAreas(filterArea);
        doApiTypes(data.type);
        doApiTags();
        doApiCategory();
          
        } catch (error) {
            console.log(error);
            alert("there is a problem, try again later")
        }

    }

    const doApiTypes = async (_type) => {
        try {
            const url = API_URL + "/types";
            const data = await doApiGet(url);
            const filterAr = data.filter(item => { return item.type_name != _type })
            setTypes(filterAr);
        } catch (error) {
            console.log(error)
        }
    }

    const doApiTags = async () => {
        try {
            const url = API_URL + "/tags";
            const data = await doApiGet(url);
            setTags(data);
        } catch (error) {
            console.log(error)
        }
    }
    const doApiCategory = async () => {
        try {
            const url = API_URL + "/categories";
            const data = await doApiGet(url);
            setCategories(data);
        } catch (error) {
            console.log(error)
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
        doApiPut(placeData);
    }

    const doApiPut = async (_placeData) => {
        try {
            const url = API_URL + "/places/" + params["id"];
            const data = await doApiMethod(url, "PUT", _placeData);
            if (data.modifiedCount) {
                alert("place Updated")
                nav(-1)
            }
        } catch (error) {
            console.log(error);
            alert("there is a problem, please try again later");
        }
    }
    return (
        <div className='container'>
            {placeDetails._id ?
                (
                    <>
                        <h1> Edit place - "{placeDetails.name}"</h1>
                        <form onSubmit={handleSubmit(onSubForm)}>
                            <label className="pt-3 pb-1">name</label>
                            <input defaultValue={placeDetails.name} {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
                            {errors.name && <div className="text-danger">* Enter a valid name</div>}
                            <label className="pt-3 pb-1">image (url)</label>
                            <input defaultValue={placeDetails.img_url} {...register("img_url", { minLength: 2 })} className="form-control" type="text" />
                            {errors.img_url && <div className="text-danger">* Enter a valid url</div>}
                            <label className="pt-3 pb-1">city</label>
                            <input defaultValue={placeDetails.city} {...register("city", { required: true, minLength: 2 })} className="form-control" type="text" />
                            {errors.city && <div className="text-danger">* Enter a valid city</div>}
                            <label className="pt-3 pb-1">phone</label>
                            <input defaultValue={placeDetails.phone} {...register("phone", { required: true, minLength: 2 })} className="form-control" type="text" />
                            {errors.phone && <div className="text-danger">* Enter a valid phone</div>}
                            <label className="pt-3 pb-1">latitude</label>
                            <input defaultValue={placeDetails.location['lat']} {...register("lat", { required: true, minLength: 2 })} className="form-control" type="text" />
                            {errors.lat && <div className="text-danger">* Enter a valid latitude</div>}
                            <label className="pt-3 pb-1">longitude</label>
                            <input defaultValue={placeDetails.location['lon']} {...register("lon", { required: true, minLength: 2 })} className="form-control" type="text" />
                            {errors.lon && <div className="text-danger">* Enter a valid longitude</div>}
                            <label className="pt-3 pb-1">description</label>
                            <textarea rows={"5"} defaultValue={placeDetails.description} {...register("description", { required: true, minLength: 2 })} className="form-control" type="text" />
                            {errors.description && <div className="text-danger">* Enter a valid description</div>}
                            <label className="pt-3 pb-1">area</label>
                            <select {...register("area", { required: true })} className="form-select" type="select">
                                <option value={placeDetails.area}>{placeDetails.area}</option>
                                {fitAreas.map((item, i) => {
                                    return (
                                        <option key={i} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                            <label className="pt-3 pb-1">type</label>
                            <select {...register("type", { required: true })} className="form-select" type="select">
                                <option value={placeDetails.type}>{placeDetails.type}</option>
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
                                        <input onClick={() => { onSelectTag(item.tag_name) }} className="form-check-input" type="checkbox" id={item.tag_name} value={item.tag_name} defaultChecked={placeDetails.tags_name.includes(item.tag_name)} />
                                        <label className="form-check-label" htmlFor={item.tag_name}>{item.tag_name}</label>
                                    </div>
                                )
                            })}
                            <br />
                            <label className="pt-3 pb-1 pe-5 h5">categories</label>
                            {categories.map(item => {
                                return (
                                    <div className="form-check form-check-inline" key={item._id}>
                                        <input onClick={() => { onSelectCat(item.category_code) }} className="form-check-input" type="checkbox" id={item.category_code} value={item.category_code} defaultChecked={placeDetails.categories_code.includes(item.category_code)} />
                                        <label className="form-check-label" htmlFor={item.category_code}>{item.name}</label>
                                    </div>
                                )
                            })}
                            <br />
                            <label className="pt-3 pb-1">open_hours - Sunday</label>
                            <input defaultValue={placeDetails.open_hours['Sunday']} className="form-control" type="text" />
                            <label className="pt-3 pb-1">open_hours - Monday</label>
                            <input defaultValue={placeDetails.open_hours['Monday']} {...register('open_hours - Monday')} className="form-control" type="text" />
                            <label className="pt-3 pb-1">open_hours - Tuesday</label>
                            <input defaultValue={placeDetails.open_hours['Tuesday']} {...register('open_hours - Tuesday')} className="form-control" type="text" />
                            <label className="pt-3 pb-1">open_hours - Wednesday</label>
                            <input defaultValue={placeDetails.open_hours['Wednesday']} {...register('open_hours - Wednesday')} className="form-control" type="text" />
                            <label className="pt-3 pb-1">open_hours - Thursday</label>
                            <input defaultValue={placeDetails.open_hours['Thursday']} {...register('open_hours - Thursday')} className="form-control" type="text" />
                            <label className="pt-3 pb-1">open_hours - Friday</label>
                            <input defaultValue={placeDetails.open_hours['Friday']} {...register('open_hours - Friday')} className="form-control" type="text" />
                            <label className="pt-3 pb-1">open_hours - Saturday</label>
                            <input defaultValue={placeDetails.open_hours['Saturday']} {...register('open_hours - Saturday')} className="form-control" type="text" />
                            <button className='btn btn-success m-4 d-block'> Update </button>
                        </form>
                    </>
                ) : <Loading />}
        </div>
    )
}
