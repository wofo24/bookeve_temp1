import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from '@mui/material';
import CircularProgress from '@mui/material-next/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { add_fetch_post, increment_in_bag, clear_all_cart_data, store_pathname, get_all_cart_data, decrement_in_bag, store_data_for_check_out, show_message, click_to_apply_coupon, open_coupon_dialog, show_all_address, hide_all_address, open_schedule_dialog } from '../Redux/actions/actions';
import Media from 'react-media';
import empty_cart from '../images/empty_cart.png';
import { CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom'
export default function Small_Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const card_data = useSelector((state) => state.card_data)
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const Coupon_Code_value = useSelector((state) => state.apply_onClick_coupon)
    const update_in_post = useSelector((state) => state.update_in_post)
    const posts = useSelector((state) => state?.posts);
    const [disable, setDisable] = React.useState(true)
    const [Load, setLoad] = useState(false)
    const [id, setId] = useState()
    const totalPackagePrice = []
    const handleOpen = () => {
        dispatch(open_coupon_dialog())
    }

    const handleIncrease = (id) => {
        setId(id)
        dispatch(increment_in_bag(id))
        dispatch(get_all_cart_data())
        dispatch(add_fetch_post())
        setLoad(true)
    };

    const handelDecrease = (id) => {
        setId(id)
        dispatch(decrement_in_bag(id))
        dispatch(add_fetch_post())
        dispatch(get_all_cart_data())
        setLoad(true)
    }

    useEffect(() => {
        setTimeout(() => {
            dispatch(get_all_cart_data())
            setLoad(false)
        }, 1000);


        dispatch(store_pathname(window.location.pathname))
    }, [dispatch, posts, update_in_post])

    useEffect(() => {
        if (Coupon_Code_value) {
            dispatch(show_message(true, 'Coupon applied successful!', 'success'))
        }
        else {
            dispatch(show_message(true, 'Coupon removed!', 'warning'))

        }
    }, [Coupon_Code_value])


    useEffect(() => {
        const ready_for_check_out = Array.isArray(card_data) && card_data.length > 0 ? card_data?.map((item) => ({ "id": item.package_id, "quantity": item.quantity })) : []
        dispatch(store_data_for_check_out(ready_for_check_out))
    }, [card_data])

    useEffect(() => {
        if (Array.isArray(card_data) && card_data.length > 0) {
            setDisable(false)
        }

    }, [card_data])


    return (

        <Media
            queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}
        >
            {(item) => (
                item.large && (
                    <Box sx={{ p: 3, m: 'auto' }}>
                        <Grid container spacing={3}>
                            <Grid xs={12}>

                                <Box mx={1}>
                                    <Card sx={{
                                        borderRadius: '10px',
                                        backdropFilter: buttonStyles.child_backdropFilter,
                                        background: buttonStyles.child_bg,
                                        color: buttonStyles.child_div_text, p: 2
                                    }} >
                                        <Grid container mt={1}>
                                            <Grid xs={7}>
                                                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                    {/* <Typography><ArrowBackRoundedIcon sx={{ mt: .5, mr: 2 }} onClick={() => navigate('/')} fontSize='medium' /></Typography> */}
                                                    <Typography variant='h6' ml={1} fontWeight={600}> Cart</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid container xs={5} justifyContent="flex-end">
                                                <Button color='error'
                                                    style={{
                                                        color: disable ? 'gray' : 'red',
                                                    }}
                                                    disabled={disable}
                                                    onClick={() => {
                                                        dispatch(clear_all_cart_data()).then(() => {
                                                            window.location.reload(true);
                                                        });
                                                    }}>
                                                    <span style={{ textUnderlinePosition: 'under', borderBottom: `1px solid ${disable ? 'gray' : 'red'}`, textTransform: 'capitalize', fontSize: '15px' }}> Clear Cart</span>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        {/* <Box>
                                            <Typography variant='h6'> <b>Cart</b></Typography>
                                        </Box> */}

                                        <Box px={1}>
                                            {Array.isArray(card_data) && card_data.length > 0 ? (

                                                card_data?.map((item) => {
                                                    // console.log(item, id)
                                                    const total_price = item.original_price * item.quantity;
                                                    totalPackagePrice.push(total_price);
                                                    if (item.quantity !== 0) {
                                                        return (
                                                            <Grid container mt={2} mb={1} key={item.id}>
                                                                <Grid xs={6}>
                                                                    <Typography>{item?.package}</Typography>
                                                                    <Typography>Price: &#8377; {total_price}</Typography>
                                                                </Grid>
                                                                {Load && id === item.package_id
                                                                    ?
                                                                    <Grid xs={6} textAlign={'end'}>
                                                                        <Button sx={{ color: buttonStyles.icons_Color, backgroundColor: 'white', width: '80px', borderRadius: '10px' }}>
                                                                            <CircularProgress
                                                                                color="tertiary"
                                                                                variant="indeterminate"
                                                                                sx={{
                                                                                    width: '24px',
                                                                                    height: '24px',
                                                                                }}
                                                                            />
                                                                        </Button>
                                                                    </Grid>
                                                                    :
                                                                    <Grid xs={6} textAlign={'end'}>
                                                                        <Button sx={{ color: buttonStyles.icons_Color, backgroundColor: 'white', width: '80px', borderRadius: '10px' }}>
                                                                            {item?.quantity <= 1 ? (
                                                                                <DeleteIcon sx={{ mx: 1 }} onClick={() => handelDecrease(item.package_id)} />
                                                                            ) : (
                                                                                <RemoveIcon sx={{ mx: 1 }} onClick={() => handelDecrease(item.package_id)} />
                                                                            )}
                                                                            {item?.quantity}
                                                                            <AddIcon sx={{ mx: 1 }} onClick={() => handleIncrease(item.package_id)} />
                                                                        </Button>
                                                                    </Grid>
                                                                }
                                                            </Grid>
                                                        );
                                                    }
                                                })
                                            ) : (
                                                <Box height={'170px'} py={1} my={4}>
                                                    <CardMedia
                                                        component="img"
                                                        alt="green iguana"
                                                        style={{ objectFit: 'contain', width: '100%', height: '100%', marginTop: '-40px' }}
                                                        image={empty_cart}
                                                    />

                                                    <Typography color={'warning'} my={1} textAlign={"center"}><Link to={'/'}>Go to add</Link></Typography>
                                                    <Typography color={'error'} variant='h6' mt={-0} textAlign={"center"}>Empty Cart</Typography>
                                                </Box>
                                            )}
                                        </Box>

                                        {/* <Grid sx={{ background: '#22bb33', mt: 2 }}>
                                            <Typography sx={{ color: 'white', textAlign: 'center', py: 1 }}>Congratulation &#8377;12,00 saved!
                                            </Typography>
                                        </Grid> */}
                                        {Array.isArray(card_data) && card_data.length > 0 &&
                                            <Box p={1} py={1.3} mt={2} style={{ display: 'flex', background: buttonStyles.buttonColor, color: buttonStyles.buttonText, borderRadius: '10px' }} >
                                                <Grid container >
                                                    <Grid xs={6}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%' }}>

                                                            <Typography fontSize={'14px'}>&#8377;12,00 <strike style={{ fontSize: '12px' }}>&#8377;12,00</strike></Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid xs={6} sx={{ textAlign: 'end' }}>
                                                        <Link
                                                            to={`/cart`}
                                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                                        >
                                                            <Typography sx={{ cursor: 'pointer', fontSize: '14px', }}>Proceed</Typography>
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        }

                                    </Card>

                                    {Coupon_Code_value && (
                                        <Card sx={{
                                            my: 2,
                                            borderRadius: '10px',
                                            backdropFilter: `blur(10px)`,
                                            background: '#22bb33',
                                            color: 'black', p: 1
                                        }}  >
                                            <Grid container p={0}>
                                                <Grid item xs={2} pt={.1}>
                                                    <CheckCircleOutlineIcon fontSize='large' sx={{ color: '#e3f2fd' }} />
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <Box sx={{ color: '#e3f2fd' }}>
                                                        <Typography><b>{Coupon_Code_value}</b> applied</Typography>
                                                        <Typography sx={{ fontSize: '10px' }}>-&#8377;1200 (30% off)</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
                                                        <Button color='error' onClick={() => dispatch(click_to_apply_coupon(''))}>Remove</Button>
                                                    </Box>
                                                </Grid>

                                            </Grid>
                                        </Card>
                                    )}
                                    {!Coupon_Code_value && (<Card sx={{
                                        my: 1, borderRadius: '10px',
                                        backdropFilter: `blur(10px)`,
                                        background: ' rgb(255 255 255 / 0.6)',
                                        color: 'black', p: 2
                                    }} onClick={handleOpen}  >
                                        <Grid container p={1}>
                                            <Grid item xs={2}>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <img width="30" style={{ marginTop: '0px' }} height="30" src="https://img.icons8.com/material/24/discount--v1.png" alt="discount--v1" />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'left' }}>
                                                    <Box>
                                                        <Typography ><b>Coupon offer's</b></Typography>
                                                        <span>Get 150 off</span>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} p={1} >
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <Typography>Offers</Typography> <ArrowForwardIosIcon />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Card>)}

                                    {Array.isArray(card_data) && card_data.length > 0 &&
                                    <Card sx={{
                                        borderRadius: '10px',
                                        backdropFilter: `blur(10px)`,
                                        background: ' rgb(255 255 255 / 0.6)',
                                        color: 'black', p: 2
                                    }} p={1}>
                                        <Typography mb={1}>Payment Summary</Typography>
                                        <Grid container>
                                            <Grid xs={6}>Item total</Grid>
                                            <Grid xs={6} textAlign={'end'}> &#8377;{totalPackagePrice.reduce(function (accumulator, currentValue) { return accumulator + currentValue }, 0)}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid xs={6}>Item discount</Grid>
                                            <Grid xs={6} textAlign={'end'}>  &#8377; --</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid xs={6}>Tax and fee</Grid>
                                            <Grid xs={6} textAlign={'end'}> &#8377; --</Grid>
                                        </Grid>
                                        <hr />
                                        <Grid container>
                                            <Grid xs={6}><b>
                                                <Typography>

                                                    Total
                                                </Typography>
                                            </b>

                                            </Grid>
                                            <Grid xs={6} textAlign={'end'}><b><Typography>
                                                &#8377; {(totalPackagePrice.reduce(function (accumulator, currentValue) { return accumulator + currentValue }, 0)).toLocaleString('en-IN')}

                                            </Typography></b></Grid>
                                        </Grid>
                                    </Card>
                                    }
                                    
                                </Box>

                            </Grid>
                        </Grid>
                    </Box>
                )
            )
            }

        </Media >

    )
}
