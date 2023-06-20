import React from 'react'
import '../../css/favorites.css'
import PlaceArea from './favorites/placeArea'
import Map from './favorites/map'

export default function Favorites() {
    return (
        <div className='favorites container-fluid'>
            <div className="container">
                <div className="row">
                    <div className="placeArea col-7">
                        <PlaceArea />
                    </div>
                    <div className="map col-5">
                        <Map />
                    </div>
                </div>
            </div>
        </div>
    )
}
