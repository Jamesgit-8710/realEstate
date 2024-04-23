import React, { useEffect } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Layout from '../Layout';
import { getPropertyList } from '../../features/property/property.action';
import Card from './Card';
import { setTab } from '../../features/user/user.slice';

const Properties = () => {
    const { city, propertyType } = useParams();
    const dispatch = useDispatch();

    const properties = useSelector((state) => state.property.propertyList)

    useEffect(() => {
        dispatch(getPropertyList({ area: city, propertyType: propertyType }))
        dispatch(setTab(0))
    }, [])

    return (
        <Layout>
            <div className='properties'>
                {
                    properties.length === 0 ?
                        <p style={{ textAlign: "center", marginTop: "30vh" }}>No property found!</p>
                        :
                        <div className='cards'>
                            {
                                properties.map((property) => {
                                    return <Card property={property} />
                                })
                            }
                        </div>
                }
            </div>
        </Layout>
    )
}

export default Properties
