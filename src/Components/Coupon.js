import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

import TextField from '@mui/material/TextField';

// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
// import style from '../Css/Signup.module.css'
import { apply_coupon } from '../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
export default function Coupon() {

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
            <Box px={5} py={7}>
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
                                <Grid item xs={12} py={2} textAlign='right'>
                                    <Button id='BackgroundColorChangeOnly' fullWidth variant='contained' type='submit'>Apply</Button>
                                    <Typography textAlign='center' m={2}>Coupon available</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </div>

            </Box>


        </div>
    )
}
