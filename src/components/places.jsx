import React, { useEffect, useState } from 'react'
import '../css/places.css'
import SortPlaces from './places/sortPlaces';
import PlacesList from './places/placesList';
import SearchForm from './places/searchForm';

export default function Places() {
    const [isShowSort, setShowSort] = useState(false);
    const [page, setPage] = useState(1);

    return (
        <div className='mb-3'>
            {isShowSort ?
                <div className='container-fluid row m-0 p-0'>
                    <div className='col-lg-4 m-0 p-0'>
                        <SortPlaces setShowSort={setShowSort} isShowSort={isShowSort} setPage={setPage} />
                    </div>
                    <div className="col-lg-8 m-0 p-0">
                        <PlacesList page={page} setPage={setPage} />
                    </div>
                </div> :
                <div className='container-fluid'>
                    <SearchForm setShowSort={setShowSort} isShowSort={isShowSort} setPage={setPage} />
                    <PlacesList page={page} setPage={setPage} />
                </div>
            }

        </div>
    )
}
