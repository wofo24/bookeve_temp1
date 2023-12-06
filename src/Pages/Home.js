import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../Redux/actions/actions';
import { useEffect, useState } from 'react';
import Category from '../Components/Category';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CategoryItems from '../Components/CategoryItems';
import Carousel from '../Components/Carousel';
import { Box, Button, Card, Container, Typography } from '@mui/material';
import Search from '../Components/Search/Search';
import Search_All from '../Components/Search/Search_All';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../Css/SwiperHome.css';
import StarsSharpIcon from '@mui/icons-material/StarsSharp';
import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp';
import Testimonial from '../Components/Testimonial';
import Cookies from 'js-cookie';
import { Unknown_user_entered } from '../Redux/actions/actions';


export default function Home() {
  const posts = useSelector((state) => state?.posts);
  const query = useSelector((state) => state.search_item);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const unknown_user_success_error = useSelector((state) => state.unknown_user_success_error)

  useEffect(() => {
    dispatch(Unknown_user_entered())
  }, [])


  useEffect(() => {
    if (unknown_user_success_error.success) {
      Cookies.set('unknown_user_token', unknown_user_success_error.data.token)
    }
  }, [unknown_user_success_error])
  const handle_click = (item) => {
    navigate('/package-view', { state: { data: item } })
  }
  const [swiperRef, setSwiperRef] = useState(5);
  const buttonStyles = useSelector((state) => state.apply_new_theme)

  useEffect(() => {
    if (query && typeof query === 'string') {
      const word = query.split("");
      if (word.length <= 3) {
        setShowSearch(false);
      } else {
        setShowSearch(true);
      }
    }
  }, [query]);


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
                      <Box sx={{ position: 'sticky', top: 0, zIndex: '9999', background: buttonStyles.child_bg, py: 1 }}>
                        <Box onClick={() => navigate('/search')} sx={{ mx: 1, position: 'sticky', top: 0, zIndex: '9999', height: '56px', borderRadius: '15px', background: '#ffff' }}>
                          <Search />
                        </Box>
                      </Box>
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
                          <CategoryItems />
                          {posts?.map((item, index) => (
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
                        <Box>
                          <CategoryItems />
                          <Typography variant='h4' color={'black'} textAlign='center' m={2} fontWeight={520}>Explore Packages </Typography>
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
                              slidesPerView={3.2}
                              navigation={true}
                              className="mySwiper1"
                            >

                              {posts.map((item) => {
                                return (
                                  <SwiperSlide onClick={() => handle_click(item)} style={{ height: '211px', width: '320px' }} >
                                    <Card sx={{ borderRadius: '25px', background: '#ffff', height: '211px', width: '310px' }}>
                                      <div class="highlight red-bg ribbon">
                                        Best Seller
                                      </div>
                                      <Box sx={{ background: 'gray', height: '67%', borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }}>
                                        <img src='./' alt='image' />
                                      </Box>
                                      <Box sx={{ height: '33%', borderBottomLeftRadius: '25px', borderBottomRightRadius: '25px', background: 'white' }}>
                                        <Box textAlign='left' pt={1} >
                                          <Typography sx={{ ml: 1 }}>Main heading</Typography>
                                          <Box sx={{ display: 'flex' }}>
                                            <StarsSharpIcon fontSize='small' sx={{ color: 'green', ml: 1, mt: .2 }} /> <Typography sx={{ ml: .5 }}>2.8 (20)</Typography>
                                          </Box>
                                          <Typography textAlign='end' sx={{ color: 'black', ml: 1, mt: -3, mr: 2, fontSize: 'large' }}>
                                            &#8377; 999
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Card>
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
                              slidesPerView={3.2}
                              navigation={true}
                              className="mySwiper1"
                            >

                              {posts.map((item) => {
                                return (
                                  <SwiperSlide onClick={() => handle_click(item)} style={{ height: '211px', width: '320px' }} >
                                    <Card sx={{ borderRadius: '25px', background: '#ffff', height: '211px', width: '300px' }}>
                                      <div className="highlight red-bg ribbon">
                                        Best Seller
                                      </div>
                                      <Box sx={{ background: 'gray', height: '67%', borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }}>
                                        <img src='./' alt='image' />
                                      </Box>
                                      <Box sx={{ height: '33%', borderBottomLeftRadius: '25px', borderBottomRightRadius: '25px', background: 'white' }}>
                                        <Box textAlign='left' pt={1} >
                                          <Typography sx={{ color: 'red', ml: 1 }}>Main heading</Typography>
                                          <Box sx={{ display: 'flex' }}>
                                            <StarsSharpIcon fontSize='small' sx={{ color: 'green', ml: 1, mt: .2 }} /> <Typography sx={{ color: 'green', ml: .5 }}>2.8 (20)</Typography>
                                          </Box>
                                          <Typography textAlign='end' sx={{ color: 'black', ml: 1, mt: -3, mr: 2, fontSize: 'large' }}>
                                            &#8377; 999
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Card>
                                  </SwiperSlide>
                                );
                              })}
                            </Swiper>
                          </Box>
                          <Testimonial />
                        </Box>
                      )
                    )}

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
