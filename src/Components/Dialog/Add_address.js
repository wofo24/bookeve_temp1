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
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';

import { openAdd_Address, closeAdd_Address } from '../../Redux/actions/actions';
import Media from 'react-media';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Add_address() {

    const buttonStyles = useSelector((state) => state.apply_new_theme)

    const textStyle = useSelector((state) => state.apply_new_theme)

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

            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.small && (

                    <Dialog
                        fullScreen
                        open={openAdd}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        PaperProps={{ style: { borderRadius: '15px', zIndex: '99999', marginTop: '500px' } }}
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                            <Typography sx={{ fontFamily: textStyle.fontFamily }}> <b>Add new address</b></Typography>
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {/* Add Address */}
                            </DialogContentText>

                            <Box px={2} py={0} sx={{ overflow: 'scroll' }}>
                                <form onSubmit={handleSubmit}>
                                    <Box>
                                        <Grid container >
                                            <Grid xs={12} item>
                                                <TextField sx={{ my: 1 }}
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
                                                    <TextField sx={{ my: 1 }}
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
                                                    <TextField sx={{ my: 1 }}
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

                                                    <TextField sx={{ my: 1 }}
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
                                                    <TextField sx={{ my: 1 }}
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
                                    <DialogActions sx={{ p: 2 }}>
                                        <Button style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} onClick={handleClose}>No</Button>

                                        <Button variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} onClick={handleClose} >
                                            Save
                                        </Button>
                                    </DialogActions>
                                </form>

                            </Box>
                        </DialogContent>

                    </Dialog>


                )
                }
            </Media >

            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.large && (
                    <>
                        <Dialog
                            open={openAdd}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            PaperProps={{ style: { borderRadius: '15px' } }}
                        >

                            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                <Typography sx={{ fontFamily: textStyle.fontFamily }}> <b>Add new address</b></Typography>
                            </DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {/* Add Address */}
                                </DialogContentText>

                                <Box px={2} py={0} width={550} >
                                    <form onSubmit={handleSubmit}>
                                        <Box>
                                            <Grid container spacing={3} >
                                                <Grid item xs={6}>
                                                    <TextField sx={{ my: 1 }}
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
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField sx={{ my: 1 }}
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




                                                <Grid xs={6} item>
                                                    <TextField sx={{ my: 1 }}
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

                                                <Grid xs={6} item>

                                                    <TextField sx={{ my: 1 }}
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
                                                    <TextField sx={{ my: 1 }}
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
                                        </Box>
                                    </form>
                                </Box>
                            </DialogContent>
                            <DialogActions sx={{ p: 2 }}>
                                <Button style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} onClick={handleClose}>No</Button>

                                <Button variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} onClick={handleClose} >
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog >
                    </>
                )
                }

            </Media >


        </div >
    );
}
