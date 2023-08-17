import React, { useRef, useContext } from 'react'
import '../../css/updateAccount.css'
import { useForm } from "react-hook-form"
import { CgProfile } from "react-icons/cg";
import { API_URL, doApiMethod } from '../../services/apiService';
import ChangePassword from './changePassword';
import { MyContext } from '../../context/myContext';
import { toast } from 'react-toastify';

export default function UpdateUserInfo() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const fileRef = useRef();
    const { userInfo, uploadImage, getUserInfo } = useContext(MyContext);


    const onSub = async (_data) => {
        try {
            if (fileRef.current.files[0] != undefined) {
                _data.img_url = await uploadImage(fileRef);
            }
            const url = API_URL + "/users/updateUser";
            const data = await doApiMethod(url, "PUT", _data);
            if (data.modifiedCount) {
                getUserInfo();
                toast.success("user updated");
            }
        } catch (error) {
            console.log(error);
            toast.error("there is a problem, try again later")
        }
    }

    return (
        <div style={{ backgroundImage: `url("/images/sign-upBG.jpg")` }} className='updateAccount container-fluid d-flex align-items-center'>
            <h2 className='col-12'>UPDATE ACCOUNT DETAILS</h2>
            <div className="container">
                {userInfo.full_name &&
                    <div className="row">
                        <div className="col-md-4">
                            {userInfo.img_url ? <img style={{ height: "30vh", width: "20vw", color: "rgb(117, 100, 89)" }} src={userInfo.img_url} alt='profile' className='profile-img' /> : <CgProfile style={{ fontSize: "16em", color: "rgb(117, 100, 89)" }} />}
                            <input ref={fileRef} type='file' className='input_upload mt-3' />
                        </div>
                        <form onSubmit={handleSubmit(onSub)} className='row col-md-8' >
                            <div className="col-md-6">
                                <label>Full name</label>
                                <input defaultValue={userInfo.full_name} {...register("full_name", { required: true, minLength: 2 })} className="form-control" type="text" />
                                {errors.full_name && <div className="text-danger">* Enter valid name</div>}
                                <label>Email</label>
                                <input defaultValue={userInfo.email} {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className="form-control" type="email" />
                                {errors.email && <div className="text-danger">* Enter valid email</div>}
                            </div>
                            <div className="col-md-6">
                                <label>Phone</label>
                                <input defaultValue={userInfo.phone} {...register("phone", { required: true, minLength: 2 })} className="form-control" type="tel" />
                                {errors.phone && <div className="text-danger">* Enter valid phone</div>}
                                <label>Nickname</label>
                                <input defaultValue={userInfo.nickname} {...register("nickname", { required: true, minLength: 2 })} className="form-control" type="text" />
                                {errors.nickname && <div className="text-danger">* Enter valid nickname</div>}
                            </div>
                            <label>Location</label>
                            <input defaultValue={userInfo.location} {...register("location", { required: true, minLength: 2 })} className="form-control" type="text" />
                            {errors.location && <div className="text-danger">* Enter valid city</div>}
                            <button className='update_btn'>Update account</button>
                        </form>
                    </div>
                }
                <ChangePassword />
            </div>
        </div>

    )
}

// import React, { useRef, useContext, useEffect, useState } from 'react'
// import '../../css/updateAccount.css'
// import { useForm } from "react-hook-form"
// import { CgProfile } from "react-icons/cg";
// import { API_URL, doApiMethod } from '../../services/apiService';
// import ChangePassword from './changePassword';
// import { MyContext } from '../../context/myContext';
// import { toast } from 'react-toastify';
// import { ReactSearchAutocomplete } from 'react-search-autocomplete';

// export default function UpdateUserInfo() {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const fileRef = useRef();
//     const { userInfo, uploadImage } = useContext(MyContext);
//     const [citiesAr, setCitiesAr] = useState([]);
//     const [selectedCity,setSelectedCity] = useState("")

//     useEffect(() => {
//         doApiCities();
//     }, []);

