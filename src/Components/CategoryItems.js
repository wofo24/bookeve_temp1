import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Media from 'react-media';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../Css/Swiper.css';
import { Card, Grid, Typography } from '@mui/material';
import { show_this_category_package, } from '../Redux/actions/actions';
import { CardMedia } from '@mui/material';

export default function CategoryItems() {
    const posts = useSelector((state) => state.posts.data);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handle_click = (item) => {
        dispatch(show_this_category_package(item))
        navigate('/package-view')
    }

    const styles = useSelector((state) => state.all_theme)
    const [swiperRef, setSwiperRef] = useState(5);
    const styleSwiper = {
        height: '160px',
        width: '180px',
        borderRadius: '25px',
        background: '#fff',
        mt: 2
    }


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
                                <Typography fontSize={'18px'} color={styles?.colors?.primary && 'black'}>Choose by category</Typography>
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
                                            <Box key={item.id} >
                                                <Box sx={{
                                                    color: styles.child_div_text,
                                                    overflow: 'hidden',
                                                    height: '155px'
                                                }} onClick={() => handle_click(item.id)}>
                                                    <CardMedia
                                                        sx={{ height: '89%', width: '100%', mt: 0, borderRadius: '10px', }}
                                                        image={item.icon}
                                                        title="green iguana"
                                                    />
                                                    <Typography variant='subtitle' mt={1} color={styles?.colors?.primary && 'black'}>{item.category}</Typography>

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
                                    <Grid container mb={-6} mt={2}>
                                        <Grid item xs={6}>
                                            <Typography fontSize={'25px'} color={styles?.colors?.primary && 'black'}>Choose by category</Typography>
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

                                    {posts?.map((item, index) => {
                                        return (
                                            <SwiperSlide key={item.id} onClick={() => handle_click(item?.id)} >
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
