import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../Redux/actions/actions';
import { useEffect, useState } from 'react';
import style from '../Css/Home.module.css';
import Category from '../Components/Category';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import DialogComponent from '../Components/Dialog/DialogComponent';
import CategoryItems from '../Components/CategoryItems';
import Carousel from '../Components/Carousel';
import { Box, Button, Container, Typography } from '@mui/material';
import Search from '../Components/Search/Search';
import Search_All from '../Components/Search/Search_All';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import Index from '../Components/Theme/Index'
// import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// import Media from 'react-media';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useSwiper } from 'swiper/react';
import CardMedia from '@mui/material/CardMedia';
import '../Css/SwiperHome.css';
import { Grid } from '@mui/material';
import Switch from '@mui/material/Switch';
import StarsSharpIcon from '@mui/icons-material/StarsSharp';
import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp';
import Testimonial from '../Components/Testimonial';
export default function Home() {
  const posts = useSelector((state) => state.posts);
  const query = useSelector((state) => state.search_item);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handle_click = (item) => {
    navigate('/package_view', { state: { data: item } })
  }
  const [swiperRef, setSwiperRef] = useState(5);

  useEffect(() => {
    const word = query.split("")
    if (word.length <= 3) {
      setShowSearch(false)
    }
    else {
      setShowSearch(true)
    }

  }, [query])
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <Media
        queries={{
          small: '(max-width: 768px)',
          medium: '(min-width: 769px) and (max-width: 1024px)',
          large: '(min-width: 1025px)',
        }}
      >
        {(matches) => (

          matches.small && (
            <>
              <TransitionGroup>
                <CSSTransition
                  key={showSearch}
                  in={showSearch}
                  timeout={500}
                  classNames="fade"
                  unmountOnExit
                >
                  <div>
                    {showSearch && <Search_All query={query} />}
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </>
          )

        )}

      </Media>



      <TransitionGroup>
        <CSSTransition
          in={!showSearch}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <div>
            {!showSearch && (
              <>
                <Media
                  queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                  }}
                >
                  {(matches) => (

                    matches.small && (
                      <>
                        <Box sx={{ pt: 0.2, position: 'sticky', top: 0, background: '#ffff', zIndex: '9999', height: '50px' }}>
                          <Box sx={{ background: '#fff', zIndex: '9999', height: '50px' }}>
                            <Search />
                          </Box>
                        </Box>
                      </>
                    )

                  )}

                </Media>
                <Carousel />
                <Container sx={{ m: 0, p: 1 }}>

                  <Media
                    queries={{
                      small: '(max-width: 768px)',
                      medium: '(min-width: 769px) and (max-width: 1024px)',
                      large: '(min-width: 1025px)',
                    }}
                  >
                    {(matches) => (
                      matches.small && (
                        <>
                          {posts.map((item, index) => (
                            <Category data={item} key={index} />
                          ))}
                        </>
                      )
                    )}

                  </Media>
                  <Media
                    queries={{
                      small: '(max-width: 768px)',
                      medium: '(min-width: 769px) and (max-width: 1024px)',
                      large: '(min-width: 1025px)',
                    }}
                  >


                    {(matches) => (
                      matches.large && (
                        <>
                          <CategoryItems />
                          <Typography variant='h4' textAlign='center' m={2}>Explore Packages </Typography>
                          <Box sx={{ background: '#a7d1b3', px: 3, position: 'relative' }}>
                            <Box sx={{ display: 'flex', pt: 3, pb: 2, float: 'left' }}>
                              <Typography variant='h5'>Trending </Typography><TrendingUpSharpIcon color='error' sx={{ ml: 1 }} fontSize='large' />
                            </Box>
                            <Swiper
                              effect="slide" // Change to slide effect
                              spaceBetween={10} // Adjust spaceBetween to your preference
                              pagination={{
                                clickable: true,
                              }}
                              style={{ paddingBottom: '50px' }}
                              modules={[Navigation, Pagination, Scrollbar, A11y]}
                              onSwiper={setSwiperRef}
                              slidesPerView={4}
                              navigation={true}
                              className="mySwiper1"
                            >

                              {posts.map((item) => {
                                return (
                                  <SwiperSlide onClick={() => handle_click(item)} style={{ borderRadius: '25px', background: '#ffff', height: '200px', width: '290px' }}>
                                    <div class="highlight red-bg ribbon">
                                      Best Seller
                                    </div>
                                    <Box sx={{ mt: 1.5, height: '65%', borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }}>
                                      <img src='./' alt='image' />
                                    </Box>
                                    <Box sx={{ height: '33%', borderBottomLeftRadius: '25px', borderBottomRightRadius: '25px', background: 'yellow' }}>
                                      <Box textAlign='left' >
                                        <Typography sx={{ color: 'red', ml: 1 }}>Main heading</Typography>
                                        <Box sx={{ display: 'flex' }}>
                                          <StarsSharpIcon fontSize='small' sx={{ color: 'green', ml: 1, mt: .2 }} /> <Typography sx={{ color: 'green', ml: .5 }}>2.8 (20)</Typography>
                                        </Box>
                                        <Typography textAlign='end' sx={{ color: 'black', ml: 1, mt: -3, mr: 2 }}>
                                          &#8377; 999
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </SwiperSlide>
                                );
                              })}
                            </Swiper>
                          </Box>

                          <Box sx={{ background: '#a7d1b3', px: 3, mt: 3 }}>

                            <Box sx={{ display: 'flex', pt: 3, pb: 2, float: 'left' }}>
                              <Typography variant='h5'>Category Name </Typography>
                            </Box>
                            <Swiper
                              effect="slide" // Change to slide effect
                              spaceBetween={10} // Adjust spaceBetween to your preference
                              pagination={{
                                clickable: true,
                              }}
                              style={{ paddingBottom: '50px' }}
                              modules={[Navigation, Pagination, Scrollbar, A11y]}
                              onSwiper={setSwiperRef}
                              slidesPerView={4} // Set slidesPerView to 5
                              navigation={true}
                              className="mySwiper1"
                            >

                              {posts.map((item) => {
                                return (
                                  <SwiperSlide onClick={() => handle_click(item)} style={{ borderRadius: '25px', background: '#ffff', height: '200px', width: '290px' }}>
                                    <div class="highlight red-bg ribbon">
                                      Best Seller
                                    </div>
                                    <Box sx={{ mt: 1.5, height: '65%', borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }}>
                                      <img src='./' alt='image' />
                                    </Box>
                                    <Box sx={{ height: '33%', borderBottomLeftRadius: '25px', borderBottomRightRadius: '25px', background: 'yellow' }}>
                                      <Box textAlign='left' >
                                        <Typography sx={{ color: 'red', ml: 1 }}>Main heading</Typography>
                                        <Box sx={{ display: 'flex' }}>
                                          <StarsSharpIcon fontSize='small' sx={{ color: 'green', ml: 1, mt: .2 }} /> <Typography sx={{ color: 'green', ml: .5 }}>2.8 (20)</Typography>
                                        </Box>
                                        <Typography textAlign='end' sx={{ color: 'black', ml: 1, mt: -3, mr: 2 }}>
                                          &#8377; 999
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </SwiperSlide>
                                );
                              })}
                            </Swiper>
                          </Box>
                          <Testimonial />
                        </>
                      )
                    )}
                    {/* <CategoryItems /> */}
                  </Media>



                </Container>
              </>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
