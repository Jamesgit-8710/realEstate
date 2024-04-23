import React from 'react'
import './style.css'
import building from '../../../assets/buildiing.png'
import car from '../../../assets/car.png'
import wifi from '../../../assets/wifi.png'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const Card = ({ property }) => {
  const propertyType = property.property_type !== 'property' ? property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1) : 'Selling property';

  const poc = property.poc.charAt(0).toUpperCase() + property.poc.slice(1);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='card'>
        <div className='propertyImage'></div>
        <div className='propertyBrief'>
          <div className='details'>
            <h4 className='buildingName'>{property.building_name}</h4>
            <p className='address'>{property.address}, {property.city}</p>
            <h2 className='price'>₹ {property.amount}</h2>
            <div className='facilities'>
              <div className='facility'>
                <img src={building} height={18} />
                <p style={{ marginLeft: "6px", color: "#9ab3bf", fontSize: "0.8rem" }}>{propertyType}</p>
              </div>
              <div className='facility'>
                <img src={car} height={18} />
                <p style={{ marginLeft: "6px", color: "#9ab3bf", fontSize: "0.8rem" }}>Parking</p>
              </div>
              <div className='facility'>
                <img src={wifi} height={18} />
                <p style={{ marginLeft: "6px", color: "#9ab3bf", fontSize: "0.8rem" }}>Wifi</p>
              </div>
            </div>
            <h4 className='moreDetails' onClick={() => handleClickOpen()}>More details</h4>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {property.building_name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {property.address}
            <h2 className='price'>₹ {property.amount}</h2>
            <div className='facilities'>
              <div className='facility'>
                <img src={building} height={18} />
                <p style={{ marginLeft: "6px", color: "#9ab3bf", fontSize: "0.8rem" }}>{property.property_size}{propertyType==='Pg'?'Sharing':'BHK'} {propertyType}</p>
              </div>
              <div className='facility' style={{ marginLeft: "40px" }}>
                <img src={car} height={18} />
                <p style={{ marginLeft: "6px", color: "#9ab3bf", fontSize: "0.8rem" }}>Parking</p>
              </div>
              <div className='facility' style={{ marginLeft: "40px" }}>
                <img src={wifi} height={18} />
                <p style={{ marginLeft: "6px", color: "#9ab3bf", fontSize: "0.8rem" }}>Wifi</p>
              </div>
            </div>
            <h3 style={{fontWeight: "500", color: "black", marginTop: "40px"}}>{poc} details</h3>
            <p style={{marginTop: "7px"}}> Name: <span style={{color: "blue"}}>{property.poc_name}</span></p>
            <p style={{marginTop: "7px"}}>Email: <span style={{color: "blue"}}>{property.poc_email}</span></p>
            <p style={{marginTop: "7px"}}>Contact number: <span style={{color: "blue"}}>{property.poc_contact}</span></p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Card