//     const onSub = async (_data) => {
//         try {
//             _data.img_url = await uploadImage(fileRef);
//             _data.location = selectedCity;
//             const url = API_URL + "/users/updateUser";
//             if(selectedCity=""){
//                 alert("City is required")
//             }
//             else{
//                 const data = await doApiMethod(url, "PUT", _data);
//                 if (data.modifiedCount) {
//                     toast.success("user updated");
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("there is a problem, try again later")
//         }
//     }

//     const doApiCities = async () => {
//         try {
//             const response = await fetch(
//                 'https://parseapi.back4app.com/classes/Israelcities_City?limit=1000&keys=name,country,location,cityId',
//                 {
//                     headers: {
//                         'X-Parse-Application-Id': 'ZIcT1UXTHJrgcLNvFiNIEgiWk0X9QGS9pQBixIq2', // This is your app's application id
//                         'X-Parse-REST-API-Key': '7FnPNtjOUjc3rU6ODdP5LJ7vk2FVs31n5XNpllXL', // This is your app's REST API key
//                     }
//                 }
//             );
//             const data = await response.json();
//             const transformedData = data.results.map((item) => {
//                 const { objectId, ...rest } = item;
//                 return { id: objectId, ...rest };
//               });
//             setCitiesAr(transformedData)
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
//     const handleOnSelect = (item) => {
//         setSelectedCity(item.name);
//     }

//     const formatResult = (item) => {
//         return (
//             <span style={{ display: "block", textAlign: "left" }}>
//                 {item.name}
//             </span>
//         );
//     };

//     return (
//         <div style={{ backgroundImage: `url("/images/sign-upBG.jpg")` }} className='updateAccount container-fluid d-flex align-items-center'>
//             <h2 className='col-12'>UPDATE ACCOUNT DETAILS</h2>
//             <div className="container">
//                 {userInfo.full_name &&
//                     <div className="row">
//                         <div className="col-md-4">
//                             {userInfo.img_url ? <img style={{ height: "30vh", width: "20vw", color: "rgb(117, 100, 89)" }} src={userInfo.img_url} alt='profile' className='profile-img' /> : <CgProfile style={{ fontSize: "16em", color: "rgb(117, 100, 89)" }} />}
//                             <input ref={fileRef} type='file' className='input_upload mt-3' />
//                         </div>
//                         <form onSubmit={handleSubmit(onSub)} className='row col-md-8' >
//                             <div className="col-md-6">
//                                 <label>Full name</label>
//                                 <input defaultValue={userInfo.full_name} {...register("full_name", { required: true, minLength: 2 })} className="form-control" type="text" />
//                                 {errors.full_name && <div className="text-danger">* Enter valid name</div>}
//                                 <label>Email</label>
//                                 <input defaultValue={userInfo.email} {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className="form-control" type="email" />
//                                 {errors.email && <div className="text-danger">* Enter valid email</div>}
//                             </div>
//                             <div className="col-md-6">
//                                 <label>Phone</label>
//                                 <input defaultValue={userInfo.phone} {...register("phone", { required: true, minLength: 2 })} className="form-control" type="tel" />
//                                 {errors.phone && <div className="text-danger">* Enter valid phone</div>}
//                                 <label>Nickname</label>
//                                 <input defaultValue={userInfo.nickname} {...register("nickname", { required: true, minLength: 2 })} className="form-control" type="text" />
//                                 {errors.nickname && <div className="text-danger">* Enter valid nickname</div>}
//                             </div>
//                             <label>Location</label>
//                             <div>
//                                 <ReactSearchAutocomplete
//                                     items={citiesAr}
//                                     autoFocus
//                                     formatResult={formatResult}
//                                     placeholder="Search by cities.."
//                                     onSelect={handleOnSelect}
//                                     fuseOptions={{ keys: ["name"] }}
//                                     resultStringKeyName="name"
//                                     // onClear={() => nav("/posts")}
//                                     maxResults={7}
//                                 />
//                             </div>
//                             <button className='update_btn'>Update account</button>

//                         </form>
//                     </div>
//                 }
//                 <ChangePassword />
//             </div>
//         </div>

//     )
// }
