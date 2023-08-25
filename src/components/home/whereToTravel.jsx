import React, { useContext, useEffect, useState } from 'react'
import '../../css/home.css'
import { useForm } from "react-hook-form"
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService'
import Loading from '../loading'
import PlaceBoxItem from '../places/placeBoxItem'
import { toast } from 'react-toastify'
import { MyContext } from '../../context/myContext'

export default function WhereToTravel() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [myPlaces, setMyPlaces] = useState([]);
    const [isAnswer, setIsAnswer] = useState(false);
    const [loading, setLoading] = useState(false);
    const { userInfo } = useContext(MyContext);

    useEffect(() => {
        initMatches();
    }, [userInfo])

    const initMatches = async () => {
        const urlMatch = userInfo.matchPlacesUrl ? userInfo.matchPlacesUrl : "";
        if (urlMatch != "" && localStorage[TOKEN_KEY]) {
            try {
                setLoading(true);
                const url = API_URL + `/places/whereToTravel?${urlMatch}`;
                const data = await doApiGet(url);
                setMyPlaces(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    const onSub = async (_data) => {
        setLoading(true);
        if (!localStorage[TOKEN_KEY]) {
            toast.error("You must login to get your results");
            setLoading(false);
        } else {
            try {
                const ansUrl = `kind=${_data.kind}&members=${_data.members}&tags_ar=${_data.DescribeYourself},${_data.bestOption}`;
                const url = API_URL + `/places/whereToTravel?${ansUrl}`;
                const data = await doApiGet(url);
                setMyPlaces(data);
                setIsAnswer(true);
                setLoading(false);
                changeUrlMatch(ansUrl);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    const changeUrlMatch = async (_newUrl) => {
        try {
            const updateMatchUrl = API_URL + "/users/changeUrlMatch/" + _newUrl;
            await doApiMethod(updateMatchUrl, "PATCH");
            // if(dataMatch.modifiedCount){
            // }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='whereToTravel container p-4 my-3'>
            <h2 className='text-center'>WHERE TO TRAVEL</h2>
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
                    {myPlaces.length == 0 ?
                        <button className='find_btn'>Find me places</button> : <button className='find_btn'>Find me new places</button>
                    }
                </form>
            </div>
            {loading ? <Loading /> :
                <div className="row mt-5 justify-content-center place_click g-4">
                    {myPlaces.map(item => {
                        return (
                            <PlaceBoxItem key={item._id} item={item} />
                        )
                    })}
                </div>
            }
            {myPlaces.length == 0 && isAnswer && <h3>Sorry, we couldn't find the right place for you</h3>}

        </div>
    )
}
