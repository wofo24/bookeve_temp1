import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import TextField from '@mui/material/TextField';

import { Link } from 'react-router-dom';
import Media from 'react-media';
// import style from '../Css/Signup.module.css'

export default function Otp() {
    const buttonStyles = useSelector((state) => state.apply_new_theme)

    const [formData, setFormData] = useState([])

    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    // console.log(formErrors, 'errors')
    return (
        <div>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(item) => (item.small && (
                    <Box px={3} py={5} my={5} mx={2} sx={{
                        borderRadius: "10px",
                        backdropFilter: buttonStyles.child_backdropFilter,
                        background: buttonStyles.child_bg,
                        color: buttonStyles.child_div_text,
                    }}>
                        <Box>
                            <Typography textAlign='left' fontSize={36} >OTP</Typography>
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
                                                label="OTP"
                                                name='otp'
                                                required
                                                inputProps={{
                                                    pattern: "^[0-9]{4}$",
                                                }}
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={6} textAlign='left' >

                                        </Grid>
                                        
                                        <Grid item xs={6} py={2} textAlign='right'>
                                            <Button id='BackgroundColorChangeOnly' variant='contained' type='submit'>Login</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </form>
                        </div>

                    </Box>
                ))}

            </Media>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(item) => (item.large && (
                    <Box px={8} py={5} my={5} mx={40} sx={{
                        borderRadius: "10px",
                        backdropFilter: buttonStyles.child_backdropFilter,
                        background: buttonStyles.child_bg,
                        color: buttonStyles.child_div_text,
                    }}>
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
                                                label="OTP"
                                                name='otp'
                                                required
                                                inputProps={{
                                                    pattern: "^[0-9]{4}$",
                                                }}
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={6} textAlign='left' >

                                        </Grid>
                                        <Grid item xs={6} textAlign='right' >
                                            <Box>
                                                <Link to="/forgot_pass" color="primary" style={{ cursor: 'pointer', fontSize: '12px' }}>
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
                ))}

            </Media>



        </div>
    )
}
