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
import { styled } from '@mui/system';
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
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const positive_response = useSelector((state) => state.useLogged_in.data)
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
       
        useEffect(() => {
            if (positive_response?.success === true && !hasNavigated) {
                dispatch(store_id(parseInt(positive_response?.data?.phone_number)));
                navigate('/otp');
                setHasNavigated(true); 
            } else {
                if (positive_response) {
                    positive_response?.phone_number?.map((item) => {
                        if (item === "User with mobile no doesn't exist.") {
                            setTimeout(() => {
                                navigate('/signup', { state: { formData } });
                            }, 2000);
                        }
                    });
                }
                setFormErrors({ 'phone_number': positive_response.phone_number });
            }
        }, [positive_response, hasNavigated]);

    return (
        <div>
            {loading&&<Loading/>}
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
                                            </ThemeProvider>

                                        </Grid>
                                        <Grid item xs={12} textAlign='left' >
                                            <Box>
                                                <Typography style={{ cursor: 'pointer', fontSize: '12px' }} variant='paragraph'> Don't Have an account ? </Typography>
                                                <Link to="/signup" color="primary" style={{ cursor: 'pointer', fontSize: '12px' }}>
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
                                            {/* <Button style={{ brder: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }}>No</Button> */}
                                            <Button style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} id='BackgroundColorChangeOnly' variant='contained' type='submit'>Login</Button>
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
                        backdropFilter: buttonStyles.child_backdropFilter,
                        background: buttonStyles.child_bg,
                        color: buttonStyles.child_div_text,
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
                                            <Link to="/signup" color="primary" style={{ cursor: 'pointer', fontSize: '12px' }}>
                                                Don't Have Account ?
                                            </Link>
                                        </Grid>
                                        <Grid item xs={6} py={2} textAlign='right'>
                                            <Button style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} id='BackgroundColorChangeOnly' variant='contained' type='submit'>Login</Button>
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
