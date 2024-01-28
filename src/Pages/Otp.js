import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { activate, re_send_otp } from '../Redux/actions/actions';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Media from 'react-media';
import { Container } from '@mui/system';
import Cookies from 'js-cookie';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Loading from '../Components/LoadingIcon/Loading'
import { useLocation } from 'react-router-dom';
export default function Otp() {

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
    const buttonStyles = useSelector((state) => state.all_theme)
    const error = useSelector((state) => state.active_user.error)
    const user_id = useSelector((state) => state.user_id)
    const active_user_Response = useSelector((state) => state.active_user.data)
    const loading_otp_send = useSelector((state) => state.otp_resend.loading)
    const location = useLocation();

    const loading = useSelector((state) => state.active_user.loading)
    const otp_resend_response = useSelector((state) => state.otp_resend.data)
    const pathname = useSelector((state) => state.pathname)
    const [hasNavigated, setHasNavigated] = useState(false);
    const [formData, setFormData] = useState([])
    const [formErrors, setFormErrors] = useState({ "error": undefined });
    const [counter, setCounter] = useState(30);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state_data = location.state?.formData || null;

    // console.log(state_data)s
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
            // console.log(formData, user_id, 'user id form data')
        }
    };

    const handleReSendOTP = (event) => {
        event.preventDefault();
        if (user_id !== undefined) {
            dispatch(re_send_otp(user_id, formData))
            setCounter(30)
            setFormErrors({ 'error': "" });
        }
        else {
            alert('fail resend otp')

        }
    };

    useEffect(() => {
        let timer;
        if (counter > 0) {
            timer = setTimeout(() => setCounter(counter - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [counter]);

    useEffect(() => {
        if (active_user_Response?.success === true && !hasNavigated) {
            Cookies.set('token', active_user_Response?.data?.access);
            Cookies.remove('unknown_user_token');
            setTimeout(() => {
                setHasNavigated(true);
                navigate(`${pathname ? pathname : '/'}`);
            }, 1000);
        } else if (active_user_Response) {
            setFormErrors({ 'error': error?.error });
        }
    }, [active_user_Response, hasNavigated, error]);


    const handleNav = () => {
        setTimeout(() => {
            window.location.reload(true);
            window.location.href = '/login';
        }, 1000);
    };
    

    return (
        <div>

            {loading || loading_otp_send ? <Loading /> : null}

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
                        <Box mt={1} px={7} textAlign={"center"}>
                            <Typography variant='subtitle' textAlign={'center'} sx={{ opacity: '.8' }}>Please enter the OTP sent to {state_data?.phone_number}.
                                {/* <br/> */}
                                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleNav()}> Change</span>
                            </Typography>
                        </Box>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <Box pb={3} px={3}>
                                    <Grid container spacing={3}>
                                        <Grid xs={12} item >
                                            <ThemeProvider theme={customTheme(outerTheme)}>
                                                <TextField
                                                    onChange={handleChange}
                                                    fullWidth
                                                    type='tel'  // Use type 'tel' for phone numbers
                                                    id="standard-textarea"
                                                    label="OTP"
                                                    placeholder='4 Digit otp.'
                                                    name='otp'
                                                    required
                                                    inputProps={{
                                                        pattern: "^[0-9]{4}$",
                                                    }}
                                                    variant="standard"
                                                    error={!!formErrors.error}
                                                    helperText={formErrors.error}
                                                />
                                            </ThemeProvider>
                                            <Box pt={1} >
                                                <Typography textAlign={"center"} fontSize={'13px'} sx={{ color: 'green', textAlign: 'center' }} variant='subtitle'>{otp_resend_response?.data?.message}.</Typography>

                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} textAlign='center' mt={-3} >
                                            <Box sx={{ display: 'grid', placeContent: 'center' }}>
                                                <Typography variant='subtitle' fontSize={'13px'} textAlign={'center'}>Not received your code? {counter < 1 ? <span style={{ color: "blue", cursor: 'pointer', fontSize: '15px' }} onClick={handleReSendOTP}>Resend code</span> : `${counter} sec`}</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} py={0} textAlign='center'>
                                            <Button id='BackgroundColorChangeOnly' variant='contained' type='submit' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText, textTransform: "capitalize" }} >Verify</Button>
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
                    // <Box px={10} py={5} my={5} mx={35} sx={{
                    <Box px={10} py={5} my={5} mx={35} sx={{
                        borderRadius: "10px",
                        backdropFilter: buttonStyles.child_backdropFilter,
                        background: buttonStyles.child_bg,
                        color: buttonStyles.child_div_text,
                    }}>
                        <Box>
                            <Typography textAlign='left' fontSize={46}>OTP</Typography>
                            <Typography sx={{ opacity: '.7' }} fontSize={11} textAlign='left'>
                                <span className='ThemeColorYellow'>
                                    Welcome Back!
                                </span>
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
                                                    type='tel'  // Use type 'tel' for phone numbers
                                                    id="standard-textarea"
                                                    label="OTP"
                                                    placeholder='4 Digit otp.'
                                                    name='otp'
                                                    required
                                                    inputProps={{
                                                        pattern: "^[0-9]{4}$",
                                                    }}
                                                    variant="standard"
                                                    error={!!formErrors.error}
                                                    helperText={formErrors.error}
                                                />
                                            </ThemeProvider>
                                            <Box pt={1} >
                                                <Typography textAlign={"center"} fontSize={'13px'} sx={{ color: 'green', textAlign: 'center' }} variant='subtitle'>{otp_resend_response?.data?.message}.</Typography>

                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} textAlign='center' mt={-3} >
                                            <Box sx={{ display: 'grid', placeContent: 'center' }}>
                                                <Typography variant='subtitle' fontSize={'13px'} textAlign={'center'}>Not received your code? {counter < 1 ? <span style={{ color: "blue", cursor: 'pointer', fontSize: '15px' }} onClick={handleReSendOTP}>Resend code</span> : `${counter} sec`}</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} py={0} textAlign='center'>
                                            <Button id='BackgroundColorChangeOnly' variant='contained' type='submit' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText, textTransform: "capitalize" }} >Verify</Button>
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
