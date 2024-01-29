import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Slide from '@mui/material/Slide';
import FormControl from '@mui/material/FormControl';
import { close_profile_dialog, update_my_profile, get_my_profile } from '../../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import Media from 'react-media';
import Cookies from 'js-cookie';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Loading from '../LoadingIcon/Loading';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Edit_Profile() {

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
    const dispatch = useDispatch()
    const open = useSelector((state) => state.profile_edit);
    const textStyle = useSelector((state) => state.all_theme)
    const buttonStyles = useSelector((state) => state.all_theme)
    const get_my_profile_success_error1 = useSelector((state) => state.get_my_profile_update_success_error)
    const get_my_profile_success_error = useSelector((state) => state.get_my_profile_success_error?.data?.data)
    const loading = useSelector((state) => state.get_my_profile_update_success_error?.loading)
    // const error = useSelector((state) => state.get_my_profile_update_success_error?.error)
    const [formData, setFormData] = useState([])


    const Date1 = (event) => {
        const myDate = new Date(event.$d);
        const formattedDate = dayjs(myDate).format('YYYY-MM-DD');
        setFormData({ ...formData, "dob": formattedDate })
    }

    useEffect(() => {
        if (open) {
            dispatch(get_my_profile())
            setTimeout(() => {
                handleClose()
            }, 2000);
        }
    }, [get_my_profile_success_error1])

    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    };
    // console.log(formData, 'this is form')
    const handleClose = () => {
        dispatch(close_profile_dialog())
    };
    const token = Cookies.get('token')

    const handleSubmit = () => {
        dispatch(update_my_profile(token, formData))
       
    }
       return (
        <div>
            {loading && <Loading />}
            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.large && (
                    <>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            PaperProps={{ style: { borderRadius: '15px' } }}
                        >
                            <DialogTitle sx={{ p: 2 }} id="customized-dialog-title">
                                <Typography variant='h5' sx={{ fontFamily: textStyle.fontFamily }}><b>Edit profile</b></Typography>
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
                            <DialogContent >
                                <Box sx={{ mx: 5, my: 2 }}>
                                    <FormControl >
                                        <from onSubmit={handleSubmit}>
                                            <ThemeProvider theme={customTheme(outerTheme)}>
                                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 0 }}>
                                                    <Grid xs={12} mt={2} px={2} item>
                                                        <TextField defaultValue={get_my_profile_success_error ? get_my_profile_success_error?.name : 'name'} onChange={handleChange} name='name' fullWidth label="Name*" id="fullWidth" />
                                                    </Grid>
                                                    <Grid xs={6} mt={2} p={2} item>
                                                        <TextField id="" defaultValue={get_my_profile_success_error?.email_id} onChange={handleChange} name='email_id' fullWidth label="Email *" variant="outlined" />
                                                    </Grid>
                                                    <Grid xs={6} mt={1} p={2} item>
                                                        {/* <Grid item xs={12} mt={2} p={2}> */}
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                                <DatePicker label="DOB" onChange={Date1} defaultValue={dayjs('2022-04-17')} />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                    </Grid>
                                                    <Grid xs={12} mt={3} item>
                                                        <Button fullWidth type='submit' onClick={handleSubmit} size='medium' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} > "Update"</Button>
                                                    </Grid>
                                                </Grid>
                                            </ThemeProvider>
                                        </from>
                                    </FormControl>

                                </Box>

                            </DialogContent>

                        </BootstrapDialog>
                    </>
                )}

            </Media>
            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.small && (
                    <>
                        <Dialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            TransitionComponent={Transition}
                            PaperProps={{ style: { borderRadius: '15px', zIndex: '99999', marginTop: '500px' } }}
                            fullScreen
                        >
                            {loading ? <Loading /> :

                                <Box>
                                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                        <Typography variant='h5' sx={{ fontFamily: textStyle.fontFamily }}><b>Edit profile</b></Typography>
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
                                    <DialogContent >
                                        <Box minHeight={350}>
                                            <FormControl >
                                                <ThemeProvider theme={customTheme(outerTheme)}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} mt={2} px={2}>
                                                            <TextField defaultValue={get_my_profile_success_error?.name} onChange={handleChange} name='name' fullWidth label="Name*" id="fullWidth" />
                                                        </Grid>
                                                        <Grid item xs={12} mt={2} p={2}>
                                                            <TextField defaultValue={get_my_profile_success_error?.email_id} fullWidth label="Email *" onChange={handleChange} name='email_id' variant="outlined" />
                                                        </Grid>
                                                        <Grid item xs={12} mt={2} p={2}>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                                    <DatePicker label="DOB" onChange={Date1} defaultValue={dayjs('2022-04-17')} />
                                                                </DemoContainer>
                                                            </LocalizationProvider>
                                                            {/* <TextField id="fullWidth" type='date' label='Date of birth' defaultValue={get_my_profile_success_error?.dob} fullWidth onChange={handleChange} name='dob' variant="outlined" /> */}
                                                        </Grid>
                                                    </Grid>

                                                </ThemeProvider>
                                            </FormControl>
                                        </Box>
                                    </DialogContent>
                                    <DialogActions >
                                        <Button fullWidth size='large' onClick={handleSubmit} variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} > {loading ? <Loading /> : "Update"}</Button>
                                    </DialogActions>
                                </Box>
                            }
                        </Dialog>
                    </>
                )}

            </Media>


        </div>
    )
}
