import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import '../css/tablesAdmin.css'

export default function UsersList() {
    const [users_ar, setUsersAr] = useState([]);

    useEffect(() => {
        doApi();
    }, []);

    const doApi = async () => {
        try {
            const url = API_URL + "/users/usersList";
            const data = await doApiGet(url);
            console.log(data);
            setUsersAr(data);
        } catch (error) {
            console.log(error);
            alert("there is a problem, try again later")
        }
    }

    const changeRole = async (_id, _role) => {
        try {
            const newRole = _role == "admin" ? "user" : "admin";
            const url = API_URL + "/users/changeRole/" + _id + "/" + newRole;
            const data = await doApiMethod(url, "PATCH");
            if (data.modifiedCount) {
                doApi();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (_id, _name) => {
        try {
            if (window.confirm("Are you sure you want to delete " + _name + " account?")) {
                const url = API_URL + "/users/delete/" + _id;
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
            {users_ar.length > 0 &&
                <div>
                    <h1 className='display-4 text-center my-5'>Users List:</h1>
                    <div className="container table-container">
                        <table className='table table-hover table-striped'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>FULL NAME</th>
                                    <th>NICKNAME</th>
                                    <th>IMAGE URL</th>
                                    <th>PHONE</th>
                                    <th>EMAIL</th>
                                    <th>LOCATION</th>
                                    <th>FAVORITES</th>
                                    <th>ROLE</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users_ar.map((item, i) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{i + 1}</td>
                                            <td title={item._id}>{item._id.substring(0, 5)}</td>
                                            <td>{item.full_name}</td>
                                            <td>{item.nickname}</td>
                                            <td title={item.img_url}>{item.img_url && item.img_url.substring(0, 15)}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <td>{item.location}</td>
                                            <td style={{ position: 'relative' }}>
                                                <div
                                                    style={{
                                                        height: '100px',
                                                        overflowY: 'auto',
                                                        width: '200px'
                                                    }}
                                                >
                                                    {item.favorites.map(fav => {
                                                        return (
                                                            <div key={fav}>
                                                                <p title={fav}>*{fav && fav.substring(0, 5)}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                            <td><button onClick={() => {
                                                changeRole(item._id, item.role);
                                            }} className='btn'>{item.role}</button></td>
                                            <td><button onClick={() => {
                                                deleteUser(item._id, item.full_name);
                                            }} className='btn btn-danger btn-close'></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}
