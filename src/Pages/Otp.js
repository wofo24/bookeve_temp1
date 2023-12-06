import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { activate, re_send_otp } from '../Redux/actions/actions';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Media from 'react-media';
import { Container } from '@mui/system';
import Cookies from 'js-cookie';

export default function Otp() {
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const user_id = useSelector((state) => state.user_id)
    const active_user_Response = useSelector((state) => state.active_user)
    const otp_resend_response = useSelector((state) => state.otp_resend)
    const [formData, setFormData] = useState({ otp: '5555' })
    const [formErrors, setFormErrors] = useState({ "error": undefined });
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user_id !== undefined) {
            dispatch(activate(formData, user_id))
        }
        else {
            console.log(formData, user_id, 'user id form data')
        }
    };
    const handleReSendOTP = (event) => {
        event.preventDefault();
        if (user_id !== undefined) {
            dispatch(re_send_otp(user_id))
        }
        else {
            alert('fail resend otp')
            console.log(user_id, 'not any user id')
        }
    };


    useEffect(() => {
        if (active_user_Response?.success === true) {
            Cookies.set('token', active_user_Response?.data?.access);
            navigate('/');
        } else {
            setFormErrors({ 'error': active_user_Response.error });
        }
    }, [active_user_Response]);

    useEffect(() => {
        if (otp_resend_response?.success === true) {
            console.log(otp_resend_response.data)
            // Cookies.set('token', otp_resend_response?.data?.access);
            navigate('/');
        }
    }, [otp_resend_response]);

    console.log(otp_resend_response, 'data resend')
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
                    <Box px={3} py={5} my={5} mx={3} sx={{
                        borderRadius: "10px",
                        backdropFilter: buttonStyles.child_backdropFilter,
                        background: buttonStyles.child_bg,
                        color: buttonStyles.child_div_text,
                        overflow: 'hidden'
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
                                <Box py={3}>
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
                                                error={!!formErrors.error}
                                                helperText={formErrors.error}
                                            />
                                        </Grid>
                                        <Grid item xs={6} textAlign='left' >
                                            <Button id='BackgroundColorChangeOnly' variant='outlined' color='success' onClick={handleReSendOTP}>Re-send OTP</Button>
                                        </Grid>

                                        <Grid item xs={6} py={2} textAlign='right'>
                                            <Button id='BackgroundColorChangeOnly' variant='contained' type='submit'>Proceed</Button>
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
                                                error={!!formErrors.error}
                                                helperText={formErrors.error}
                                            />
                                        </Grid>
                                        <Grid item xs={6} textAlign='left' >

                                        </Grid>
                                        <Grid item xs={6} textAlign='right' >

                                            <Button id='BackgroundColorChangeOnly' variant='outlined' color='success' type='submit' onClick={handleReSendOTP}>Re-send OTP</Button>

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
