import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/tablesAdmin.css'
import { toast } from 'react-toastify';
import Loading from '../../components/loading';
import { PaginationButtons } from '../../components/paginationButtons';

export default function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const nav = useNavigate();

    useEffect(() => {
        doApi();
        doApiCount();
    }, [currentPage]);

    const doApi = async () => {
        try {
            const url = API_URL + "/categories?page="+currentPage;
            const data = await doApiGet(url);
            setCategories(data);
        } catch (error) {
            console.log(error);
            toast.error("there is a problem, try again later")
        }
    }

    const doApiCount = async () => {
        try {
            const url = API_URL + "/categories/count";
            const count = await doApiGet(url);
            setPages(Math.ceil(count / 6))
        } catch (error) {
            console.log(error);
        }
    }

    const onDeleteCat = async (_id, _name) => {
        try {
            if (window.confirm(`Are you sure you want to delete "` + _name + `"?`)) {
                const url = API_URL + "/categories/" + _id;
                const data = await doApiMethod(url, "DELETE");
                if (data.deletedCount) {
                    doApi();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container-fluid'>
            <h1 className='display-4 text-center my-4'>Categories List:</h1>
            <div className="container">
                <Link to={"add"} className='btn btn-outline-dark mb-4'>Add new category</Link>
                <div className="table-container">
                    {categories.length != 0 ? (

                    <table className='table table-hover table-striped'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>CATRGORY CODE</th>
                                <th>DESCRIPTION</th>
                                <th>DATE CREATED</th>
                                <th>EDIT / DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((item, i) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{(currentPage - 1) * 6 + i + 1}</td>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.category_code}</td>
                                        <td>{item.description}</td>
                                        <td>{Date().toString(item.date_created).substring(3, 15)}</td>
                                        <td><button onClick={() => {
                                            nav("edit/" + item._id);
                                        }} className='btn btn-outline-dark mx-1
                                        '>edit</button><button onClick={() => {
                                            onDeleteCat(item._id, item.name);
                                        }} className='btn btn-danger'>X</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    ):
                    <Loading/>}
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
