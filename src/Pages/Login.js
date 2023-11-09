import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

import TextField from '@mui/material/TextField';

// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
// import style from '../Css/Signup.module.css'

export default function Login() {
  
    const [formData, setFormData] = useState([])
  
    const [formErrors, setFormErrors] = useState({});
  

    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    }
    // console.log(formData, 'form data')

    const handleSubmit = (event) => {
        event.preventDefault();
    };
    console.log(formErrors, 'errors')
    return (
        <div>
            <Box px={5} py={7}>
                <Box>
                    <Typography textAlign='left' fontSize={36} >Login</Typography>
                    <Typography sx={{ opacity: '.7' }} fontSize={11} textAlign='left'>
                        <span className='ThemeColorYellow'>
                            Welcome Back!
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
                                        label="Phone number"
                                        name='phone_number'
                                        required
                                        inputProps={{
                                            pattern: "^[0-9]{10}$",
                                        }}
                                        variant="standard"
                                        error={!!formErrors.phone_number}
                                        helperText={formErrors.phone_number}
                                    />
                                </Grid>
                                <Grid item xs={6} textAlign='left' >

                                </Grid>
                                <Grid item xs={6} textAlign='right' >
                                    <Box>
                                        <Link to="/forgot_password" color="primary" style={{ cursor: 'pointer', fontSize: '12px' }}>
                                            Forgot Password ?
                                        </Link>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} py={2} textAlign='left'>
                                    <Link to="/signup" color="primary" style={{ cursor: 'pointer', fontSize: '12px' }}>
                                        Don't Have Account ?
                                    </Link>
                                </Grid>
                                <Grid item xs={6} py={2} textAlign='right'>
                                    <Button id='BackgroundColorChangeOnly' variant='contained' type='submit'>Login</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </div>

            </Box>


        </div>
    )
}
