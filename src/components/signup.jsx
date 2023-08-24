import React, { useContext, useRef, useState } from 'react'
import '../css/signup.css'
import { useForm } from "react-hook-form"
import { CgProfile } from "react-icons/cg";
import { API_URL, doApiMethod } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { imageToString } from '../services/cloudService';
import { MyContext } from '../context/myContext';
import { toast } from 'react-toastify';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useEffect } from 'react';


export default function Signup() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const nav = useNavigate();
    const fileRef = useRef();
    const { uploadImage } = useContext(MyContext);
    const [citiesAr, setCitiesAr] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [ifCity, setIfCity] = useState(true);


    useEffect(() => {
        doApiCities();
    }, []);

    const doApiCities = async () => {
        try {
            const response = await fetch(
                'https://parseapi.back4app.com/classes/Israelcities_City?limit=1000&keys=name,country,location,cityId',
                {
                    headers: {
                        'X-Parse-Application-Id': 'ZIcT1UXTHJrgcLNvFiNIEgiWk0X9QGS9pQBixIq2', // This is your app's application id
                        'X-Parse-REST-API-Key': '7FnPNtjOUjc3rU6ODdP5LJ7vk2FVs31n5XNpllXL', // This is your app's REST API key
                    }
                }
            );
            const data = await response.json();
            const transformedData = data.results.map((item) => {
                const { objectId, ...rest } = item;
                return { id: objectId, ...rest };
            });
            setCitiesAr(transformedData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleOnSelect = (item) => {
        setSelectedCity(item.name);
    }

    const formatResult = (item) => {
        return (
            <span style={{ display: "block", textAlign: "left" }}>
                {item.name}
            </span>
        );
    };

    const onSub = async (_data) => {
        try {
            if (selectedCity == "") setIfCity(false)
            else {
                _data.matchPlacesUrl ="";
                _data.location = selectedCity
                _data.full_name = _data.first_name + " " + _data.last_name;
                delete _data.first_name;
                delete _data.last_name;
                delete _data.confirm_password;
                if (fileRef.current.files.length > 0) {
                    _data.img_url = await uploadImage(fileRef);
                } else {
                    _data.img_url = "";
                }
                const url = API_URL + '/users';
                const user = await doApiMethod(url, "POST", _data);
                if (user._id) {
                    toast.success("user add");
                    nav("/login");
                }
            }
        } catch (error) {
            console.log(error);
            if (error.response.data.code == 11000) {
                toast.error(error.response.data.msg);
            } else {
                toast.error("there is a problem, try again later")
            }
        }
    }

    return (
        <div style={{ backgroundImage: 'url("images/sign-upBG.jpg")' }} className='sign-up container_fluid d-flex align-items-start '>
        <div className='container pb-3'>

            <h1 className='col-12 pt-5 pb-4'>SIGN UP</h1>
            <div className="px-4">
                <div className="row">
                    <div className="input_upload col-md-4 col-8 m-auto rounded text-center bg-light bg-opacity-75 mt-2 mb-4">
                        <CgProfile style={{ fontSize: "10em", color: "rgb(117, 100, 89)" }} />
                        <div className=''>
                        <input ref={fileRef} type='file' />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSub)} className='row col-lg-10 m-auto' >
                        <div className="col-md-6">
                            <input placeholder='First name' {...register("first_name", { required: true, minLength: 2 })} className="form-control input-signIn" type="text" />
                            {errors.first_name && <div className="text-danger">* Enter valid first_name</div>}
                            <input placeholder='Last name' {...register("last_name", { required: true, minLength: 2 })} className="form-control input-signIn" type="text" />
                            {errors.last_name && <div className="text-danger">* Enter valid last_name</div>}
                            <input placeholder='Email' {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className="form-control input-signIn" type="email" />
                            {errors.email && <div className="text-danger">* Enter valid email</div>}
                            <input placeholder='Phone' {...register("phone", { required: true, minLength: 2 })} className="form-control input-signIn" type="tel" />
                            {errors.phone && <div className="text-danger">* Enter valid phone</div>}
                        </div>
                        <div className="col-md-6">
                            <input placeholder='Nickname' {...register("nickname", { required: true, minLength: 2 })} className="form-control input-signIn" type="text" />
                            {errors.nickname && <div className="text-danger">* Enter valid nickname</div>}
                            <input placeholder='Password' {...register("password", { required: true, minLength: 2 })} className="form-control input-signIn" type="password" />
                            {errors.password && <div className="text-danger">* Enter valid password</div>}
                            <input placeholder='Confirm password' {...register("confirm_password", {
                                required: true, validate: (value) => {
                                    const { password } = getValues();
                                    return password === value;
                                }
                            })} className="form-control input-signIn" type="password" />
                            {errors.confirm_password && <div className="text-danger">* Password aren't match</div>}

                            <div style={{zIndex: 1}} className='pb-5 '>
                                <ReactSearchAutocomplete
                                    items={citiesAr}
                                    autoFocus
                                    formatResult={formatResult}
                                    placeholder="City.."
                                    onSelect={handleOnSelect}
                                    fuseOptions={{ keys: ["name"] }}
                                    resultStringKeyName="name"
                                    maxResults={5}
                                    styling={{
                                        backgroundColor: " rgb(255,245,236) ",                                        height: "75px",
                                        fontSize: "1.5em",
                                        // searchIconMargin: '0 100px 0 20px'
                                    }}
                                />
                                {selectedCity == "" && ifCity == false && <div className="text-danger">* Enter valid city</div>}
                            </div>
                        </div>
                        <button className='sign-up_btn mb-4'>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
        </div>


    )
}
