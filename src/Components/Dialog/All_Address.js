import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
// import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Card } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Media from 'react-media';
// import { openAdd_Address, closeAdd_Address, handle_Delete_Dialog, openDelete_Address, hide_all_address, show_all_address } from '../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { show_all_address, hide_all_address, openDelete_Address, openAdd_Address, selected_address, open_schedule_dialog } from '../../Redux/actions/actions';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
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

export default function All_Address() {
    // const [open, setOpen] = React.useState(false);
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const open = useSelector((state) => state.all_address_dialog)
    const textStyle = useSelector((state) => state.apply_new_theme)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedAddress, setSelectedAddress] = useState('');

    const handleClose = () => {
        dispatch(hide_all_address())
    };

    const handleClickOpen = (data) => {
        dispatch(openAdd_Address(data))
    };

    const handle_Delete_Dialog = () => {
        dispatch(openDelete_Address())
    }
    const handleChange = (event) => {
        setSelectedAddress(event.target.value);
    };

    const address = [
        {
            house_num: '112',
            city: 'mau',
            state: 'up',
            pin: 275305,
            address_type: 'Home'

        },
        {
            house_num: '12',
            city: 'Lucknow',
            state: 'up',
            pin: 22722,
            address_type: 'Office'

        },
    ]
    const handelSelect_address = () => {
        dispatch(selected_address(selectedAddress))
        handleClose()
        dispatch(open_schedule_dialog())
    }


    return (
        <div>
            <React.Fragment>

                <Media queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}>
                    {(item) => item.small && (
                        <>
                            <Dialog
                                PaperProps={{ style: { borderRadius: '15px', zIndex: '99999', marginTop: '500px' } }}
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                                fullScreen
                            >
                                <Box>
                                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                        <Typography sx={{ fontFamily: textStyle.fontFamily }}><b>All Address</b></Typography>
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
                                    <DialogContent dividers>
                                        <Box minHeight={350} fullWidth sx={{ marginTop: '20px' }}>
                                            {address.map((item, index) => (
                                                <Card sx={{ my: 1, borderRadius: '10px' }}>
                                                    <Grid container mx={1}>
                                                        <Grid xs={8} p={1}>
                                                            <FormLabel id="demo-radio-buttons-group-label" sx={{ display: 'flex' }}>
                                                                <Box mt={3}>
                                                                    <FormControl sx={{ display: 'flex' }}>
                                                                        <RadioGroup
                                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                                            value={selectedAddress}
                                                                            onChange={handleChange}
                                                                            name="radio-buttons-group"
                                                                        >
                                                                            <FormControlLabel value={`${item.house_num},${item.city},${item.state},${item.address_type}`} control={<Radio />} />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Box>
                                                                <Box>
                                                                    <Typography fontWeight={500}>House Number: {item.house_num}</Typography>
                                                                    <Typography fontWeight={500}>City: {item.city}</Typography>
                                                                    <Typography fontWeight={500}>State: {item.state}</Typography>
                                                                    <Typography fontWeight={500}>Address Type: {item.address_type}</Typography>
                                                                </Box>
                                                            </FormLabel>
                                                        </Grid>

                                                        <Grid xs={4} p={2} >
                                                            <Button fullWidth onClick={handle_Delete_Dialog} variant="contained" startIcon={<DeleteIcon />} style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} autoFocus >
                                                            </Button>
                                                            <br />
                                                            <br />
                                                            <Button fullWidth style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} autoFocus onClick={handleClickOpen} startIcon={<EditIcon />}>
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            ))}

                                            <Button style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} fullWidth onClick={handleClickOpen} variant='outlined' sx={{ my: 1 }}>Add Address <AddIcon /> </Button>
                                            {!open && (<Button fullWidth variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} onClick={handleClose}>Add</Button>)
                                            }

                                        </Box>
                                    </DialogContent>
                                    <DialogActions >
                                        <Button size='large' fullWidth style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} autoFocus onClick={handelSelect_address}>
                                            Selected
                                        </Button>
                                    </DialogActions>
                                </Box>
                            </Dialog>
                        </>
                    )}

                </Media>
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
                                    <Typography sx={{ fontFamily: textStyle.fontFamily }}><b>All Address</b></Typography>
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
                                <DialogContent dividers>
                                    <Container sx={{ marginTop: '20px', width: 550, px: 50 }} >
                                        {address.map((item, index) => (
                                            <Card sx={{ my: 2, borderRadius: '10px' }}>
                                                <Grid container mx={1}>
                                                    <Grid xs={10} p={1}>
                                                        <FormLabel id="demo-radio-buttons-group-label" sx={{ display: 'flex' }}>
                                                            <Box mt={3}>
                                                                <FormControl sx={{ display: 'flex' }}>
                                                                    <RadioGroup
                                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                                        value={selectedAddress}
                                                                        onChange={handleChange}
                                                                        name="radio-buttons-group"
                                                                    >
                                                                        <FormControlLabel value={`${item.house_num},${item.city},${item.state},${item.address_type}`} control={<Radio />} />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </Box>
                                                            <Box>
                                                                <Typography fontWeight={500}>House Number: {item.house_num}</Typography>
                                                                <Typography fontWeight={500}>City: {item.city}</Typography>
                                                                <Typography fontWeight={500}>State: {item.state}</Typography>
                                                                <Typography fontWeight={500}>Address Type: {item.address_type}</Typography>
                                                            </Box>
                                                        </FormLabel>
                                                    </Grid>

                                                    <Grid xs={2} p={2} >
                                                        {/* <Button  variant="contained" startIcon={} style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} autoFocus >
                                                        </Button> */}
                                                        <DeleteIcon onClick={handle_Delete_Dialog} style={{ color: buttonStyles.buttonColor }} />
                                                        <br />
                                                        <br />
                                                        {/* <Button style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} startIcon={ }>
                                                        </Button> */}
                                                        <EditIcon autoFocus onClick={handleClickOpen} style={{ color: buttonStyles.buttonColor }} />


                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        ))}
                                        <Box mx={10}>
                                            <Button style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor, }} fullWidth onClick={handleClickOpen} variant='outlined' sx={{ my: 1 }}>Add Address <AddIcon /> </Button>

                                        </Box>
                                        {!open && (<Button fullWidth variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} onClick={handleClose}>Add</Button>)
                                        }

                                    </Container>
                                </DialogContent>
                                <DialogActions sx={{ m: 2 }}>
                                    {open && (<Button fullWidth style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} autoFocus onClick={handelSelect_address}>
                                        Selected
                                    </Button>)}
                                </DialogActions>
                            </BootstrapDialog>
                        </>
                    )}
                </Media>
            </React.Fragment >

        </div >
    )
}
