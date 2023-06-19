import React from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';


// this componnent do not work well


export default function EditPlace() {
    const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm();
    const [tags, setTags] = useState([]);
    const nav = useNavigate();
    const AREAS = ["south", "north", "center", "jerusalem"];
    const [fitAreas, setAreas] = useState([]);
    const [types, setTypes] = useState([]);



    const params = useParams();
    const [placeDetails, setPlaceDetails] = useState({});




    useEffect(() => {
        doApiGetPlace();
        doApiTags();
    }, [])


    const doApiGetPlace = async (res, req) => {
        const url = API_URL + "/places/single/" + params["id"];
        const data = await doApiGet(url);
        console.log(data);
        setPlaceDetails(data);
        const filterArea = AREAS.filter(item => { return item != data.area });
        setAreas(filterArea);
        doApiTypes(data.type);

        // setValue('name', data.name);
        // setValue('img_url', data.img_url);
        // setValue('city', data.city);
        // setValue('phone', data.phone);
        // setValue('latitude', data.latitude);
        // setValue('longitude', data.longitude);
        // setValue('description', data.description);
        // setValue('area', data.area);
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
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }


    const onSubForm = (_bodyData) => {
        const placeLocation = { latitude: (_bodyData['latitude'] || ''), longitude: (_bodyData['longitude'] || '') };
        // const openHours = {
        //     Sunday: _bodyData['open_hours - Sunday'] || '',
        //     Monday: _bodyData['open_hours - Monday'] || '',
        //     Tuesday: _bodyData['open_hours - Tuesday'] || '',
        //     Wednesday: _bodyData['open_hours - Wednesday'] || '',
        //     Thursday: _bodyData['open_hours - Thursday'] || '',
        //     Friday: _bodyData['open_hours - Friday'] || '',
        //     Saturday: _bodyData['open_hours - Saturday'] || '',
        // };

        const placeData = {
            ..._bodyData,
            // open_hours: openHours,
            location: placeLocation,
            // tags_name: selectedTags,
            // categories_code: selectedCat
        };

        // delete placeData['open_hours - Sunday'];
        // delete placeData['open_hours - Monday'];
        // delete placeData['open_hours - Tuesday'];
        // delete placeData['open_hours - Wednesday'];
        // delete placeData['open_hours - Thursday'];
        // delete placeData['open_hours - Friday'];
        // delete placeData['open_hours - Saturday'];

        delete placeData['latitude'];
        delete placeData['longitude'];

        console.log(placeData);
        doApiPut(placeData);

    }

    const doApiPut = async (_placeData) => {
        try {
            const url = API_URL + "/places";
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
            <h1> Edit place - "{placeDetails.name}"</h1>
            {placeDetails.name &&
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
                    <input defaultValue={placeDetails.location.lat} {...register("lat", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.lat && <div className="text-danger">* Enter a valid latitude</div>}

                    <label className="pt-3 pb-1">longitude</label>
                    <input defaultValue={placeDetails.location.lon} {...register("lon", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.lon && <div className="text-danger">* Enter a valid longitude</div>}


                    <label className="pt-3 pb-1">description</label>
                    <textarea rows={"5"} defaultValue={placeDetails.description} {...register("description", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.description && <div className="text-danger">* Enter a valid description</div>}


                    <label className="pt-3 pb-1">area</label>
                    <select defaultValue={placeDetails.area} {...register("area", { required: true })} className="form-select" type="select" >
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
                                <input className="form-check-input" type="checkbox" id={item.tag_name} value={item.tag_name} defaultChecked={placeDetails.tags_name.includes(item.tag_name)} />
                                <label className="form-check-label" htmlFor={item.tag_name}>{item.tag_name}</label>
                            </div>
                        )
                    })}
                    <button className='btn btn-success m-4 d-block'> Update </button>
                </form>
            }
        </div>
    )
}
