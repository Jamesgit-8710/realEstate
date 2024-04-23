import React, { useEffect, useState } from 'react'
import './style.css'
import Navbar from '../../components/navbar'
import ShowSnackbar from '../../components/snackbar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessage } from '../../features/property/property.slice'

const Layout = ({ children }) => {
    const message = useSelector((state) => state.property.message);
    const type = useSelector((state) => state.property.type);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(message!==''){
            setOpen(true)
            setTimeout(() => {
                dispatch(deleteMessage())
            }, 3000);
        }
    },[message])

    return (
        <div className='layout'>
            <Navbar />
            <div>
                {children}
            </div>
            <ShowSnackbar open={open} type={type} handleClose={handleClose} message={message} />
        </div>
    )
}

export default Layout
