import React, { useEffect, useState } from 'react'
import './style.css'
import { Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import loginSchema from '../../schema/login.schema'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../features/user/user.action'
import ShowSnackbar from '../../components/snackbar'
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { deleteMessage, setLoading } from '../../features/user/user.slice'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const dispatch = useDispatch();
    const message = useSelector((state) => state.user.message);
    const type = useSelector((state) => state.user.type);
    const [open, setOpen] = useState(false);
    const loading = useSelector((state) => state.user.loading);
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    })

    const submit = (data) => {
        dispatch(loginUser(data))
    }

    const handleClose = () => {
        setOpen(false);
    };

    const signup = () => {
        navigate('/signup')
    }

    useEffect(() => {
        if (message !== '') {
            setOpen(true);
            setTimeout(() => {
                dispatch(deleteMessage())
            }, 3000);
        }

        if(loading)
        dispatch(setLoading())

    }, [message])

    return (
        <div className='login'>
            <div className='loginContainer'>
                <h2 className='loginHeading'>Login to RealEstate</h2>
                <Box component="form" sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%" }} onSubmit={handleSubmit(submit)}>
                    <TextField label="Email" variant="outlined" size='small' className='input' fullWidth {...register('email')} />
                    <p className='helperText'>{errors.email && errors.email.message}</p>
                    <TextField label="Password" variant="outlined" size='small' className='input' fullWidth {...register('password')} />
                    <p className='helperText'>{errors.password && errors.password.message}</p>
                    {
                        loading ?
                            <LoadingButton
                                loading
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="outlined"
                                className='input'
                                fullWidth
                                sx={{ alignItems: "center !important" }}
                            >
                                Sign in
                            </LoadingButton>
                            :
                            <Button variant="contained" className='input' fullWidth type='submit'>Sign in</Button>
                    }
                </Box>
                <p className='createAccount'>Don't have account? <span className='signup' onClick={() => signup()}>Sign up</span></p>
                <h3 className='realEstate'>Prime Properties</h3>
                <p className='tagline'>Elevate Your Living Experience with Our Tailored <br /> Real Estate Solutions.</p>
            </div>
            <ShowSnackbar open={open} type={type} handleClose={handleClose} message={message} />
        </div>
    )
}

export default Login
