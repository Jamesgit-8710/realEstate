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
import house from '../../assets/house.png'
import mansion from '../../assets/mansion.png'
import placeholder from '../../assets/placeholder.png'
import partner1 from '../../assets/partner1.jpg'
import partner2 from '../../assets/partner2.jpg'
import partner3 from '../../assets/partner3.jpg'
import partner4 from '../../assets/partner4.jpg'
import partner5 from '../../assets/partner5.jpg'

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
            <div className='section'>
                <h1 className='sectionHeading'>See how we can help</h1>
                <div className='multiDivContainer'>
                    <div className='featureCard'>
                        <div className='featureImage'>
                            <img src={house} style={{ height: "40%" }} />
                        </div>
                        <h2 style={{ fontWeight: "600", textAlign: 'center', fontSize: "1.2rem" }}>Buy a home</h2>
                        <p style={{ fontSize: "0.9rem", textAlign: "center", margin: "5px 20px 10px", color: "rgb(142, 149, 169)" }}>Find your dream home with ease! Explore our curated selection of exquisite properties.</p>
                    </div>
                    <div className='featureCard'>
                        <div className='featureImage'>
                            <img src={mansion} style={{ height: "40%" }} />
                        </div>
                        <h2 style={{ fontWeight: "600", textAlign: 'center', fontSize: "1.2rem" }}>Rent a home</h2>
                        <p style={{ fontSize: "0.9rem", textAlign: "center", margin: "5px 20px 10px", color: "rgb(142, 149, 169)" }}>Find your dream home with ease! Explore our curated selection of exquisite properties.</p>
                    </div>
                    <div className='featureCard'>
                        <div className='featureImage'>
                            <img src={placeholder} style={{ height: "40%" }} />
                        </div>
                        <h2 style={{ fontWeight: "600", textAlign: 'center', fontSize: "1.2rem" }}>See neighborhoods</h2>
                        <p style={{ fontSize: "0.9rem", textAlign: "center", margin: "5px 20px 10px", color: "rgb(142, 149, 169)" }}>Find your dream home with ease! Explore our curated selection of exquisite properties.</p>
                    </div>
                </div>
            </div>
            <div className='section2'>
                <h1 className='sectionHeading'>Property featured</h1>
                <p style={{width: "80%", textAlign: "center", fontSize: "0.9rem", color: "rgb(144, 160, 181)", marginTop: "10px"}}>Elevate your living experience. Discover our meticulously curated selection of premier properties, tailored to exceed your expectations.</p>
                <div className='propertyFeatured'>
                    <div className='featured'>
                        <h2>100% Security</h2>
                        <p>Experience peace of mind with our uncompromising commitment to 100% security.</p>
                    </div>
                    <div className='featured'>
                        <h2>Parkers and movers</h2>
                        <p>Simplify your move with trusted parkers and movers who handle every detail.</p>
                    </div>
                    <div className='featured'>
                        <h2>Free air conditioner</h2>
                        <p>Enjoy cool comfort year-round with our complimentary air conditioner offer.</p>
                    </div>
                    <div className='featured'>
                        <h2>Rental furniture</h2>
                        <p>Transform your space instantly with hassle-free rental furniture solutions.</p>
                    </div>
                    <div className='featured'>
                        <h2>Flower garden</h2>
                        <p>Immerse yourself in nature's beauty with our stunning flower garden facility.</p>
                    </div>
                    <div className='featured'>
                        <h2>Swimming pool</h2>
                        <p>Dive into luxury and relaxation with our sparkling swimming pool.</p>
                    </div>
                </div>
            </div>
            <div className='section'>
                <h1 className='sectionHeading'>Our Partners</h1>
                <div className='partnersContainer'>
                    <img className='partners' src={partner1} />
                    <img className='partners' src={partner2} />
                    <img className='partners' src={partner3} />
                    <img className='partners' src={partner4} />
                    <img className='partners' src={partner5} />
                </div>
            </div>
            <div className='footer'></div>
        </Layout>
    )
}

export default Home
