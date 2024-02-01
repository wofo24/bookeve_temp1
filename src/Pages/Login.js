import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { store_id } from '../Redux/actions/actions';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import { login } from '../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Loading from '../Components/LoadingIcon/Loading';

export default function Login() {
    const location = useLocation();
    const data = location?.state?.formData;
    const [formData, setFormData] = useState({
        country_code: 'IN',
        "phone_number": data?.phone_number
    });
    const outerTheme = useTheme();
    const styles = useSelector((state) => state.all_theme)
    const positive_response = useSelector((state) => state.useLogged_in.data)
    const error = useSelector((state) => state.useLogged_in.error)
    const loading = useSelector((state) => state.useLogged_in.loading)
    const [formErrors, setFormErrors] = useState({ "phone_number": undefined });
    const [hasNavigated, setHasNavigated] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login(formData))
    };

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

    useEffect(() => {
        if (positive_response?.success === true && !hasNavigated) {
            dispatch(store_id(parseInt(positive_response?.data?.phone_number)));
            navigate('/otp', { state: { formData } });
            setHasNavigated(true);
        } else {
            if (!error?.success && !hasNavigated) {
                error?.phone_number?.map((item) => {
                    if (item === "User with mobile no doesn't exist.") {
                        setFormErrors({ 'phone_number': item });
                        setTimeout(() => {
                            navigate('/signup', { state: { formData } });
                        }, 2000);
                    }
                });
            } else {
                // console.log(error)

            }
            setFormErrors({ 'phone_number': error.phone_number && error.phone_number[0] });
        }
    }, [positive_response, error, hasNavigated]);

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
                    <Box px={3} py={5} my={5} mx={2} sx={{
                        borderRadius: "10px",
                        background: styles?.colors?.secondary,
                        color: styles?.colors?.heightlightText,
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

                                <Box py={3} mx={2}>
                                    <Grid container spacing={3}>
                                        <Grid xs={12} item>
                                            <ThemeProvider theme={customTheme(outerTheme)}>

                                                <TextField
                                                    onChange={handleChange}
                                                    fullWidth
                                                    defaultValue={data?.phone_number}
                                                    type='number'  // Use type 'tel' for phone numbers
                                                    id="standard-textarea"
                                                    label="Phone number"
                                                    placeholder='Phone number'
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
                                        <Grid item xs={12} textAlign='left' >
                                            <Box>
                                                <Typography style={{ cursor: 'pointer', fontSize: '12px' }} variant='paragraph'> Don't Have an account ? </Typography>
                                                <Link to="/signup" style={{ cursor: 'pointer', fontSize: '12px', color:styles?.colors?.link }}>
                                                    Sign up
                                                </Link>
                                            </Box>
                                        </Grid>
                                        {/* <Grid item xs={6} textAlign='right' >
                                            <Box>
                                                <Link to="/otp" color="primary" style={{ cursor: 'pointer', fontSize: '12px' }}>
                                                    Forgot Password ?
                                                </Link>
                                            </Box>
                                        </Grid> */}

                                        <Grid item xs={12} py={2} textAlign='center'>
                                            {/* <Button style={{ brder: `1px solid ${styles?.colors?.button}`, color: styles?.colors?.button }}>No</Button> */}
                                            <Button style={{ background: styles?.colors?.button, color: styles?.colors?.white }} id='BackgroundColorChangeOnly' variant='contained' type='submit'>Login</Button>
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

                    <Box px={10} py={5} my={5} mx={35} sx={{
                        borderRadius: "10px",
                        background: styles?.colors?.secondary,
                        color: styles?.colors?.heightlightText,
                    }}>

                        <Box>
                            <Typography textAlign='left' fontSize={46} >Login</Typography>
                            <Typography sx={{ opacity: '.7' }} fontSize={11} textAlign='left'>
                                <span className='ThemeColorYellow'>
                                    Welcome Back!
                                </span>
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
                                                    defaultValue={data?.phone_number}
                                                    fullWidth
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
                                        <Grid item xs={6} textAlign='right' >
                                            {/* <Box>
                                                <Link to="/forgot_password" color="primary" style={{ cursor: 'pointer', fontSize: '12px' }}>
                                                    Forgot Password ?
                                                </Link>
                                            </Box> */}
                                        </Grid>
                                        <Grid item xs={6} py={2} textAlign='left'>
                                            <Link to="/signup"  style={{ cursor: 'pointer', fontSize: '12px', color:styles?.colors?.link }}>
                                                Don't Have Account ?
                                            </Link>
                                        </Grid>
                                        <Grid item xs={6} py={2} textAlign='right'>
                                            <Button style={{ background: styles?.colors?.button, color: styles.buttonText }} id='BackgroundColorChangeOnly' variant='contained' type='submit'>Login</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </form>
                        </div>


                    </Box>
                ))}
            </Media>



        </div >
    )
}
