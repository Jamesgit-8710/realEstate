import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'

const ShowSnackbar = ({ open, type, handleClose, message }) => {

    const snackbarMessage = message;

    return (
        <div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={type}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ShowSnackbar
