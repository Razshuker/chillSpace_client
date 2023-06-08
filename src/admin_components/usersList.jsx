import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../services/apiService';
import axios from 'axios';

export default function UsersList() {
    const [users_ar, setUsersAr] = useState([]);

    useEffect(() => {
        doApi();
    }, []);

    const doApi = async () => {
        const url = API_URL + "/users/usersList";
        const data = await doApiGet(url);
        console.log(data);
        setUsersAr(data);
    }

    return (
        <div className='container-fluid'>
            <h1 className='display-2 text-center mt-5'>Users List:</h1>
            <div className="container">
                <table className='table'>
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
                            <th>EDIT / DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users_ar.map((item, i) => {
                            return (
                                <tr key={item._id}>
                                    <td>{i + 1}</td>
                                    <td>{item.full_name}</td>
                                    <td>{item.nickname}</td>
                                    <td>{item.img_url}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.location}</td>
                                    <td>{item.favorites}</td>
                                    <td><button className='btn btn-outline-dark'>{item.role}</button></td>
                                    <td><button className='btn btn-outline-dark'>EDIT</button><button className='btn btn-danger'>DELETE</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
