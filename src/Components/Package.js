import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import img from '../images/SampleIMage.jpg'
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { add_package, add_package_count, show_message, incrementPackageCount, decrementPackageCount, openDialog, openRepeat, openView, add_in_bag, } from '../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Theme_Button from './Theme/Theme_Button';
export default function Package({ item }) {
  const dispatch = useDispatch()
  const buttonStyles = useSelector((state) => state.apply_new_theme)
  const [show_btn, setShow_btn] = useState(false)
  const bag_packages = useSelector((state) => state.package_data_bag)
  const Increment = (id) => {
    if (item.variants) {
      if (item.count === 0) {
        dispatch(openDialog(item))
      }
      else {
        dispatch(openRepeat(item))
      }
    } else {
      dispatch(incrementPackageCount(id, item.count));

      dispatch(show_message(true, 'Package added successfully!', 'success'))
      dispatch(add_package(id));
    }
  }
  const Decrement = (id) => {
    dispatch(decrementPackageCount(id, item.count));
    dispatch(add_package_count(id, item.count + 1));
    dispatch(show_message(true, 'Package removed!', 'warning'))

  }
  const Show_btn = () => {
    if (!item.variants) {
      Increment(item.id)
    }
    else {
      dispatch(openDialog(item))
    }

  }


  useEffect(() => {
    dispatch(add_package_count(item.id, item.count));
  }, [item.count])


  useEffect(() => {
    if (item.count <= 0) {
      setShow_btn(false)
    }
    else {
      setShow_btn(true)
    }

  }, [item.count])

  useEffect(() => {
    if (bag_packages.length > 0) {
      const demo = { "packages": bag_packages }
      dispatch(add_in_bag(demo))
    } else {
      console.log('bag_packages is empty, skipping API call');
    }
  }, [bag_packages]);


  const open_view = (data) => {
    dispatch(openView(data))
  }


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
                {item?.package_name
                }
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Price:  {item?.original_price}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {item.offer ? (`Off: ${item?.packageDiscount}%`) : ''}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '12px', }}>
                Description: {item?.package_detail.split(' ').slice(0, 3).join(' ')} ...
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '12px', }}>
              </Typography>
              <Box pt={2}>
                <Typography sx={{ textTransform: 'capitalize', color: buttonStyles.icons_Color }} variant='text' onClick={() => open_view(item)}>View details</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5} sx={{ display: 'grid', placeContent: 'center', pt: 2 }} >
            <CardMedia
              component="img"
              sx={{ maxWidth: '150px', maxHeight: '150px', m: 'auto', borderRadius: '10px' }}
              image={img}
              alt="Live from space album cover"
            />
            <Box mt={-1}>
              <Button sx={{ color: '#fff3d0' }}>
                {show_btn ? <Grid container sx={{
                  display: 'flex', justifyContent: 'center',
                  alignContent: 'center', mt: -5, ml: 3.5, color: buttonStyles.icons_Color,
                  backgroundColor: 'white', width: '80px', height: '35px',
                  borderRadius: '10px',
                }}>
                  <Grid item textAlign={'center'} sx={{
                    display: 'flex', justifyContent: 'center',
                    alignContent: 'center',
                    pt: .7
                  }}>
                    <RemoveIcon onClick={() => Decrement(item?.id, item.count)} sx={{}} />
                  </Grid>
                  <Grid item textAlign={'center'} sx={{
                    display: 'flex', justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                    <Box sx={{ background: '#fff3d0', height: '35px', width: '30px', pt: .3, fontWeight: 600, fontSize: '17px' }}>{item.count}</Box>
                  </Grid>
                  <Grid item textAlign={'end'} sx={{
                    display: 'flex', justifyContent: 'center',
                    alignContent: 'center',
                    pt: .7
                  }}>
                    <AddIcon onClick={() => Increment(item?.id, item.count)} sx={{}} />
                  </Grid>
                </Grid> : (<Theme_Button borderRadius={'10px'} funBtn={Show_btn} mt={-5} ml={3.5} px={3} width={'80px'} label={'Add'} textColor='#ffc219' background='white' />)
                }
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>

  )
}
