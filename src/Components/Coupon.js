import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { apply_coupon } from '../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { close_coupon_dialog, get_all_coupons, post_coupon_code, open_t_c_dialog, click_to_apply_coupon } from '../Redux/actions/actions';
import Media from 'react-media';
import Slide from '@mui/material/Slide';
import Loading from './LoadingIcon/Loading';

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
    const apply_onClick_coupon = useSelector((state) => state.apply_onClick_coupon)
    const coupons = useSelector((state) => state.coupons)
    const loading = useSelector((state) => state.coupons.loading)
    const card_data = useSelector((state) => state?.card_data?.data)

    useEffect(() => {
        if (card_data && Array.isArray(card_data)) {
            const packageIdsString = card_data?.map((item) => item?.package_id).join(',') || '';
            if (open) {
                dispatch(get_all_coupons(packageIdsString));
            } else {
                console.log('close')
            }
        } else {
            console.log('make this is', card_data)
        }
    }, [open, card_data]);

    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    }

    console.log(formData, 'this is form data')

    const handleClose = () => {
        dispatch(close_coupon_dialog())
    };

    // console.log(apply_onClick_coupon, 'this is code')
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData) {
            dispatch(apply_coupon(event))
        }
    };

    const ApplyCoupon = (data) => {
        dispatch(click_to_apply_coupon(data?.id));
        setToShow(data);
        setFormData({ ...formData, coupon: data.code });
        handleClose()
    }

    const Direct_apply = (data) => {

        // console.log(data, 'dorect appy')
        if (card_data && Array.isArray(card_data)) {
            const Package = card_data.map((item) => ({ "id": item.package_id, "quantity": item.quantity }))
            const PACKAGE = { "packages": Package }
            dispatch(post_coupon_code(data.code, PACKAGE))
        }

    }

    console.log(coupons?.post_coupon_success?.data?.result)

    const MainApply = (data) => {
        if (!formData || !formData.coupon || formData.coupon === '') {
            setFormErrors({ ...formErrors, coupon: 'You have to enter a coupon code first!' });
        } else if (formData.coupon !== formData.coupon.toUpperCase()) {
            setFormErrors({ ...formErrors, coupon: 'All characters must be in upper case!' });
        } else {
            setFormErrors({ ...formErrors, coupon: '' });
            if (card_data && Array.isArray(card_data)) {
                const Package = card_data.map((item) => ({ "id": item.package_id, "quantity": item.quantity }))
                const PACKAGE = { "packages": Package }
                dispatch(post_coupon_code(formData.code, PACKAGE))
            }
        }
    }
    useEffect(() => {
        setFormErrors({ ...formErrors, coupon: coupons?.post_coupon_fail?.response?.data?.error });
        // console.log('coupon')
    }, [coupons?.post_coupon_fail])


    return (
        <div>

            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >{(item) => item.large && (
                <Box sx={{ borderRadius: '30px' }}>
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
                                                {coupons?.get_coupon_success?.data && coupons?.get_coupon_success?.data.length !== 0 ? coupons?.get_coupon_success?.data?.map((item) => (
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
                                                                    <Typography><b style={{ fontSize: '16px' }}>{item.title}</b></Typography>
                                                                    <Typography><b style={{ fontSize: '16px' }}>{item.discount} off </b>on {item.in_which_order} order</Typography>
                                                                    <Typography sx={{ color: '#76c265', fontSize: '14px' }} >Save &#8377;{item.discount_value} for this order</Typography>
                                                                    <span style={{ fontSize: '15px' }} ><b>Coupon Code: </b> <text style={{ color: 'green' }}>{item.code}</text></span><br />
                                                                    <Button size='small' onClick={() => dispatch(open_t_c_dialog(item.description))}>View T&C</Button>
                                                                </Box>
                                                            </Grid>
                                                            <Grid xs={4} textAlign='end'>
                                                            <Box sx={{ mt: 4, textAlign: 'last' }}>
                                                                    {/* <Button fullWidth size='medium' variant='contained' type='submit' onClick={() => MainApply(formData.coupon)} >Apply</Button> */}
                                                                    {item?.code === formData?.coupon ?
                                                                        <Button variant='contained' color='success' style={{ textTransform: 'capitalize'}} onClick={() => {
                                                                            ApplyCoupon(item)
                                                                            Direct_apply(item)
                                                                        }

                                                                        }>Applied</Button> :

                                                                        <Button style={{ textTransform: 'capitalize', border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} onClick={() => {
                                                                            ApplyCoupon(item)
                                                                            Direct_apply(item)
                                                                        }
                                                                        }>Apply</Button>
                                                                    }


                                                                </Box>
                                                              
                                                            </Grid>

                                                        </Grid>
                                                    </Paper>
                                                )) : 'No any coupon available'}
                                            </Box>


                                        </Grid>
                                        {/* <hr /> */}
                                    </Box>
                                </form>
                            </div>
                        </Box>

                    </BootstrapDialog>
                </Box>
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
                            <Box py={0} sx={{ overflow: 'scroll', minHeight: 350 }}>
                                <Box px={2}>
                                    <Typography textAlign='left' mb={2} fontSize={26} sx={{ fontFamily: textStyle.fontFamily }}>Apply Coupon</Typography>
                                    {/* <Typography  variant='h5' ><b>Coupon</b></Typography>  */}
                                    <Typography sx={{ opacity: '.7' }} fontSize={11} textAlign='left'>
                                        <span className='ThemeColorYellow'>
                                            For more exclusive Offer's
                                        </span>
                                    </Typography>
                                </Box>

                                <Box py={1} sx={{ overflow: 'scroll', px: 2 ,}}>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container sx={{m:0, p:0}}>
                                            <Grid xs={12} item>
                                                <TextField
                                                    onChange={handleChange}
                                                    value={formData.coupon || ''}
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
                                            <Box p={3} margin={'auto'}>

                                                <Button  size='medium' variant='contained' type='submit' onClick={() => MainApply(formData?.coupon)} style={{padding:'8px 40px', background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Apply</Button>
                                            </Box>
                                            <Box sx={{ margin: 'auto', width:'100%' }}>
                                                {loading && <Loading />}
                                                {(coupons?.get_coupon_success?.data?.length !== 0) ? coupons?.get_coupon_success?.data?.map((item) => (
                                                    <Paper fullWidth elevation={2} sx={{ my: 2 }}>
                                                        <Grid container sx={{
                                                            width: 'auto',
                                                            borderRadius: "10px",
                                                            p: 2,
                                                            backdropFilter: buttonStyles.child_backdropFilter,
                                                            background: buttonStyles.child_bg,
                                                        }}>
                                                            <Grid xs={8} textAlign={'start'}>
                                                                <Box sx={{}}>
                                                                    <Typography><span style={{ fontSize: '16px' }}>{item.title}</span></Typography>
                                                                    <Typography><span style={{ fontSize: '16px' }}> &#8377; {item.discount} </span></Typography>
                                                                    <Typography sx={{ color: '#76c265', fontSize: '14px' }} >Save &#8377; {item.discount_value}</Typography>
                                                                    <span style={{ fontSize: '15px' }} >Coupon Code: <text style={{ color: 'green' }}>{item.code}</text></span><br />
                                                                    <Button size='small' onClick={() => dispatch(open_t_c_dialog(item.description))}>View T&C</Button>
                                                                </Box>
                                                            </Grid>
                                                            <Grid xs={4} textAlign='end'>
                                                                <Box sx={{ mt: 4, textAlign: 'last' }}>
                                                                    {/* <Button fullWidth size='medium' variant='contained' type='submit' onClick={() => MainApply(formData.coupon)} >Apply</Button> */}
                                                                    {item?.code === formData?.coupon ?
                                                                        <Button variant='contained' color='success' style={{ textTransform: 'capitalize'}} onClick={() => {
                                                                            ApplyCoupon(item)
                                                                            Direct_apply(item)
                                                                        }

                                                                        }>Applied</Button> :

                                                                        <Button style={{ textTransform: 'capitalize', border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} onClick={() => {
                                                                            ApplyCoupon(item)
                                                                            Direct_apply(item)
                                                                        }
                                                                        }>Apply</Button>
                                                                    }


                                                                </Box>
                                                            </Grid>

                                                        </Grid>
                                                    </Paper>
                                                ))
                                                    :
                                                    <Typography variant='h6' color={'error'}>
                                                        "No coupons available"</Typography>
                                                }
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
