import React, { useState } from 'react'
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
import { FormGroup } from '@mui/material';
import { Button } from '@mui/material';

import Slide from '@mui/material/Slide';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
// import { openView, closeView } from '../Redux/actions/actions';
import { close_profile_dialog, open_profile_dialog, closeView, incrementPackageCount, update_my_profile } from '../../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Theme_Button from '../Theme/Theme_Button';
import Media from 'react-media';
import Cookies from 'js-cookie';

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
    const open = useSelector((state) => state.profile_edit);
    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = React.useState("");
    const textStyle = useSelector((state) => state.apply_new_theme)
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const get_my_profile_success_error = useSelector((state) => state.get_my_profile_success_error?.data)
    const [formData, setFormData] = useState([])

    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    };

    const handleClose = () => {
        dispatch(close_profile_dialog())
    };
    const token = Cookies.get('token')

    const handleSubmit = () => {
        dispatch(update_my_profile(token, formData))

        window.location.reload(true)
    }


    return (
        <div>
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
                                <Box sx={{ mx: 5, my: 2 }}>

                                    <FormControl margin='auto' >
                                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 0 }}>
                                            <Grid xs={12} mt={2} px={2}>
                                                <TextField defaultValue={get_my_profile_success_error?(get_my_profile_success_error?.name):'name'.camelCase()} onChange={handleChange} name='name' fullWidth label="Name*" id="fullWidth" />
                                            </Grid>
                                            <Grid xs={6} mt={2} p={2}>
                                                <TextField id="" defaultValue={get_my_profile_success_error?.email_id} onChange={handleChange} name='email_id' fullWidth label="Email *" variant="outlined" />
                                            </Grid>
                                            <Grid xs={6} mt={2} p={2}>
                                                <TextField id="fullWidth" type='date' defaultValue={get_my_profile_success_error?.dob} fullWidth onChange={handleChange} name='dob' variant="outlined" />
                                            </Grid>
                                            <Grid xs={12} mt={3} >
                                                <Button fullWidth type='submit' onClick={handleSubmit} size='medium' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Update</Button>
                                            </Grid>
                                        </Grid>

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
                                        <FormControl margin='auto'>
                                            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 0 }}>
                                                <Grid xs={12} mt={2} px={2}>
                                                    <TextField defaultValue={get_my_profile_success_error?.name} onChange={handleChange} name='name' fullWidth label="Name*" id="fullWidth" />
                                                </Grid>
                                                <Grid xs={12} mt={2} p={2}>
                                                    <TextField defaultValue={get_my_profile_success_error?.email_id} fullWidth label="Email *" onChange={handleChange} name='email_id' variant="outlined" />
                                                </Grid>
                                                <Grid xs={12} mt={2} p={2}>
                                                    <TextField id="fullWidth" type='date' defaultValue={get_my_profile_success_error?.dob} fullWidth onChange={handleChange} name='dob' variant="outlined" />
                                                </Grid>
                                            </Grid>
                                        </FormControl>
                                    </Box>
                                </DialogContent>
                                <DialogActions >
                                    <Button fullWidth size='large' onClick={handleSubmit} variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} > update</Button>
                                </DialogActions>
                            </Box>
                        </Dialog>
                    </>
                )}

            </Media>


        </div>
    )
}
