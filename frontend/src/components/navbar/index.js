import React, { useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setIsLoggedIn, setTab } from '../../features/user/user.slice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Navbar = () => {
    const currentTab = useSelector((state) => state.user.currentTab);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleTabChange = (tabIndex) => {
        if (tabIndex === 1) {
            navigate('/')
        } else if (tabIndex === 2) {
            navigate('/listing')
        }
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        localStorage.removeItem('token')
        dispatch(setIsLoggedIn())
    }

    return (
        <div className='navbar'>
            <div className='navbarContainer'>
                <p className='logo'>RealEstate</p>
                <div className='rightNavbar'>
                    <p style={{ color: currentTab === 1 ? 'rgb(0, 136, 255)' : '' }} className='tab' onClick={() => handleTabChange(1)}>Home</p>
                    <p style={{ color: currentTab === 2 ? 'rgb(0, 136, 255)' : '' }} className='tab' onClick={() => handleTabChange(2)}>Listing</p>
                    <p style={{ color: currentTab === 3 ? 'rgb(0, 136, 255)' : '' }} className='tab'>Link3</p>
                    <p style={{ color: 'red' }} className='tab' onClick={() => handleClickOpen()}>Logout</p>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    This action will securely sign you out of your account.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>no</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Navbar
