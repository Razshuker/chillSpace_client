import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/tablesAdmin.css'
import { toast } from 'react-toastify';

export default function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        doApi();
    }, []);

    const doApi = async () => {
        try {
            const url = API_URL + "/categories";
            const data = await doApiGet(url);
            setCategories(data);
        } catch (error) {
            console.log(error);
            toast.error("there is a problem, try again later")
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
            <h1 className='display-4 text-center my-5'>Categories List:</h1>
            <div className="container">
                <Link to={"add"} className='btn btn-outline-dark my-4'>Add new category</Link>
                <div className="table-container">
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
                                        <td>{i + 1}</td>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.category_code}</td>
                                        <td>{item.description}</td>
                                        <td>{Date().toString(item.date_created).substring(3, 15)}</td>
                                        <td><button onClick={() => {
                                            nav("edit/" + item._id);
                                        }} className='btn'>edit</button><button onClick={() => {
                                            onDeleteCat(item._id, item.name);
                                        }} className='btn btn-danger'>X</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
