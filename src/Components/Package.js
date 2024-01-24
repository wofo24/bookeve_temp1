import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import img from '../images/imagesSampleIMage.png'
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { add_package, add_fetch_post, increment_in_bag, decrement_in_bag, fetchPosts, show_message, incrementPackageCount, decrementPackageCount, openDialog, openRepeat, openView } from '../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CircularProgress from '@mui/material-next/CircularProgress';
export default function Package({ item }) {
  const dispatch = useDispatch()
  const buttonStyles = useSelector((state) => state.all_theme)
  const [show_btn, setShow_btn] = useState(false)
  const [Load, setLoad] = useState(false)

  const Increment = (id) => {
    dispatch(add_fetch_post());
    if (item.variants) {
      if (item.quanitity === 0) {
        dispatch(openDialog(item))
      }
      else {
        dispatch(openRepeat(item))
      }
    } else {
      dispatch(increment_in_bag(id));
      dispatch(incrementPackageCount(id));
      dispatch(add_package(id));
      dispatch(show_message(true, 'Package added successfully!', 'success'))
    }
  }

  const Decrement = () => {
    dispatch(add_fetch_post());
    dispatch(decrement_in_bag(item.id));
    dispatch(show_message(true, 'Package removed!', 'warning'))
  }

  const Show_btn_ = () => {
    setShow_btn(true);
  };
  const Loading = () => {
    setLoad(true)
  }

  useEffect(() => {
    if (item?.quanitity >= 1 || item?.quanitity === 0) {
      Show_btn_();
      setLoad(false)
    }
    else {
      setShow_btn(false)
      setLoad(false)

    }
  }, [item.quanitity]);

  const open_view = (data) => {
    dispatch(openView(data))
  }

  // console.log(item)

  return (
    <Box my={1.5} sx={{ backgroundColor: 'transparent' }}>
      <Card sx={{
        backgroundColor: 'transparent',
        background: buttonStyles.child_bg,
        backdropFilter: buttonStyles.child_backdropFilter,
        color: buttonStyles.child_div_text,
        border: '1px solid #ececec',
        borderRadius: '10px',
        maxHeight: '190px',
        minHeightL: '150px',
        '@media screen and (min-width: 1200px)': {
          minWidth: '450px', // Adjust the value as needed
          margin: '0 auto', // Center the card horizontally
        }
      }}  >
        <Grid container>
          <Grid item xs={7} >
            <Box py={2} px={2} >
              <Typography component="div" sx={{ color: 'black', }} >
                {item?.package_name}
              </Typography>
              <Typography component="div" sx={{ color: 'black', fontSize: '13px', color: 'gray', py: .4 }} >
                <Box sx={{ borderBottom: '1px dotted', width: 135, }}>
                  <StarsRoundedIcon sx={{ mt: -.5, fontSize: '18px' }} /> {item.avg_star_rating} ({item.reviews_count} reviews)
                </Box>
              </Typography>
              <Typography variant="subtitle1" fontSize={'14px'} component="div">
                &#8377;{parseFloat(item?.original_price)} &#x2666; {item.duration} min
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {item.offer ? (`Off: ${item?.packageDiscount}%`) : ''}
              </Typography>
              {/* <Typography variant="subtitle1" fontSize={'15px'} color="text.secondary" component="div">
                Duration :min
              </Typography> */}
              <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                {item?.package_detail.split(' ').slice(0, 4).join(' ')} ...
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '12px', }}>
              </Typography>
              <Box pt={1}>
                <Typography sx={{ textTransform: 'capitalize', color: buttonStyles.icons_Color }} variant='text' onClick={() => open_view(item)}>View details</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5} sx={{ display: 'grid', placeContent: 'center', pt: 2 }} >
            <Box sx={{ maxWidth: '150px', maxHeight: '130px', overflow: 'hidden', borderRadius: '10px' }}>
              <CardMedia
                component="img"
                sx={{ width: '130px', height: '135px', m: 'auto', }}
                image={item.icon === null ? img : item.icon}
                alt="Not Found!"
              />
            </Box>
            <Box mt={-1}>
              <Button sx={{ color: '#fff3d0' }}>
                {show_btn ?
                  <>
                    < Grid container sx={{
                      display: 'flex', justifyContent: 'center',
                      alignContent: 'center', mt: -5, ml: 2.5, color: buttonStyles.icons_Color,
                      backgroundColor: 'white', width: '80px', height: '35px',
                      borderRadius: '10px',
                    }}>
                      {Load ? (
                        <CircularProgress
                          color="tertiary"
                          variant="indeterminate"
                          sx={{
                            width: '24px',
                            height: '24px',
                          }}
                        />
                      ) :
                        <>
                          <Grid item textAlign={'center'} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignContent: 'center',
                            pt: .7
                          }}>
                            <RemoveIcon onClick={() => {
                              Decrement(item?.id)
                              Loading()
                            }} sx={{}} />
                          </Grid>
                          <Grid item textAlign={'center'} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignContent: 'center',
                          }}>
                            <Box sx={{ background: '#fff3d0', height: '35px', width: '30px', pt: .3, fontWeight: 600, fontSize: '17px' }}>
                              {item.quanitity === null ? 0 : item.quanitity}
                            </Box>
                          </Grid>
                          <Grid item textAlign={'end'} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignContent: 'center',
                            pt: .7
                          }}>
                            <AddIcon onClick={() => {
                              Loading()
                              Increment(item?.id)
                            }} />
                          </Grid>
                        </>
                      }


                    </Grid>
                  </>
                  :
                  (<Button sx={{
                    borderRadius: '10px', mt: -5, ml: 2.5, px: 3, textColor: '#ffc219',
                    background: 'white', background: buttonStyles.buttonColor,
                    color: buttonStyles.buttonText,
                    '&:hover, &:active': {
                      background: buttonStyles.buttonColor,
                      textColor: '#ffc219',
                    },
                  }} width={'80px'} onClick={() => {
                    // Show_btn()
                    Loading()
                    Increment(item?.id)
                  }} >
                    {Load ? <CircularProgress
                      color="tertiary"
                      variant="indeterminate"
                      sx={{
                        width: '24px',
                        height: '24px',
                        //  px: 1
                        mx: .45
                      }}
                    /> : 'Add'}
                  </Button>)
                }
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box >

  )
}
