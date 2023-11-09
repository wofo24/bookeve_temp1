import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

import TextField from '@mui/material/TextField';

// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
// import style from '../Css/Signup.module.css'
import { apply_coupon } from '../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';

// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { open_coupon_dialog, close_coupon_dialog } from '../Redux/actions/actions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
export default function Coupon() {
    const open = useSelector((state) => state.coupon_dialog)

    const handleClickOpen = () => {
        dispatch(open_coupon_dialog())
    };
    const handleClose = () => {
        dispatch(close_coupon_dialog())
    };
    const [formData, setFormData] = useState([])

    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch()


    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData) {
            dispatch(apply_coupon(event))
        }
    };
    console.log(formErrors, 'errors')
    return (
        <div>
            <React.Fragment  sx={{borderRadius:'30px'}}>
                <BootstrapDialog
               
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Coupon
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
                    <Box px={5} py={2}>
                        <Box>
                            <Typography textAlign='left' fontSize={36} >Apply Coupon</Typography>
                            <Typography sx={{ opacity: '.7' }} fontSize={11} textAlign='left'>
                                <span className='ThemeColorYellow'>
                                    For more exclusive Offer's
                                </span>
                            </Typography>
                        </Box>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <Box py={1}>
                                    <Grid container spacing={3}>
                                        <Grid xs={12} item>
                                            <TextField
                                                onChange={handleChange}
                                                fullWidth
                                                type='tel'  // Use type 'tel' for phone numbers
                                                id="standard-textarea"
                                                label="Enter Coupon Code"
                                                name='coupon'
                                                required
                                                variant="standard"
                                                error={!!formErrors.phone_number}
                                                helperText={formErrors.phone_number}
                                            />
                                        </Grid>
                                        <Box width={300} p={3} margin={'auto'}>
                                            <Button  id='BackgroundColorChangeOnly' fullWidth variant='contained' type='submit'>Apply</Button>

                                        </Box>

                                            {/* <Typography textAlign='center' m={2}>Coupon available</Typography> */}

                                      
                                     
                                        <Grid container>
                                            <Grid xs={6} textAlign={'start'}>
                                                <Box sx={{ p: 3 }}>

                                                    <Typography>15% off on your first order</Typography>
                                                    <span>valid for new user</span>
                                                    <Typography sx={{ color: 'green' }} >Save {`price INR`} for this order</Typography>
                                                    <Button>View T&C</Button>
                                                </Box>

                                            </Grid>
                                            <Grid xs={6} textAlign='end'>
                                                <Box sx={{ p: 3, mt: 3, textAlign: 'last' }}>
                                                    <Button>Apply</Button>
                                                </Box>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                            <hr />
                                </Box>
                            </form>
                        </div>
                    </Box>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>



        </div>
    )
}
