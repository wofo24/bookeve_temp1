import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Media from 'react-media';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import 'swiper/css';
import 'swiper/css/pagination';
import img from '../images/imagesSampleIMage.png'
import Stack from '@mui/material/Stack';
import 'swiper/css/navigation';
import { useSwiper } from 'swiper/react';
import '../Css/Swiper.css';
import { Card, Grid, Typography } from '@mui/material';
import { show_this_category_package, get_public_information } from '../Redux/actions/actions';
import { CardMedia } from '@mui/material';
import Switch from '@mui/material/Switch';
import { useEffect } from 'react';
const label = { inputProps: { 'aria-label': 'Switch demo' } }

// const AntSwitch = styled(Switch)(({ theme }) => ({
//     width: 38,
//     height: 22,
//     padding: 0,
//     display: 'flex',
//     '&:active': {
//         '& .MuiSwitch-thumb': {
//             width: 15,
//             // backgroundColor: 'red',
//         },
//         '& .MuiSwitch-switchBase.Mui-checked': {
//             transform: 'translateX(9px)',
//             backgroundColor: '#ffdd00',
//         },
//     },
//     '& .MuiSwitch-switchBase': {
//         padding: 4,
//         '&.Mui-checked': {
//             transform: 'translateX(18px)',
//             color: 'white',
//             '& + .MuiSwitch-track': {
//                 opacity: 1,
//                 backgroundColor: theme.palette.mode === 'dark' ? 'red' : '#ffdd00',
//             },
//         },
//     },
//     '& .MuiSwitch-thumb': {
//         boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
//         width: 12,
//         height: 12,
//         // marginLeft:7,
//         marginTop: .4,
//         borderRadius: 15,
//         transition: theme.transitions.create(['width'], {
//             duration: 200,
//         }),
//     },
//     '& .MuiSwitch-track': {
//         borderRadius: 26 / 2,
//         opacity: 2,
//         backgroundColor:
//             theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : '#ffdd00',
//         boxSizing: 'border-box',

//     },
// }));
export default function CategoryItems() {
    const posts = useSelector((state) => state.posts.data);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handle_click = (item) => {

        console.log(item, '=========================================================================================================>')
        dispatch(show_this_category_package(item))
        navigate('/package-view')
    }

    const buttonStyles = useSelector((state) => state.all_theme)
    const public_info = useSelector((state) => state?.public_information?.data)
    const [active_check, setActive_check] = useState(() => (public_info?.services_mode === 'home_services' ? false : true))
    const error = useSelector((state) => state.error)

    const [swiperRef, setSwiperRef] = useState(5);
    const styleSwiper = {
        height: '160px',
        width: '180px',
        borderRadius: '25px',
        background: '#fff',
        mt: 2
    }


    // const handleChange = (event) => {
    //     if (active_check) {
    //         if (active_check === true) {
    //             setActive_check(false)
    //         }
    //     } else {
    //         setActive_check(true)
    //     }

    // }


    return (
        <>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(matches) => (
                    <>
                        {matches.small && (
                            <>
                                <Typography fontSize={'18px'} color={buttonStyles.icons_Color && 'black'}>Choose by category</Typography>
                                <Box
                                    sx={{
                                        overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' },
                                        display: 'flex',
                                        '& > :not(style)': {
                                            mx: 1,
                                            my: 1,
                                            minWidth: 128,
                                            minHeight: 138,
                                        },
                                        overflow: 'scroll'
                                    }}
                                >
                                    {posts?.map((item, index) => {
                                        return (
                                            <Box>
                                                <Box key={index} sx={{
                                                    // borderRadius: '10px',
                                                    // backgroundColor: 'transparent',
                                                    // backdropFilter: buttonStyles.child_backdropFilter,
                                                    // background: buttonStyles.child_bg,
                                                    color: buttonStyles.child_div_text,
                                                    overflow: 'hidden',
                                                    height: '155px'
                                                }} onClick={() => handle_click(item.id)}>
                                                    <CardMedia
                                                        sx={{ height: '89%', width: '100%', mt: 0, borderRadius: '10px', }}
                                                        image={item.icon}
                                                        title="green iguana"
                                                    />
                                                    <Typography variant='subtitle' mt={1} color={buttonStyles.icons_Color && 'black'}>{item.category}</Typography>

                                                </Box>

                                            </Box>

                                        );
                                    })}
                                </Box>
                            </>
                        )}
                        {matches.medium && <p>Medium screen content is not ready yet!</p>}


                        {matches.large && (
                            <Box sx={{ width: '100%', my: 1, pt: 2, pb: -10 }} >
                                <Grid container>
                                    {/* <Grid sx={{ mb: 2, background: '#fff8bf', px: 2, display: 'flex' }}>

                                        <div style={{ fontWeight: '700', color: 'black', fontSize: '28px', display: 'flex', }}>
                                            <Typography sx={{ color: !active_check && '#ffdd00', fontWeight: '700', display: 'flex', fontSize: '24px' }}>Home service</Typography>
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{ alignItems: 'center', ml: 1 }} >
                                                <AntSwitch checked={active_check} onChange={handleChange} inputProps={{ 'aria-label': 'ant design' }} />
                                                <Typography sx={{ color: active_check && '#ffdd00', fontWeight: '700', display: 'flex', fontSize: '22px' }}>Parlour</Typography>
                                            </Stack>

                                        </div>

                                    </Grid> */}
                                    <Grid container mb={-6} mt={2}>
                                        <Grid item xs={6}>
                                            <Typography fontSize={'25px'} color={buttonStyles.icons_Color && 'black'}>Choose by category</Typography>
                                        </Grid>
                                        <Grid item xs={6} textAlign='end'>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Swiper
                                    effect="slide" // Change to slide effect
                                    spaceBetween={10} // Adjust spaceBetween to your preference

                                    style={{ paddingBottom: '10px' }}
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    onSwiper={setSwiperRef}
                                    slidesPerView={5.3}
                                    navigation={true}
                                    className="mySwiper"
                                >

                                    {posts?.map((item) => {
                                        return (
                                            <SwiperSlide onClick={() => handle_click(item?.id)} >
                                                <Card sx={styleSwiper} >
                                                    <CardMedia
                                                        sx={{ height: '104%', width: '100%', mt: 0 }}
                                                        image={item.icon}
                                                        title="green iguana"
                                                    />
                                                </Card>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </Box>
                        )}
                    </>
                )}
            </Media>
            <hr style={{ borderBottom: '2px solid black' }} />
        </>

    );
}
