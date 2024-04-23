import React, { useEffect, useState } from 'react'
import './style.css'
import { Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../../features/user/user.action'
import signupSchema from '../../schema/signup.schema'
import { deleteMessage, setLoading } from '../../features/user/user.slice'
import ShowSnackbar from '../../components/snackbar'

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const message = useSelector((state) => state.user.message);
  const type = useSelector((state) => state.user.type);
  const [open, setOpen] = useState(false);

  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signupSchema)
  })

  const submit = (data) => {
    console.log(data)
    dispatch(signupUser(data))
  }

  const login = () => {
    navigate('/')
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(type === 'success'){
      reset()
    }

    if(loading)
    dispatch(setLoading())

    if (message !== '') {
      setOpen(true)
      // navigate('/')
      setTimeout(() => {
        dispatch(deleteMessage())
      }, 3000);
    }
  }, [message])

  return (
    <div className='login'>
      <div className='loginContainer'>
        <h2 className='loginHeading'>Create account</h2>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%" }} onSubmit={handleSubmit(submit)}>
          <TextField label="Username" variant="outlined" size='small' className='input' fullWidth {...register('username')} />
          <p className='helperText'>{errors.username && errors.username.message}</p>
          <TextField label="Contact number" type='number' variant="outlined" size='small' className='input' fullWidth {...register('contact')} />
          <p className='helperText'>{errors.contact && errors.contact.message}</p>
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
                Sign up
              </LoadingButton>
              :
              <Button variant="contained" className='input' fullWidth type='submit'>Sign up</Button>
          }
        </Box>
        <p className='createAccount'>Already have account? <span className='signup' onClick={() => login()}>Login</span></p>
      </div>
      <ShowSnackbar open={open} type={type} handleClose={handleClose} message={message} />
    </div>
  )
}

export default Signup
