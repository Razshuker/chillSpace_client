import * as React from 'react';
import { useEffect, useState } from 'react';
import "../../App.css";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Login from '../login';
import { TOKEN_KEY } from '../../services/apiService';
import UserInfo from '../user/userInfo';
import { useContext } from 'react';
import { MyContext } from '../../context/myContext';


export default function ProfileMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { userInfo } = useContext(MyContext);
    const [userLogged, setUserLogged] = useState(false);

    useEffect(() => {
        checkCookieByName();
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const checkCookieByName = () => {
        const cookieName = "token";
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(cookieName + '=')) {
                setUserLogged(true)
            }
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} onClick={handleClick}>
                {userInfo.img_url ? <img src={userInfo.img_url} alt='profile' className='profile-img' /> : <AccountCircle className='profile_btn' fontSize='large' />}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div>
                    <div className='profile'>
                        {!userLogged ?
                            <Login handleClose={handleClose} />
                            :
                            <UserInfo handleClose={handleClose} />
                        }
                    </div>
                </div>
            </Popover>
        </div>
    );
}