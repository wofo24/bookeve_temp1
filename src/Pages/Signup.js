import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Media from 'react-media';
import { signup, store_id } from '../Redux/actions/actions';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Loading from '../Components/LoadingIcon/Loading'
export default function Signup() {

    const customTheme = (outerTheme) =>
        createTheme({
            components: {
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            '--TextField-brandBorderColor': `${styles?.colors?.primary}`,
                            '--TextField-brandBorderHoverColor': `${styles?.colors?.primary}`,
                            '--TextField-brandBorderFocusedColor': `${styles?.colors?.primary}`,
                            '& label.Mui-focused': {
                                color: `${styles?.colors?.primary}`,
                            },
                        },
                    },
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        notchedOutline: {
                            borderColor: `${styles?.colors?.primary}`,
                        },
                        root: {
                            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                                borderColor: `${styles?.colors?.primary}`,
                            },
                            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                                borderColor: `${styles?.colors?.primary}`,
                            },
                        },
                    },
                },
                MuiFilledInput: {
                    styleOverrides: {
                        root: {
                            '&:before, &:after': {
                                borderBottom: `2px solid ${styles?.colors?.primary}`,
                            },
                            '&:hover:not(.Mui-disabled, .Mui-error):before': {
                                borderBottom: `2px solid ${styles?.colors?.primary}`,
                            },
                            '&.Mui-focused:after': {
                                borderBottom: `2px solid ${styles?.colors?.primary}`,
                            },
                        },
                    },
                },
                MuiInput: {
                    styleOverrides: {
                        root: {
                            '&:before': {
                                borderBottom: `2px solid ${styles?.colors?.primary}`,
                            },
                            '&:hover:not(.Mui-disabled, .Mui-error):before': {
                                borderBottom: `2px solid ${styles?.colors?.primary}`,
                            },
                            '&.Mui-focused:after': {
                                borderBottom: `2px solid ${styles?.colors?.primary}`,
                            },
                        },
                    },
                },
            },
        });
    const outerTheme = useTheme();
    const location = useLocation();
    const data = location?.state?.formData;
    const [formData, setFormData] = useState({ "phone_number": data?.phone_number })
    const styles = useSelector((state) => state.all_theme)
    const signup_response = useSelector((state) => state.useSign_Up.data)
    const loading = useSelector((state) => state.useSign_Up.loading)
    const error = useSelector((state) => state.useSign_Up.error)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formErrors, setFormErrors] = useState({ "phone_number": undefined, 'name': undefined });

    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signup(formData))

    }

    useEffect(() => {
        if (signup_response?.success === true) {
            dispatch(store_id(signup_response?.data?.id));
            navigate('/otp', { state: { formData } });
        }
        else {
            if (error) {
                error?.phone_number?.map((item) => {
                    if (item === 'User with this phone number already exists.') {
                        setFormErrors({ "phone_number": item })
                        setTimeout(() => {
                            navigate('/login', { state: { formData } })
                        }, 2000);
                    }
                })
                setFormErrors({ 'phone_number': error.phone_number && error.phone_number[0] });
            }
        }
    }, [signup_response,dispatch, error]);

    return (
        <div>
            {loading && <Loading />}
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(item) => (item.small && (
                    <>
                        <Box px={2} py={4} my={5} mx={2} sx={{
                            borderRadius: "10px",
                            background: styles?.colors?.secondary,
                            color: styles?.colors?.heightlightText,
                        }}>
                            <Box px={2}>
                                <Typography textAlign='left' fontSize={36} >Sign up</Typography>
                                <Typography sx={{ opacity: '.7' }} fontSize={11} textAlign='left'>Don't have account &nbsp;
                                    <span className='ThemeColorYellow'>
                                        <Link to='/signup' style={{ color: styles?.colors?.primary }}>Create Your Account</Link>&nbsp;
                                    </span> it's takes less then 30 second's.
                                </Typography>
                            </Box>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <Box py={3} px={2}>
                                        <Grid container spacing={3}>
                                            <Grid xs={12} item>
                                                <ThemeProvider theme={customTheme(outerTheme)}>
                                                    <TextField
                                                        onChange={handleChange}
                                                        fullWidth
                                                        id="standard-textarea"
                                                        label="Name"
                                                        name='name'
                                                        placeholder='Phone number'
                                                        multiline
                                                        variant="standard"
                                                        required
                                                        error={!!formErrors.name}
                                                        helperText={formErrors.name}
                                                    />
                                                </ThemeProvider>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <ThemeProvider theme={customTheme(outerTheme)}>
                                                    <TextField
                                                        onChange={handleChange}
                                                        fullWidth
                                                        defaultValue={formData?.phone_number}
                                                        type='number'  // Use type 'tel' for phone numbers
                                                        id="standard-textarea"
                                                        label="Phone number"
                                                        name='phone_number'
                                                        placeholder='Phone number'
                                                        required
                                                        inputProps={{
                                                            pattern: "^[0-9]{10}$",
                                                        }}
                                                        variant="standard"
                                                        error={!!formErrors.phone_number}
                                                        helperText={formErrors.phone_number}
                                                    />
                                                </ThemeProvider>
                                            </Grid>

                                            <Grid item xs={6} textAlign='left' >

                                                <Link to="/login" style={{ cursor: 'pointer', fontSize: '12px', color:styles?.colors?.link }}>
                                                    Already Have Account Login?
                                                </Link>
                                            </Grid>

                                            <Grid item xs={6} py={2} textAlign='right'>
                                                <Button id='BackgroundColorChangeOnly' variant='contained' type='submit' style={{ background: styles?.colors?.button, color: styles?.colors?.text }} >Signup</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </form>
                            </div>

                        </Box>

                    </>
                )
                )}

            </Media>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(item) => (item.large && (

                    <>
                        <Box px={10} py={5} my={5} mx={35} sx={{
                            borderRadius: "10px",
                            background: styles?.colors?.secondary,
                            color: styles?.colors?.heightlightText,
                        }}>
                            <Box mb={4}>
                                <Typography textAlign='left' fontSize={46} >Sign up</Typography>
                                <Typography sx={{ opacity: '.7' }} fontSize={11} textAlign='left'>Don't have account &nbsp;
                                    <span className='ThemeColorYellow'>
                                        <Link to='/signup'>Create Your Account</Link>&nbsp;
                                    </span> it's takes less then 30 second's.
                                </Typography>
                            </Box>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <Box py={1}>
                                        <Grid container spacing={5}>
                                            <Grid xs={12} item>
                                                <ThemeProvider theme={customTheme(outerTheme)}>
                                                    <TextField
                                                        onChange={handleChange}
                                                        fullWidth
                                                        id="standard-textarea"
                                                        label="Name"
                                                        name='name'
                                                        multiline
                                                        variant="standard"
                                                        required

                                                    />
                                                </ThemeProvider>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <ThemeProvider theme={customTheme(outerTheme)}>
                                                    <TextField
                                                        onChange={handleChange}
                                                        fullWidth

                                                        defaultValue={data?.phone_number}
                                                        type='number'  // Use type 'tel' for phone numbers
                                                        id="standard-textarea"
                                                        placeholder='Phone number'
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
                                                </ThemeProvider>
                                            </Grid>

                                            <Grid item xs={6} textAlign='left' >
                                               
                                            </Grid>
                                            <Grid item xs={6} py={2} textAlign='left'>
                                                <Link to="/login"  style={{ cursor: 'pointer', fontSize: '12px', color:styles?.colors?.link }}>
                                                    Already Have Account Login?
                                                </Link>
                                            </Grid>
                                            <Grid item xs={12} py={2} textAlign='center'>
                                                <Button id='BackgroundColorChangeOnly' variant='contained' size='large' type='submit' style={{ background: styles?.colors?.button, color: styles?.colors?.text }} >Signup</Button>
                                                {/* <Button id='BackgroundColorChangeOnly' variant='contained' type='submit'>Signup</Button> */}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </form>
                            </div>

                        </Box>

                    </>
                )
                )}

            </Media>


        </div>
    )
}
