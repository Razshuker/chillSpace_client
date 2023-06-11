import * as React from 'react';
import "../../css/header.css";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';

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
                    <div className='profile p-5'>
                        <ul className='p-0'>
                            <li><Link>A</Link></li>
                            <li><Link>A</Link></li>
                            <li><Link>A</Link></li>
                        </ul>
                    </div>
                </Typography>
            </Popover>
        </div>
    );
}