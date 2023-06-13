import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';

export default function PlacesList() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        doApiGetPlaces();
    }, [])



    const doApiGetPlaces = async () => {
        try {
            const url = API_URL + "/places";
            const data = await doApiGet(url);
            console.log(data)
            setPlaces(data);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='container'>
            <h2>Places List</h2>
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
                                <td>{i + 1}</td>
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
                                <td>{(item.categories_code).map((itemCategory) =>{
                                    return(
                                       itemCategory + " | " 
                                    )
                                })}</td>

                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}
