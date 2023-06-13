import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

export default function PlacesList() {
    const [places, setPlaces] = useState([]);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const nav = useNavigate();

    useEffect(() => {
        doApiGetPlaces();
        doApiCount();
    }, [currentPage])



    const doApiGetPlaces = async () => {
        try {
            const url = API_URL + "/places?page=" + currentPage;
            const data = await doApiGet(url);
            console.log(data)
            setPlaces(data);
        } catch (error) {
            console.log(error)
        }
    }

    const doApiCount = async () => {
        try {
            const url = API_URL + "/places/count";
            const count = await doApiGet(url);
            setPages(Math.ceil(count / 6))
            console.log(pages);
        } catch (error) {

        }
    }


    return (
        <div className='container'>
            <h2>Places List</h2>
            <button className='btn btn-info my-3' onClick={() => { nav("/admin/places/add") }}>Add new place</button>
            <br />
            {[...Array(pages)].map((item, i) => {
                const isActive = i + 1 === currentPage;
                return (
                    <button key={i} className={`btn btn-dark my-3 mx-1 ${isActive ? 'bg-danger' : ''}`} onClick={() => {
                        setCurrentPage(i + 1);
                    }}>{i + 1}</button>
                )
            })}
           {places.length === 0 ? (
                <p>Loading...</p>
            ) : ( 
                <table className='table table-hover table-striped table-primary'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>area</th>
                            <th>type</th>
                            <th>description</th>
                            <th>categories_code</th>

                        </tr>
                    </thead>

                    <tbody>
                        {places.map((item, i) => {
                            return (
                                <tr key={item._id}>
                                    <td>{(currentPage - 1) * 6 + i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.area}</td>
                                    <td>{item.type}</td>
                                    <td style={{ position: 'relative' }}>
                                        <div
                                            style={{
                                                height: '100px',
                                                overflowY: 'auto',
                                                width: '200px'
                                            }}
                                        >
                                            {item.description}
                                        </div>
                                    </td>
                                    <td>{(item.categories_code).map((itemCategory) => {
                                        return (
                                            itemCategory + " | "
                                        )
                                    })}</td>

                                </tr>

                            )
                        })}
                    </tbody>
                </table>
             )} 
        </div>

    )
}
