import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { PaginationButtons } from '../../components/paginationButtons';
import Loading from '../../components/loading';
import '../../css/tablesAdmin.css'
import { toast } from 'react-toastify';

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
        } catch (error) {
            console.log(error);
        }
    }

    const deletePlace = async (_delId) => {
        try {
            if (window.confirm("Are you sure you want to delete this place?")) {
                const url = API_URL + "/places/" + _delId;
                const data = await doApiMethod(url, "DELETE");
                if (data.deletedCount) {
                    doApiGetPlaces();
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("There is a problem, please try again later");
        }
    }

    return (
        <div className='container-fluid'  style={{minHeight:300}}>

        <div className='container'>
            <h2 className='display-2 text-center mt-4'>Places List</h2>
            <button className='btn btn-outline-dark' onClick={() => { nav("/admin/places/add") }}>Add new place</button>
            <div className="table-container">
                {places.length != 0 ? (
                    <table className='table table-hover table-striped'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Area</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Categories_code</th>
                                <th>Tags</th>
                                <th>Edit/Delete</th>
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
                                        <td>{(item.categories_code).map((itemCategory, i) => {
                                            return (
                                                i == 0 ? itemCategory : " | " + itemCategory
                                            )
                                        })}</td>
                                        <td>{(item.tags_name).map((tag, i) => {
                                            return (
                                                i == 0 ? tag : " | " + tag
                                            )
                                        })}</td>
                                        <td>
                                            <button onClick={() => {
                                                nav("edit/" + item._id)
                                            }} className='m-1 btn btn-outline-dark'>Edit</button>
                                            <button onClick={() => { deletePlace(item._id) }} className='m-1 btn btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <Loading />
                )}
            </div>
            <div className="d-flex justify-content-center my-3">
                <PaginationButtons
                    currentPage={currentPage}
                    pages={pages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
        </div>
    )
}
