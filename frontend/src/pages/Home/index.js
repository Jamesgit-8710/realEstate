import React, { useEffect } from 'react'
import './style.css'
import Layout from '../Layout'
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import searchbarSchema from '../../schema/searchbar.schema'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setTab } from '../../features/user/user.slice'
import cities from '../../data/cities.json'

const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(searchbarSchema)
    })

    const submit = (data) => {
        navigate(`/${data.chooseArea}/${data.propertyType}`)
    }

    useEffect(() => {
        dispatch(setTab(1))
    }, [])

    return (
        <Layout>
            <div className='home'>
                <Box className='searchBar' component='form' onSubmit={handleSubmit(submit)}>
                    <div className='inputFields'>
                        <div className='searchInputs'>
                            <Controller
                                name="chooseArea"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        disablePortal
                                        options={cities}
                                        renderInput={(params) => <TextField {...params} label="Choose area" />}
                                        size='small'
                                        onChange={(_, value) => {
                                            field.onChange(value?.value);
                                        }}
                                    />
                                )}
                            />
                            <p className='helperText'>{errors.chooseArea && errors.chooseArea.message}</p>
                        </div>
                        <div className='searchInputs'>
                            <FormControl fullWidth>
                                <InputLabel size='small'>Looking for</InputLabel>
                                <Controller
                                    name="propertyType"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Looking for"
                                            size='small'
                                        >
                                            <MenuItem value={'flat'}>Flat</MenuItem>
                                            <MenuItem value={'pg'}>PG</MenuItem>
                                            <MenuItem value={'property'}>Property to buy</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <p className='helperText'>{errors.propertyType && errors.propertyType.message}</p>
                        </div>
                    </div>
                    <Button variant="contained" size='large' className='searchBtn' type='submit'>SEARCH</Button>
                </Box>
            </div>
        </Layout>
    )
}

export default Home
