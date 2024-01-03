import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { apply_coupon } from '../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { close_coupon_dialog, open_t_c_dialog, click_to_apply_coupon } from '../Redux/actions/actions';
import Media from 'react-media';
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

export default function Coupon() {
    const open = useSelector((state) => state.coupon_dialog)

    const [formData, setFormData] = useState([])
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch()
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const [toShow, setToShow] = useState()
    const textStyle = useSelector((state) => state.apply_new_theme)

    // const buttonStyles = useSelector((state) => state.apply_new_theme)


    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    }


    const handleClose = () => {
        dispatch(close_coupon_dialog())
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData) {
            dispatch(apply_coupon(event))
        }
    };

    const ApplyCoupon = (data) => {
        dispatch(click_to_apply_coupon(data));
        setToShow(data);
        setFormData({ ...formData, coupon: data });
        handleClose()
    }
    const MainApply = (data) => {
        if (!formData || !formData.coupon || formData.coupon === '') {
            setFormErrors({ ...formErrors, coupon: 'You have to enter a coupon code first!' });
        } else if (formData.coupon !== formData.coupon.toUpperCase()) {
            setFormErrors({ ...formErrors, coupon: 'All characters must be in upper case!' });
        } else {
            setFormErrors({ ...formErrors, coupon: '' });
            ApplyCoupon(data);
        }
    }

    const CouponArray = [
        {
            id: 2,
            discount: '15%',
            in_which_order: 'Second',
            save_price: '1300',
            coupon_code: 'SDF34R',
            description: "Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in egestas eget quam. Morbi leo risus, porta acconsectetur ac, vestibulum at eros"
        },
        {
            id: 3,
            discount: '45%',
            in_which_order: 'First',
            save_price: '1200',
            coupon_code: 'SDF34G',
            description: "Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in egestas eget quam. Morbi leo risus, porta acconsectetur ac, vestibulum at eros"
        },
    ]

    return (
        <div>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >{(item) => item.large && (
                <React.Fragment sx={{ borderRadius: '30px' }}>
                    <BootstrapDialog
                        PaperProps={{ style: { borderRadius: '15px' } }}
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}

                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                            <Typography variant='h5' sx={{ fontFamily: textStyle.fontFamily }}><b>Coupon</b></Typography>
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
                        <Box px={5} py={0} width={550}>
                            <Box>
                                <Typography textAlign='left' fontSize={30} sx={{ fontFamily: textStyle.fontFamily }}>Apply Coupon</Typography>
                                <Typography sx={{ opacity: '.7' }} fontSize={11} textAlign='left'>
                                    <span className='ThemeColorYellow'>
                                        For more exclusive Offer's
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
                                                    value={formData.coupon || ' '}
                                                    fullWidth
                                                    type='tel'
                                                    id="standard-textarea"
                                                    label="Enter Coupon Code"
                                                    name='coupon'
                                                    required
                                                    variant="standard"
                                                    error={!!formErrors.coupon}
                                                    helperText={formErrors.coupon}
                                                />
                                            </Grid>
                                            <Box width={300} p={3} margin={'auto'}>

                                                <Button fullWidth size='medium' variant='contained' type='submit' onClick={() => MainApply(formData.coupon)} style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Apply</Button>
                                            </Box>
                                            <Box sx={{ margin: 'auto' }}>
                                                {CouponArray.map((item) => (
                                                    <Paper fullWidth elevation={2} sx={{ my: 2 }}>
                                                        <Grid container sx={{
                                                            width: 415,
                                                            borderRadius: "10px",
                                                            p: 2,

                                                            backdropFilter: buttonStyles.child_backdropFilter,
                                                            background: buttonStyles.child_bg,
                                                        }}>
                                                            <Grid xs={8} textAlign={'start'}>
                                                                <Box sx={{}}>
                                                                    <Typography><b style={{ fontSize: '16px' }}>{item.discount} off </b>on {item.in_which_order} order</Typography>
                                                                    <Typography sx={{ color: '#76c265', fontSize: '14px' }} >Save &#8377;{item.save_price} for this order</Typography>
                                                                    <span style={{ fontSize: '15px' }} ><b>Coupon Code: </b> <text style={{ color: 'green' }}>{item.coupon_code}</text></span><br />
                                                                    <Button size='small' onClick={() => dispatch(open_t_c_dialog(item.description))}>View T&C</Button>
                                                                </Box>
                                                            </Grid>
                                                            <Grid xs={4} textAlign='end'>
                                                                <Box sx={{ mt: 4, textAlign: 'last' }}>
                                                                    {/* <Button fullWidth size='medium' variant='contained' type='submit' onClick={() => MainApply(formData.coupon)} >Apply</Button> */}
                                                                    <Button style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} onClick={() => ApplyCoupon(item.coupon_code)}>{item.coupon_code === formData.coupon ? 'Applied' : 'Apply'}</Button>
                                                                </Box>
                                                            </Grid>

                                                        </Grid>
                                                    </Paper>
                                                ))}
                                            </Box>


                                        </Grid>
                                        {/* <hr /> */}
                                    </Box>
                                </form>
                            </div>
                        </Box>

                    </BootstrapDialog>
                </React.Fragment>
            )}
            </Media>

            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(item) => item.small && (

                    <Dialog
                        PaperProps={{ style: { borderRadius: '15px', zIndex: '99999', marginTop: '390px' } }}
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                        fullScreen

                    >
                        <Box>
                            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                <Typography variant='h5' sx={{ fontFamily: textStyle.fontFamily }}><b>Coupon</b></Typography>
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
                            <Box py={0} px={2} sx={{overflow: 'scroll', minHeight: 350}}>
                                <Box>
                                    <Typography textAlign='left' fontSize={26} sx={{ fontFamily: textStyle.fontFamily }}>Apply Coupon</Typography>
                                    {/* <Typography  variant='h5' ><b>Coupon</b></Typography>  */}
                                    <Typography sx={{ opacity: '.7' }} fontSize={11} textAlign='left'>
                                        <span className='ThemeColorYellow'>
                                            For more exclusive Offer's
                                        </span>
                                    </Typography>
                                </Box>

                                <Box py={1} sx={{ overflow: 'scroll', px: 2 }}>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container >
                                            <Grid xs={12} item>
                                                <TextField
                                                    onChange={handleChange}
                                                    value={formData.coupon || ' '}
                                                    fullWidth
                                                    type='tel'
                                                    id="standard-textarea"
                                                    label="Enter Coupon Code"
                                                    name='coupon'
                                                    required
                                                    variant="standard"
                                                    error={!!formErrors.coupon}
                                                    helperText={formErrors.coupon}
                                                />
                                            </Grid>
                                            <Box width={300} p={3} margin={'auto'}>

                                                <Button fullWidth size='medium' variant='contained' type='submit' onClick={() => MainApply(formData.coupon)} style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Apply</Button>
                                            </Box>
                                            <Box sx={{ overflow: 'scroll' }}>


                                                {CouponArray.map((item) => (
                                                    <Paper fullWidth elevation={2} sx={{ my: 1 }}>
                                                        <Grid container sx={{
                                                            width: 320,
                                                            borderRadius: "10px",
                                                            p: 2,
                                                            margin: 'auto',
                                                            backdropFilter: buttonStyles.child_backdropFilter,
                                                            background: buttonStyles.child_bg,
                                                        }}>
                                                            <Grid xs={8} textAlign={'start'}>
                                                                <Box sx={{}}>
                                                                    <Typography><b style={{ fontSize: '16px' }}>{item.discount} off </b>on {item.in_which_order} order</Typography>
                                                                    <Typography sx={{ color: '#76c265', fontSize: '14px' }} >Save &#8377;{item.save_price} for this order</Typography>
                                                                    <span style={{ fontSize: '15px' }} ><b>Coupon Code: </b> <text style={{ color: 'green' }}>{item.coupon_code}</text></span><br />
                                                                    <Button size='small' onClick={() => dispatch(open_t_c_dialog(item.description))}>View T&C</Button>
                                                                </Box>
                                                            </Grid>
                                                            <Grid xs={4} textAlign='end'>
                                                                <Box sx={{ mt: 4, textAlign: 'last' }}>
                                                                    {/* <Button fullWidth size='medium' variant='contained' type='submit' onClick={() => MainApply(formData.coupon)} >Apply</Button> */}
                                                                    <Button style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} onClick={() => ApplyCoupon(item.coupon_code)}>{item.coupon_code === formData.coupon ? 'Applied' : 'Apply'}</Button>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                ))}
                                            </Box>
                                        </Grid>
                                    </form>
                                </Box>
                            </Box>
                        </Box>
                    </Dialog>

                )}


            </Media>


        </div>
    )
}
