import React, { useEffect, useState } from 'react'
import '../css/aboutUs.css'
import { API_URL, doApiGet } from '../services/apiService';
import PlaceBoxItem from './places/placeBoxItem';
import AOS from 'aos'
import 'aos/dist/aos.css';


export default function AboutUs() {
    const [arPlaces, setArPlaces] = useState([]);

    useEffect(() => {
        AOS.init();
        getPlaces();
    }, []);

    const getPlaces = async () => {
        try {
            const url = API_URL + "/places?perPage=3";
            const data = await doApiGet(url);
            setArPlaces(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ backgroundImage: 'url("images/aboutUsBG.jpg")' }} className="aboutUs container-fluid">
            <div className="container">
                <div data-aos="fade-up" className="ourImg row py-4 justify-content-center">
                    <img src='images/raz.jpg' alt='raz_img' className='raz_img' />
                    <img src='images/noy.jpg' alt='noy_img' className='noy_img ' />
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                    <h2>Nice to meet you</h2>
                    <p>Welcome to ChillSpace, your ultimate website to uncovering the most joyful and enchanting places across our country, Israel. Created with passion and a shared love for exploration by lifelong friends Noy and Raz, our website is dedicated to making your journey of discovering happiness-filled places both seamless and delightful.</p>
                    <p>
                        At ChillSpace, we understand that the pursuit of  is a universal endeavor, and what better way to experience it than by immersing oneself in the breathtaking beauty and rich culture of Israel? With our extensive research, insider knowledge, and genuine enthusiasm, we aim to be your trusted companions in unlocking the hidden gems that radiate happiness in every corner of this remarkable land.</p>
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                    <h3>Our favorite places:</h3>
                    <div className="row justify-content-center pb-5 g-4 place_click">
                        {arPlaces.length > 0 && arPlaces.map(item => {
                            return (
                                <PlaceBoxItem item={item} key={item._id} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
