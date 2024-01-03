import React, { useEffect } from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
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
import { useNavigate } from 'react-router-dom';
import { hide_all_address, get_all_address, store_data_for_check_out_address_id, openDelete_Address, openAdd_Address, selected_address, open_schedule_dialog } from '../../Redux/actions/actions';
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
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const open = useSelector((state) => state.all_address_dialog)
    const all_address = useSelector((state) => state.all_address)
    const textStyle = useSelector((state) => state.apply_new_theme)
    const selected = useSelector((state) => state.selected_address)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedAddress, setSelectedAddress] = useState('');

    const handleClose = () => {
        dispatch(hide_all_address())
    };

    const handleClickOpen = (data) => {
        dispatch(openAdd_Address(data))
    };

    const handle_Delete_Dialog = (id) => {
        dispatch(openDelete_Address(id))
    }

    const handleChange = (event) => {
        setSelectedAddress(event.target.value);
    };

    const handelSelect_address = () => {
        if (selectedAddress) {
            dispatch(selected_address(selectedAddress))
            dispatch(open_schedule_dialog())
            handleClose()
        }
        else {
            alert('please select address')
        }
    }

    useEffect(() => {
        dispatch(get_all_address())
    }, [all_address?.posted_address_result])

    useEffect(() => {
        if (all_address?.all_address?.data?.length > 0) {
            const selected_address_id = all_address?.all_address?.data?.map((item) => {
                if (selectedAddress === item.address) {
                    return { "id": item.id }
                }
            })
            const data = selected_address_id.filter(function (element) {
                return element !== undefined;
            });
            dispatch(store_data_for_check_out_address_id(data))
        }
    }, [selectedAddress])

    useEffect(() => {
        dispatch(selected_address(selectedAddress))
    }, [])

    useEffect(() => {
        if (all_address?.all_address?.data?.length > 0) {
            setSelectedAddress(all_address.all_address.data[0]?.address);
        }
    }, [all_address]);

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
                                PaperProps={{ style: { borderRadius: '15px', zIndex: '999999999', marginTop: '400px' } }}
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                                fullScreen
                            >
                                <Box sx={{ height: '650px', overflow: 'auto', paddingBottom: '30px' }}>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                                <Typography sx={{ fontFamily: textStyle.fontFamily }}><b>All Address</b></Typography>
                                            </DialogTitle>
                                        </Grid>
                                        <Grid item xs={2} sx={{ display: 'grid', placeContent: 'center' }}>
                                            <IconButton
                                                aria-label="close"
                                                onClick={handleClose}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>

                                    <DialogContent dividers >
                                        <Box sx={{
                                            height: '50vh',
                                            overflow: 'auto',
                                            paddingBottom: '50vh',
                                            scrollBehavior: 'smooth',

                                            '@media (max-width: 767px)': {
                                                height: '60vh',
                                            },
                                        }}>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                value={selectedAddress}
                                                onChange={handleChange}
                                                name="radio-buttons-group"
                                            >
                                                {all_address?.all_address?.count ? all_address?.all_address?.data?.map((item, index) => (
                                                    <Card sx={{ my: 1, borderRadius: '10px' }} key={item.id}>
                                                        <Grid container mx={1}>
                                                            <Grid xs={9} p={1}>
                                                                <FormLabel id="demo-radio-buttons-group-label" sx={{ display: 'flex' }}>
                                                                    <Box py={7}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Radio checked={selectedAddress === item?.address}
                                                                                    sx={{ color: buttonStyles.buttonColor, '&.Mui-checked': { color: buttonStyles.buttonColor } }}
                                                                                    value={item?.address}
                                                                                />
                                                                            }
                                                                        />

                                                                    </Box>
                                                                    <Box py={1}>
                                                                        <Typography fontWeight={500}>House Number: {item.house_no}</Typography>
                                                                        <Typography fontWeight={500}>City: {item.city}</Typography>
                                                                        <Typography fontWeight={500}>State: {item.state}</Typography>
                                                                        <Typography fontWeight={500}>Mobile number: {item.mobile_number}</Typography>
                                                                        <Typography fontWeight={500}>Address Type: {item.address_type}</Typography>
                                                                        <Typography fontWeight={500}>Postal Code: {item.postal_code}</Typography>
                                                                    </Box>
                                                                </FormLabel>
                                                            </Grid>
                                                            <Grid xs={3} p={1} py={5} >
                                                                <Button sx={{ width: '7px' }} fullWidth onClick={() => handle_Delete_Dialog(item.id)} variant="contained" startIcon={<DeleteIcon />} style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} autoFocus >
                                                                </Button>
                                                                <br />
                                                                <br />
                                                                <Button fullWidth sx={{ width: '7px' }} variant="contained" style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} autoFocus onClick={() => handleClickOpen(item)} startIcon={<EditIcon />}>
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Card>
                                                )) : <Box textAlign={'center'} py={2}>
                                                    <Typography color={'error'} variant='subtitle'>No any address!</Typography>
                                                </Box>}
                                            </RadioGroup>

                                            <Button style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} fullWidth onClick={handleClickOpen} variant='outlined' sx={{ my: 1 }}>Add Address <AddIcon /> </Button>
                                            {!open && (<Button fullWidth variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} onClick={handleClose}>Add</Button>)}

                                            <Box sx={{ m: 'auto', width: '100%' }}>
                                                <DialogActions>
                                                    <Button size='large' fullWidth style={{ width: '100%', background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} autoFocus onClick={handelSelect_address}>
                                                        Selected
                                                    </Button>
                                                </DialogActions>
                                            </Box>
                                        </Box>
                                    </DialogContent>

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
                                        {all_address?.all_address?.data?.map((item, index) => (
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
