import React, { useContext, useEffect } from 'react'
import '../../../css/favorites.css'
import FPlaceItem from './fPlaceItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../../loading';


export default function PlaceArea({ favorites, getFavorites, onDeleteOrAddToFavorite , isLoading}) {
    const nav = useNavigate();

    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <div className='conatiner-fluid'>
            <div className="container">
                <h3>My favorites</h3>
                {isLoading ? <Loading/> :
                    <div className="row g-3">
                        {favorites.map(item => {
                            return (
                                <FPlaceItem key={item._id} item={item} onDeleteOrAddToFavorite={onDeleteOrAddToFavorite} />
                                )
                        })}
                                {favorites.length == 0 && !isLoading && <div>
                                    <h4 className='msg'>there are no favorite places yet!</h4>
                                    <button onClick={() => {
                                        nav("/places")
                                    }} className='search'>search places</button>
                                </div>}
                    </div>
                }
            </div>
        </div>
    )
}
