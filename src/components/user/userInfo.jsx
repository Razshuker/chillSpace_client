import React, { useContext } from 'react'
import '../../App.css'
import { TOKEN_KEY } from '../../services/apiService'
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/myContext';
import Loading from '../loading';

export default function UserInfo({ handleClose }) {
    const nav = useNavigate();
    const { userInfo, setUserInfo } = useContext(MyContext)

    if (!Object.keys(userInfo).length) {
        return <Loading />
    }

    return (
        <div style={{
            backgroundImage: `url("/images/loginBG.jpg")`
        }} className='userInfo container text-center pt-3' >
            <h3 className='m-0'>Welcome {userInfo.full_name}!</h3>
            <p className='text-center m-0'>{userInfo.nickname}</p>
            <div className="d-flex align-items-center justify-content-center list pt-2">
                <ul onClick={handleClose} className='p-0 list-inline'>
                    <li><Link to="/user/favorites">FAVORITES</Link></li>
                    <li><Link to="#">MY POSTS</Link></li>
                    <li><Link to="/user/updateAccount">UPDATE ACCOUNT DETAILS</Link></li>
                </ul>
            </div>
            <button onClick={() => {
                localStorage.removeItem(TOKEN_KEY);
                setUserInfo({});
                handleClose();
                alert("you logged out");
                nav("/");
            }} className='btn'>Logout</button>
        </div>
    )
}
