import * as React from 'react';
import "../../css/header.css";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Login from '../login';
import { TOKEN_KEY } from '../../services/apiService';
import UserInfo from '../user/userInfo';


export default function ProfileMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} onClick={handleClick}>
                <AccountCircle className='profile_btn' fontSize='large' />
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
                <Typography>
                    <div className='profile'>
                        {console.log(localStorage[TOKEN_KEY])}
                        {!localStorage[TOKEN_KEY] ?
                            <Login />
                            :
                            <UserInfo />
                        }
                    </div>
                </Typography>
            </Popover>
        </div>
    );
}