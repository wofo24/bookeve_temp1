// import * as React from 'react';
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material'

import TextField from '@mui/material/TextField';

// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import { openAdd_Address, closeAdd_Address } from '../../Redux/actions/actions';
export default function Add_address() {
    const openAdd = useSelector((state) => state.open_add_dialog)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState([])

    const [formErrors, setFormErrors] = useState({});
    const handleClose = () => {
        dispatch(closeAdd_Address())
    };




    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    }
    // console.log(formData, 'form data')

    const handleSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            <Dialog
                open={openAdd}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Add Address
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                    </DialogContentText>

                    <Box px={2} py={1}>
                        <form onSubmit={handleSubmit}>
                            <Box py={0}>
                                <Grid container>
                                    <Grid xs={12} item>
                                        <TextField
                                            onChange={handleChange}
                                            fullWidth
                                            type='tel'  // Use type 'tel' for phone numbers
                                            id="standard-textarea"
                                            label="House/Flat No."
                                            name='phone_number'
                                            required
                                            variant="standard"
                                            error={!!formErrors.phone_number}
                                            helperText={formErrors.phone_number}
                                        />
                                        <Grid xs={12} item>
                                            <TextField
                                                onChange={handleChange}
                                                fullWidth
                                                type='tel'  // Use type 'tel' for phone numbers
                                                id="standard-textarea"
                                                label="Street"
                                                name='street'
                                                required

                                                variant="standard"
                                                error={!!formErrors.phone_number}
                                                helperText={formErrors.phone_number}
                                            />
                                        </Grid>

                                        <Grid xs={12} item>
                                            <TextField
                                                onChange={handleChange}
                                                fullWidth
                                                type='tel'  // Use type 'tel' for phone numbers
                                                id="standard-textarea"
                                                label="City"
                                                name='city'
                                                required

                                                variant="standard"
                                                error={!!formErrors.phone_number}
                                                helperText={formErrors.phone_number}
                                            />
                                        </Grid>

                                        <Grid xs={12} item>

                                            <TextField
                                                onChange={handleChange}
                                                fullWidth
                                                type='tel'  // Use type 'tel' for phone numbers
                                                id="standard-textarea"
                                                label="Postal Code"
                                                name='postal_code'
                                                required
                                                inputProps={{
                                                    pattern: "^[0-9]{6}$",
                                                }}
                                                variant="standard"
                                                error={!!formErrors.phone_number}
                                                helperText={formErrors.phone_number}
                                            />
                                        </Grid>
                                        <Grid xs={12} item>
                                            <TextField
                                                onChange={handleChange}
                                                fullWidth
                                                type='tel'  // Use type 'tel' for phone numbers
                                                id="standard-textarea"
                                                label="State"
                                                name='state'
                                                required
                                                variant="standard"
                                                error={!!formErrors.phone_number}
                                                helperText={formErrors.phone_number}
                                            />
                                        </Grid>

                                    </Grid>




                                </Grid>
                            </Box>
                        </form>


                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleClose} autoFocus>
                        Save!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
