import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../services/apiService';
import axios from 'axios';

export default function UsersList() {
    const [users_ar, setUsersAr] = useState([]);

    useEffect(() => {
        doApi();
    }, []);

    const doApi = async () => {
        const url = API_URL + "/usersList";
        const data = await doApiGet(url);
        setUsersAr(data);
    }

    return (
        <div className='container-fluid'>
            <h1 className='dispaly-4 text-center'>Users List:</h1>
            <div className="container">
                <table>
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

                    </tbody>
                </table>
            </div>
        </div>
    )
}
