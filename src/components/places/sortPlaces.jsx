import React from 'react'
import SearchForm from './searchForm'

export default function SortPlaces({ setShowSort, isShowSort }) {
    return (
        <div className='sortMenu col-4 border h-100'>
            <SearchForm setShowSort={setShowSort} isShowSort={isShowSort} />
            <div className='mt-5'>
                <h4 className='display-6 text-center'>location</h4>
                <div className='m-4'>
                    <input type="checkbox" id="scales" name="scales" />
                    <label className='ms-1' for="scales">Scales</label>
                </div>
                <div className='m-4'>
                    <input type="checkbox" id="scales" name="scales" />
                    <label className='ms-1' for="scales">Scales</label>
                </div>
                <div className='m-4'>
                    <input type="checkbox" id="scales" name="scales" />
                    <label className='ms-1' for="scales">Scales</label>
                </div>
                <div className='m-4'>
                    <input type="checkbox" id="scales" name="scales" />
                    <label className='ms-1' for="scales">Scales</label>
                </div>


                <h4 className='display-6 text-center'>what to do</h4>
                <div className='m-4'>
                    <input type="checkbox" id="scales" name="scales" />
                    <label className='ms-1' for="scales">Scales</label>
                </div>
                <div className='m-4'>
                    <input type="checkbox" id="scales" name="scales" />
                    <label className='ms-1' for="scales">Scales</label>
                </div>
                <div className='m-4'>
                    <input type="checkbox" id="scales" name="scales" />
                    <label className='ms-1' for="scales">Scales</label>
                </div>
                <div className='m-4'>
                    <input type="checkbox" id="scales" name="scales" />
                    <label className='ms-1' for="scales">Scales</label>
                </div>

            </div>
        </div>
    )
}
