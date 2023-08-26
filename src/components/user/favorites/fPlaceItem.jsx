import '../../../css/favorites.css'
import { BsFillBookmarkFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import { useState } from 'react';

export default function FPlaceItem(props) {
    const place = props.item;
    const img_url = place.img_url || "/images/defualtImg.jpg";
    const nav = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    return (
        <div className='col-6 col-lg-4 backgroundItem'>
            <div style={{ backgroundImage: `url(${img_url})` }} className="place_item p-3 d-flex align-items-end justify-content-between">
                <p className='place_name m-0' onClick={() => {
                    nav("/places/" + place._id)
                }}>{place.name}</p>
                <Button variant="outlined" onClick={handleClickOpen} className='love_btn'>
                    <BsFillBookmarkFill className='h2 m-0' />
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Remove from favorites"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to remove this place?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} className='text-dark'>Disagree</Button>
                        <Button onClick={() => {
                            handleClose();
                            props.onDeleteOrAddToFavorite(place._id);
                        }} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
