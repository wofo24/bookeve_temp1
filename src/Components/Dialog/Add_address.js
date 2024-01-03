// import * as React from 'react';
import React, { useState, useEffect } from 'react'
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
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import { closeAdd_Address, post_address, update_address } from '../../Redux/actions/actions';
import Media from 'react-media';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Add_address() {
    const customTheme = (outerTheme) =>
        createTheme({
            components: {
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            '--TextField-brandBorderColor': `${buttonStyles.icons_Color}`,
                            '--TextField-brandBorderHoverColor': `${buttonStyles.icons_Color}`,
                            '--TextField-brandBorderFocusedColor': `${buttonStyles.icons_Color}`,
                            '& label.Mui-focused': {
                                color: `${buttonStyles.icons_Color}`,
                            },
                        },
                    },
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        notchedOutline: {
                            borderColor: `${buttonStyles.icons_Color}`,
                        },
                        root: {
                            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                                borderColor: `${buttonStyles.icons_Color}`,
                            },
                            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                                borderColor: `${buttonStyles.icons_Color}`,
                            },
                        },
                    },
                },
                MuiFilledInput: {
                    styleOverrides: {
                        root: {
                            '&:before, &:after': {
                                borderBottom: `2px solid ${buttonStyles.icons_Color}`,
                            },
                            '&:hover:not(.Mui-disabled, .Mui-error):before': {
                                borderBottom: `2px solid ${buttonStyles.icons_Color}`,
                            },
                            '&.Mui-focused:after': {
                                borderBottom: `2px solid ${buttonStyles.icons_Color}`,
                            },
                        },
                    },
                },
                MuiInput: {
                    styleOverrides: {
                        root: {
                            '&:before': {
                                borderBottom: `2px solid ${buttonStyles.icons_Color}`,
                            },
                            '&:hover:not(.Mui-disabled, .Mui-error):before': {
                                borderBottom: `2px solid ${buttonStyles.icons_Color}`,
                            },
                            '&.Mui-focused:after': {
                                borderBottom: `2px solid ${buttonStyles.icons_Color}`,
                            },
                        },
                    },
                },
            },
        });
    const outerTheme = useTheme();
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const textStyle = useSelector((state) => state.apply_new_theme)
    const openAdd = useSelector((state) => state.open_add_dialog)
    const all_address = useSelector((state) => state.all_address)
    const open_address_data = useSelector((state) => state.open_address_data)

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (open_address_data.id) {
            delete open_address_data.address
            delete open_address_data.coordinates
            const updatedAddressData = { ...open_address_data, ...formData };
            dispatch(update_address(updatedAddressData));
        }
        else {
            dispatch(post_address(formData));
        }
    };
    useEffect(() => {
        if (all_address?.posted_address_result?.response?.data?.error) {
            let updatedErrors = {};
            if (all_address?.posted_address_result?.response?.data?.error?.address_type) {
                updatedErrors['address_type'] = all_address?.posted_address_result?.response?.data?.error?.address_type[0];
            }
            if (all_address?.posted_address_result?.response?.data?.error?.postal_code) {
                updatedErrors['postal_code'] = all_address?.posted_address_result?.response?.data?.error?.postal_code[0];
            } setFormErrors(updatedErrors);
        } else {
            setFormErrors({});
            handleClose();
        }
    }, [all_address?.posted_address_result?.response?.data?.error, all_address?.posted_address_result]);

    return (
        <div>

            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.small && (
                    <>
                        <Dialog
                            fullScreen
                            open={openAdd}
                            onClose={handleClose}
                            TransitionComponent={Transition}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            PaperProps={{ style: { borderRadius: '15px', zIndex: '999999999', marginTop: '400px' } }}
                        >

                            <Grid container sx={{ mt: 0, p: 0 }}>
                                <Grid item xs={10}>
                                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                        <Typography sx={{ fontFamily: textStyle.fontFamily }}> <b>{open_address_data?.id ? 'Update address' : 'Add new address'}</b></Typography>
                                    </DialogTitle>
                                </Grid>
                                <Grid item xs={2} sx={{ display: 'grid', placeContent: 'center' }}>
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>

                            <DialogContent dividers >
                                <Box sx={{
                                    height: '70vh',
                                    overflow: 'auto',
                                    paddingBottom: '50vh',
                                    scrollBehavior: 'smooth',
                                    px: 2,
                                    '@media (max-width: 767px)': {
                                        height: '90vh',
                                    },
                                }}>
                                    <form onSubmit={handleSubmit}>
                                        <Box>
                                            <Grid container >
                                                <Grid xs={12} item>
                                                    <ThemeProvider theme={customTheme(outerTheme)}>
                                                        <TextField sx={{ my: 1 }}
                                                            onChange={handleChange}
                                                            defaultValue={open_address_data?.house_no}
                                                            fullWidth
                                                            type='text'  // Use type 'tel' for phone numbers
                                                            id="standard-textarea"
                                                            label="House/Flat No."
                                                            name='house_no'
                                                            required
                                                            variant="standard"
                                                            error={!!formErrors.house_no}
                                                            helperText={formErrors.house_no}
                                                        />
                                                        <Grid xs={12} item>
                                                            <TextField sx={{ my: 1 }}
                                                                onChange={handleChange}
                                                                defaultValue={open_address_data?.mobile_number}
                                                                fullWidth
                                                                type='tel'  // Use type 'tel' for phone numbers
                                                                id="standard-textarea"
                                                                label="Mobile number"
                                                                name='mobile_number'
                                                                required
                                                                inputProps={{
                                                                    pattern: "^[0-9]{10}$",
                                                                }}
                                                                variant="standard"
                                                                error={!!formErrors.mobile_number}
                                                                helperText={formErrors.mobile_number}
                                                            />
                                                        </Grid>

                                                        <Grid xs={12} item>
                                                            <TextField sx={{ my: 1 }}
                                                                onChange={handleChange}
                                                                fullWidth
                                                                defaultValue={open_address_data?.street}
                                                                type='text'  // Use type 'tel' for phone numbers
                                                                id="standard-textarea"
                                                                label="Street"
                                                                name='street'
                                                                required
                                                                variant="standard"
                                                                error={!!formErrors.street}
                                                                helperText={formErrors.street}
                                                            />
                                                        </Grid>

                                                        <Grid xs={12} item>

                                                            <TextField sx={{ my: 1 }}
                                                                onChange={handleChange}
                                                                fullWidth
                                                                type='text'  // Use type 'tel' for phone numbers
                                                                id="standard-textarea"
                                                                label="City"
                                                                name='city'
                                                                required
                                                                defaultValue={open_address_data?.city}
                                                                variant="standard"
                                                                error={!!formErrors.city}
                                                                helperText={formErrors.city}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} item>
                                                            <TextField sx={{ my: 1 }}
                                                                onChange={handleChange}
                                                                fullWidth
                                                                defaultValue={open_address_data?.state}
                                                                type='text'  // Use type 'tel' for phone numbers
                                                                id="standard-textarea"
                                                                label="State"
                                                                name='state'
                                                                required
                                                                variant="standard"
                                                                error={!!formErrors.state}
                                                                helperText={formErrors.state}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} item>
                                                            <TextField sx={{ my: 1 }}
                                                                onChange={handleChange}
                                                                fullWidth
                                                                defaultValue={open_address_data?.address_type}
                                                                type='text'
                                                                id="standard-textarea"
                                                                label="Address Type"
                                                                name='address_type'
                                                                // required
                                                                variant="standard"
                                                                error={!!formErrors.address_type}
                                                                helperText={formErrors.address_type}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} item>
                                                            <TextField sx={{ my: 1 }}
                                                                onChange={handleChange}
                                                                fullWidth
                                                                defaultValue={open_address_data?.postal_code}
                                                                type='tel'
                                                                id="standard-textarea"
                                                                label="Postal Code"
                                                                name='postal_code'
                                                                required
                                                                variant="standard"
                                                                error={!!formErrors.postal_code}
                                                                helperText={formErrors.postal_code}
                                                            />
                                                        </Grid>
                                                    </ThemeProvider>
                                                </Grid>




                                            </Grid>
                                        </Box>
                                        <DialogActions sx={{ p: 2 }}>
                                            <Button style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} onClick={handleClose}>No</Button>


                                            <Button type='submit' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >
                                                {open_address_data?.id ? ' Update' : 'Save'}
                                            </Button>
                                        </DialogActions>
                                    </form>

                                </Box>
                            </DialogContent>

                        </Dialog>
                    </>

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
                                <Typography sx={{ fontFamily: textStyle.fontFamily }}> <b>{open_address_data?.id ? 'Update address' : 'Add new address'}</b></Typography>
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
                                                <Grid xs={12} item>
                                                    <ThemeProvider theme={customTheme(outerTheme)}>
                                                        <TextField sx={{ my: 1 }}
                                                            onChange={handleChange}
                                                            defaultValue={open_address_data?.house_no}
                                                            fullWidth
                                                            type='text'  // Use type 'tel' for phone numbers
                                                            id="standard-textarea"
                                                            label="House/Flat No."
                                                            name='house_no'
                                                            required
                                                            variant="standard"
                                                            error={!!formErrors.house_no}
                                                            helperText={formErrors.house_no}
                                                        />
                                                        <Grid xs={6} item>
                                                            <TextField sx={{ my: 1 }}
                                                                onChange={handleChange}
                                                                defaultValue={open_address_data?.mobile_number}
                                                                fullWidth
                                                                type='tel'  // Use type 'tel' for phone numbers
                                                                id="standard-textarea"
                                                                label="mobile_number"
                                                                name='mobile_number'
                                                                required
                                                                inputProps={{
                                                                    pattern: "^[0-9]{10}$",
                                                                }}
                                                                variant="standard"
                                                                error={!!formErrors.mobile_number}
                                                                helperText={formErrors.mobile_number}
                                                            />
                                                        </Grid>

                                                        <Grid xs={6} item>
                                                            <TextField sx={{ my: 1 }}
                                                                onChange={handleChange}
                                                                fullWidth
                                                                defaultValue={open_address_data?.street}
                                                                type='text'  // Use type 'tel' for phone numbers
                                                                id="standard-textarea"
                                                                label="street"
                                                                name='street'
                                                                required
                                                                variant="standard"
                                                                error={!!formErrors.street}
                                                                helperText={formErrors.street}
                                                            />
                                                        </Grid>

                                                        <Grid xs={6} item>

                                                            <TextField sx={{ my: 1 }}
                                                                onChange={handleChange}
                                                                fullWidth
                                                                type='text'  // Use type 'tel' for phone numbers
                                                                id="standard-textarea"
                                                                label="city"
                                                                name='city'
                                                                required
                                                                defaultValue={open_address_data?.city}
                                                                variant="standard"
                                                                error={!!formErrors.city}
                                                                helperText={formErrors.city}
                                                            />
                                                        </Grid>
                                                        <Grid xs={6} item>
                                                            <TextField sx={{ my: 1 }}
                                                                onChange={handleChange}
                                                                fullWidth
                                                                defaultValue={open_address_data?.state}
                                                                type='text'  // Use type 'tel' for phone numbers
                                                                id="standard-textarea"
                                                                label="State"
                                                                name='state'
                                                                required
                                                                variant="standard"
                                                                error={!!formErrors.state}
                                                                helperText={formErrors.state}
                                                            />
                                                        </Grid>
                                                        <Grid xs={6} item>
                                                            <TextField sx={{ my: 1 }}
                                                                onChange={handleChange}
                                                                fullWidth
                                                                defaultValue={open_address_data?.address_type}
                                                                type='text'
                                                                id="standard-textarea"
                                                                label="address_type"
                                                                name='address_type'
                                                                required
                                                                variant="standard"
                                                                error={!!formErrors.address_type}
                                                                helperText={formErrors.address_type}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} item>
                                                            <TextField sx={{ my: 1 }}
                                                                onChange={handleChange}
                                                                fullWidth
                                                                defaultValue={open_address_data?.postal_code}
                                                                type='tel'
                                                                id="standard-textarea"
                                                                label="postal_code"
                                                                name='postal_code'
                                                                required
                                                                variant="standard"
                                                                error={!!formErrors.postal_code}
                                                                helperText={formErrors.postal_code}
                                                            />
                                                        </Grid>
                                                    </ThemeProvider>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </form>
                                </Box>
                            </DialogContent>
                            <DialogActions sx={{ p: 2 }}>
                                <Button style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} onClick={handleClose}>No</Button>

                                <Button variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} onClick={handleClose} >
                                    {open_address_data?.id ? 'Update' : ' Save address'}

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
