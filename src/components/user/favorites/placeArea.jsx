import React, { useContext, useEffect } from 'react'
import '../../../css/favorites.css'
import FPlaceItem from './fPlaceItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../../loading';


export default function PlaceArea({ favorites, getFavorites, onDeleteOrAddToFavorite }) {
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getFavorites();
        setIsLoading(false);
    }, []);



    return (

        <div className='conatiner-fluid'>
            <div className="container">
                <h3>My favorites</h3>
                {isLoading ? <Loading /> :
                    <div className="row g-3">
                        {favorites.length == 0 && <div>
                            <h4 className='msg'>there are no favorite places yet!</h4>
                            <button onClick={() => {
                                nav("/places")
                            }} className='search'>search places</button>
                        </div>}
                        {favorites.map(item => {
                            return (
                                <FPlaceItem key={item._id} item={item} onDeleteOrAddToFavorite={onDeleteOrAddToFavorite} />
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}
