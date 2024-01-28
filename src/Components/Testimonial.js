import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '../Css/App.css';
import { Box, Card, Typography } from '@mui/material';
export default function Testimonial() {
    const buttonStyles = useSelector((state) => state?.all_theme)
    return (
        <Box p={2}>
            <Box mb={3}>
                <Typography variant='h4' textAlign='center' mt={1}>Testimonial</Typography>
            </Box>
            <Swiper
                style={{ marginTop: '-30px', marginBottom: '30px' }}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}

                slidesPerView={3}
                coverflowEffect={{
                    rotate: 10,
                    stretch: -5,
                    depth: 10,
                    modifier: 3,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Card sx={{
                        backdropFilter: buttonStyles.child_backdropFilter,
                        background: buttonStyles.child_bg,
                        color: buttonStyles.child_div_text,
                    }}>
                        <Box height='100%' p={2} >
                            <Typography variant='h6'>"If you don't want
                                to include Swiper files in your project,
                                to include Swiper files in your project,
                                you may use it from CDN. "</Typography>
                            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            <Typography mt={1} textAlign='center' variant='h6' color='warning'>Name</Typography>
                        </Box>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card>
                        <Box height='100%' p={2} >
                            <Typography variant='h6'>"If you don't want
                                to include Swiper files in your project,
                                to include Swiper files in your project,
                                you may use it from CDN. "</Typography>
                            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            <Typography mt={1} textAlign='center' variant='h6' color='warning'>Name</Typography>
                        </Box>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card>
                        <Box height='100%' p={2} >
                            <Typography variant='h6'>"If you don't want
                                to include Swiper files in your project,
                                to include Swiper files in your project,
                                you may use it from CDN. "</Typography>
                            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            <Typography mt={1} textAlign='center' variant='h6' color='warning'>Name</Typography>
                        </Box>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card>
                        <Box height='100%' p={2} >
                            <Typography variant='h6'>"If you don't want
                                to include Swiper files in your project,
                                to include Swiper files in your project,
                                you may use it from CDN. "</Typography>
                            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            <Typography mt={1} textAlign='center' variant='h6' color='warning'>Name</Typography>
                        </Box>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card>
                        <Box height='100%' p={2} >
                            <Typography variant='h6'>"If you don't want
                                to include Swiper files in your project,
                                to include Swiper files in your project,
                                you may use it from CDN. "</Typography>
                            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            <Typography mt={1} textAlign='center' variant='h6' color='warning'>Name</Typography>
                        </Box>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card>
                        <Box height='100%' p={2} >
                            <Typography variant='h6'>"If you don't want
                                to include Swiper files in your project,
                                to include Swiper files in your project,
                                you may use it from CDN. "</Typography>
                            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            <Typography mt={1} textAlign='center' variant='h6' color='warning'>Name</Typography>
                        </Box>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card>
                        <Box height='100%' p={2} >
                            <Typography variant='h6'>"If you don't want
                                to include Swiper files in your project,
                                to include Swiper files in your project,
                                you may use it from CDN. "</Typography>
                            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            <Typography mt={1} textAlign='center' variant='h6' color='warning'>Name</Typography>
                        </Box>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card>
                        <Box height='100%' p={2} >
                            <Typography variant='h6'>"If you don't want
                                to include Swiper files in your project,
                                to include Swiper files in your project,
                                you may use it from CDN. "</Typography>
                            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            <Typography mt={1} textAlign='center' variant='h6' color='warning'>Name</Typography>
                        </Box>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card>
                        <Box height='100%' p={2} >
                            <Typography variant='h6'>"If you don't want
                                to include Swiper files in your project,
                                to include Swiper files in your project,
                                you may use it from CDN. "</Typography>
                            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            <Typography mt={1} textAlign='center' variant='h6' color='warning'>Name</Typography>
                        </Box>
                    </Card>
                </SwiperSlide>
            </Swiper>
        </Box>
    )
}
