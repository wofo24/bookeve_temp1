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
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import 'swiper/css';
import 'swiper/css/pagination';
import Stack from '@mui/material/Stack';
import 'swiper/css/navigation';
import { useSwiper } from 'swiper/react';
import '../Css/Swiper.css';
import { Grid, Typography } from '@mui/material';
import { show_this_category_package } from '../Redux/actions/actions';
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } }

export default function CategoryItems() {
    const posts = useSelector((state) => state.posts);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const swiper = useSwiper();
    const handle_click = (item) => {
        dispatch(show_this_category_package(item))
        navigate('/package_view')
    }

    const [swiperRef, setSwiperRef] = useState(5);
    const styleSwiper = {
        height: '130px',
        borderRadius: '25px',
        background: '#fff',
        width: '110px'
    }
    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 38,
        height: 22,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
                // backgroundColor: 'red',
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
                backgroundColor: '#ffdd00',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 4,
            '&.Mui-checked': {
                transform: 'translateX(18px)',
                color: 'white',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? 'red' : '#ffdd00',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            // marginLeft:7,
            marginTop: .4,
            borderRadius: 15,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            opacity: 2,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',

        },
    }));


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
                            <Box
                                sx={{
                                    display: 'flex',
                                    '& > :not(style)': {
                                        m: 1,
                                        minWidth: 128,
                                        minHeight: 138,
                                    },
                                    overflow: 'scroll'
                                }}
                            >
                                {posts.map((item) => {
                                    return (
                                        <Paper sx={{
                                            borderRadius: '10px',
                                            backgroundColor: 'transparent',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            WebkitBackdropFilter: 'blur(1px)',
                                            backdropFilter: 'blur(1px)',
                                            color: '#fff'
                                        }} onClick={() => handle_click(item.categoryId)}>

                                            <span>Category Id, {item.categoryId}</span>
                                        </Paper>
                                    );
                                })}
                            </Box>
                        )}
                        {matches.medium && <p>Medium screen content is not ready yet!</p>}


                        {matches.large && (
                            <Box sx={{ width: '100%', my: 1, pt: 3, pb: -10 }} >
                                <Grid container>
                                    <Grid sx={{ mb: 2, background: '#fff8bf', px: 2, display: 'flex' }}>

                                        <div style={{ fontWeight: '700', color: 'black', fontSize: '28px', display: 'flex', }}>
                                            <Typography sx={{ fontWeight: '700', display: 'flex', fontSize: '22px' }}>Home service</Typography>
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{ alignItems: 'center', ml: 1 }} >
                                                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                                <Typography sx={{ color: '#ffdd00', fontWeight: '700', display: 'flex', fontSize: '22px' }}>Parlour</Typography>
                                            </Stack>

                                        </div>

                                    </Grid>
                                    <Grid container mb={-3}>
                                        <Grid item xs={6}>
                                            <Typography variant='h4'>Choose By category</Typography>
                                        </Grid>
                                        <Grid item xs={6} textAlign='end'>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Swiper
                                    effect="slide" // Change to slide effect
                                    spaceBetween={10} // Adjust spaceBetween to your preference
                                    pagination={{
                                        clickable: true,
                                    }}
                                    style={{ paddingBottom: '50px' }}
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    onSwiper={setSwiperRef}
                                    slidesPerView={7}
                                    navigation={true}
                                    className="mySwiper"
                                >

                                    {posts.map((item) => {
                                        return (
                                            <SwiperSlide onClick={() => handle_click(item.categoryId)} style={styleSwiper}>
                                                <Box sx={{}} >

                                                </Box>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </Box>
                        )}
                    </>
                )}
            </Media>
            <hr />
        </>

    );
}
