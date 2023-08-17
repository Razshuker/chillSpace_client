import React, { useState } from 'react'
import '../../css/home.css'
import { useForm } from "react-hook-form"
import { API_URL, TOKEN_KEY, doApiGet } from '../../services/apiService'
import Loading from '../loading'
import PlaceBoxItem from '../places/placeBoxItem'
import { toast } from 'react-toastify'

export default function WhereToTravel() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [myPlaces, setMyPlaces] = useState([]);
    const [isAnswer, setIsAnswer] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSub = async (_data) => {
        if (!localStorage[TOKEN_KEY]) {
            toast.error("You must login to get your results")
        } else {
            try {
                setLoading(true);
                const url = API_URL + `/places/whereToTravel?kind=${_data.kind}&members=${_data.members}&tags_ar=${_data.DescribeYourself},${_data.bestOption}`;
                const data = await doApiGet(url);
                console.log(data);
                setMyPlaces(data);
                setIsAnswer(true);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    return (
        <div className='whereToTravel container p-4 my-3'>
            <h2 className='text-center'>WHERE TO TRAVEL</h2>
            {loading ? <Loading /> :
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleSubmit(onSub)} className='col-md-9'>
                        <label>Describe yourself in the most appropriate option</label>
                        <select {...register("DescribeYourself", { required: true, minLength: 2 })} className="form-select" type="select" >
                            <option value="" >Choose option</option>
                            <option value="Nature,Hiking,Dirty" >Traveling is all that is on my mind</option>
                            <option value="Calm,Cafe,Mood,Chill" >Chill it's me</option>
                            <option value="Relax,Air-Conditioner,Indoor" >TV, air conditioner and sleep</option>
                        </select>
                        {errors.DescribeYourself && <div className="text-danger">* choose the best option for you</div>}
                        <label>Choose the best option for you</label>
                        <select {...register("bestOption", { required: true, minLength: 2 })} className="form-select" type="select" >
                            <option value="" >Choose option</option>
                            <option value="Indoor,Air-Conditioner,Clean,Smart" >Must have air conditioner</option>
                            <option value="Nature,Outdoor,Open space,Green space,Megical" >An open place with a crazy view</option>
                            <option value="null" >I don't care</option>
                        </select>
                        {errors.bestOption && <div className="text-danger">* choose the best option for you</div>}
                        <label>What kind of entertainment do you want?</label>
                        <select {...register("kind", { required: true, minLength: 2 })} className="form-select" type="select" >
                            <option value="" >Choose option</option>
                            <option value="Extreme" >Extreme</option>
                            <option value="Calm" >Calm place</option>
                            <option value="Food" >Just bring me food</option>
                        </select>
                        {errors.kind && <div className="text-danger">* choose the best option for you</div>}
                        <label>who's coming?</label>
                        <select {...register("members", { required: true, minLength: 2 })} className="form-select" type="select" >
                            <option value="" >Choose option</option>
                            <option value="Just me" >Just me</option>
                            <option value="With friends" >Group of friends</option>
                            <option value="Couple experience" >My soulmate</option>
                            <option value="Family experience" >My family</option>
                        </select>
                        {errors.members && <div className="text-danger">* choose the best option for you</div>}
                        <button className='find_btn'>Find me a place</button>
                    </form>
                </div>}
            {(!loading && isAnswer && myPlaces.length == 0) ? <h3>Sorry, we couldn't find the right place for you</h3> :
                <div className="row mt-5 justify-content-center place_click g-4">
                    {myPlaces.map(item => {
                        return (
                            <PlaceBoxItem key={item._id} item={item} />
                        )
                    })}
                </div>}
        </div>
    )
}
