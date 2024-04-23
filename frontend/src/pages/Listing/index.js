import React, { useEffect, useState } from 'react'
import './style.css'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux'
import { setTab } from '../../features/user/user.slice';
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import listingPropertySchema from '../../schema/listingProperty.schema';
import { listProperty } from '../../features/property/property.action';
import cities from '../../data/cities.json'
import { useNavigate } from 'react-router-dom';
import { deleteMessage } from '../../features/property/property.slice';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const Listing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const type = useSelector((state) => state.property.type)
    const message = useSelector((state) => state.property.message)
    const loading = useSelector((state) => state.property.loading)

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(listingPropertySchema)
    })

    const submit = (data) => {
        dispatch(listProperty({
            property_type: data.propertyType,
            amount: data.amount,
            property_size: data.propertySize,
            building_name: data.buildingName,
            address: data.address,
            city: data.city,
            poc: data.poc,
            poc_name: data.pocName,
            poc_email: data.pocEmail,
            poc_contact: data.pocContact
        }))
    }

    useEffect(() => {
        dispatch(setTab(2))
        if(type==='success'){
            navigate('/')
            setTimeout(() => {
                dispatch(deleteMessage())
            }, 3000);
        }
    }, [message])

    return (
        <Layout>
            <div className='listing'>
                <div className='listingLeftImage'>
                    <h2 className='listingTagline'>Sell or Rent your Property <br /><span style={{ color: "rgb(0, 136, 255)" }}>faster</span> with RealEstate</h2>
                </div>
                <Box className='listingForm' component='form' onSubmit={handleSubmit(submit)}>
                    <p className='listingFormHeading'>Start listing your property, it's free</p>
                    <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "rgb(61, 69, 103)" }}> You're looking to ...</p>
                    <FormControl fullWidth className='listingInputs'>
                        <InputLabel size='small'>looking to</InputLabel>
                        <Controller
                            name="propertyType"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Property type"
                                    size='small'
                                >
                                    <MenuItem value={'flat'}>Rent a flat</MenuItem>
                                    <MenuItem value={'pg'}>Rent a pg</MenuItem>
                                    <MenuItem value={'property'}>Sell property</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                    {errors.propertyType && <p className='helperText'>{errors.propertyType.message}</p>}
                    <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "rgb(61, 69, 103)" }}> And property details are ...</p>
                    <FormControl fullWidth className='listingInputs'>
                        <InputLabel size='small'>BHK/Sharing</InputLabel>
                        <Controller
                            name="propertySize"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="BHK/Sharing"
                                    size='small'
                                >
                                    <MenuItem value={'1'}>1</MenuItem>
                                    <MenuItem value={'2'}>2</MenuItem>
                                    <MenuItem value={'3'}>3</MenuItem>
                                    <MenuItem value={'4'}>4</MenuItem>
                                    <MenuItem value={'5'}>5</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                    {errors.propertySize && <p className='helperText'>{errors.propertySize.message}</p>}
                    <TextField label="Amount" type='number' variant="outlined" size='small' className='listingInputs' fullWidth {...register('amount')} />
                    {errors.amount && <p className='helperText'>{errors.amount.message}</p>}
                    <TextField label="Building name" variant="outlined" size='small' className='listingInputs' fullWidth {...register('buildingName')} />
                    {errors.buildingName && <p className='helperText'>{errors.buildingName.message}</p>}
                    <TextField label="Address" variant="outlined" size='small' className='listingInputs' fullWidth {...register('address')} />
                    {errors.address && <p className='helperText'>{errors.address.message}</p>}
                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                disablePortal
                                options={cities}
                                className='listingInputs'
                                renderInput={(params) => <TextField {...params} label="City" />}
                                size='small'
                                onChange={(_, value) => {
                                    field.onChange(value?.value);
                                }}
                            />
                        )}
                    />
                    {errors.city && <p className='helperText'>{errors.city.message}</p>}
                    <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "rgb(61, 69, 103)" }}>Your contact details for the buyer to reach you</p>
                    <FormControl fullWidth className='listingInputs'>
                        <InputLabel size='small'>Owner/Dealer</InputLabel>
                        <Controller
                            name="poc"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Owner/Dealer"
                                    size='small'
                                >
                                    <MenuItem value={'owner'}>Owner</MenuItem>
                                    <MenuItem value={'dealer'}>Dealer</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                    {errors.poc && <p className='helperText'>{errors.poc.message}</p>}
                    <TextField label="Name" variant="outlined" size='small' className='listingInputs' fullWidth {...register('pocName')} />
                    {errors.pocName && <p className='helperText'>{errors.pocName.message}</p>}
                    <TextField label="Email" variant="outlined" size='small' className='listingInputs' fullWidth {...register('pocEmail')} />
                    {errors.pocEmail && <p className='helperText'>{errors.pocEmail.message}</p>}
                    <TextField label="Contact" type='number' variant="outlined" size='small' className='listingInputs' fullWidth {...register('pocContact')} />
                    {errors.pocContact && <p className='helperText'>{errors.pocContact.message}</p>}
                    {/* <Button variant="contained" sx={{ marginTop: "30px" }} fullWidth type='submit'>Add property</Button> */}
                    {
                        loading ?
                            <LoadingButton
                                loading
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="outlined"
                                fullWidth
                                sx={{ alignItems: "center !important", marginTop: "30px" }}
                            >
                                Add property
                            </LoadingButton>
                            :
                            <Button variant="contained" sx={{ marginTop: "30px" }} fullWidth type='submit'>Add property</Button>
                    }
                </Box>
            </div>
        </Layout>
    )
}

export default Listing
