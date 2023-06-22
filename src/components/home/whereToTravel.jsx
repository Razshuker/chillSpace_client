import React from 'react'
import { useForm } from "react-hook-form"

export default function WhereToTravel() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSub = async (_data) => {
        console.log(_data);
    }

    return (
        <div className='whereToTravel container p-4 my-3'>
            <h2 className='text-center'>WHERE TO TRAVEL</h2>
            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit(onSub)} className='col-md-9'>
                    <label>Describe yourself in the most appropriate option</label>
                    <select {...register("DescribeYourself", { required: true, minLength: 2 })} className="form-select" type="select" >
                        <option value="" >Choose option</option>
                        <option value="travel" >Traveling is all that is on my mind</option>
                        <option value="chill" >Chill it's me</option>
                        <option value="stayAtHome" >TV, air conditioner and sleep</option>
                    </select>
                    <label>Choose the best option for you</label>
                    <select {...register("bestOption", { required: true, minLength: 2 })} className="form-select" type="select" >
                        <option value="" >Choose option</option>
                        <option value="airConditioner" >Must have air conditioner</option>
                        <option value="openPlace" >An open place with a crazy view</option>
                        <option value="dont_care" >I don't care</option>
                    </select>
                    <label>What kind of entertainment do you want?</label>
                    <select {...register("kind", { required: true, minLength: 2 })} className="form-select" type="select" >
                        <option value="" >Choose option</option>
                        <option value="extreme" >Extreme</option>
                        <option value="calm" >Calm place</option>
                        <option value="food" >Just bring me food</option>
                    </select>
                    <label>who's coming?</label>
                    <select {...register("members", { required: true, minLength: 2 })} className="form-select" type="select" >
                        <option value="" >Choose option</option>
                        <option value="just_me" >Just me</option>
                        <option value="friends" >Group of friends</option>
                        <option value="couple" >My soulmate</option>
                        <option value="family" >My family</option>
                    </select>
                    <button className='find_btn'>Find me a place</button>
                </form>
            </div>
        </div>
    )
}
