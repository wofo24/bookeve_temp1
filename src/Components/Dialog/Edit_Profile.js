import React from 'react'
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


import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
// import { openView, closeView } from '../Redux/actions/actions';
import { close_profile_dialog, open_profile_dialog, closeView, incrementPackageCount } from '../../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Theme_Button from '../Theme/Theme_Button';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
export default function Edit_Profile() {
    const open = useSelector((state) => state.profile_edit);
    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = React.useState("");

    const buttonStyles = useSelector((state) => state.button_style)
    console.log(buttonStyles, 'button style selected')



    const handleChange = (event) => {
        setSelectedValue(event.target.value);

    };


    const handleClose = () => {
        dispatch(close_profile_dialog())
    };

    return (
        <div>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit Profile
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
                    <Box sx={{ mx: 5, my: 5 }}>

                        <FormControl margin='auto'>
                            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 0 }}>
                                <Grid xs={12} mt={2} px={2}>
                                    <TextField defaultValue={'Name'} fullWidth label="Name*" id="fullWidth" />
                                </Grid>
                                <Grid xs={6} mt={2} p={2}>
                                    <TextField id="" defaultValue={'Email@gmail.com'} fullWidth label="Email *" variant="outlined" />
                                </Grid>
                                <Grid xs={6} mt={2} p={2}>
                                    <TextField id="fullWidth" defaultValue={'91 8423174102'} fullWidth label="Mobile Number *" variant="outlined" />
                                </Grid>
                                <Grid xs={12} mt={3} >
                                    <Button fullWidth variant='contained' id='BackgroundColorChangeOnly'>Save</Button>
                                </Grid>
                            </Grid>



                        </FormControl>

                    </Box>
                 
                </DialogContent>
               
            </BootstrapDialog>
        </div>
    )
}
