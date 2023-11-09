import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '../Css/App.css';
import { Box, Typography } from '@mui/material';
export default function Testimonial() {
    return (
        <Box p={2}>
            <Box mb={3}>
                <Typography variant='h4' textAlign='center' mt={3}>Testimonial</Typography>
            </Box>
            <Swiper
                style={{ marginTop: '-20px', marginBottom: '20px' }}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                // slidesPerView={4} 
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Typography variant='h6'>"If you don't want
                        to include Swiper files in your project,
                        to include Swiper files in your project,
                        you may use it from CDN. "</Typography>
                    {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                    <Box height='100%' p={2}>
                        <Typography mt={1} textAlign='center' variant='h6' color='warning'>Name</Typography>
                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                </SwiperSlide>
            </Swiper>
        </Box>
    )
}
