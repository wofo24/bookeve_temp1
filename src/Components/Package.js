import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import img from '../images/SampleIMage.jpg'
import { Button, Link } from '@mui/material';
import style_css from '../Css/Home.module.css'
import Grid from '@mui/material/Grid';
import { add_package, incrementPackageCount, decrementPackageCount, openDialog, openRepeat, openView, } from '../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Theme_Button from './Theme/Theme_Button';
// import {  useDispatch } from 'react-redux';
export default function Package({ item }) {
  const dispatch = useDispatch()
  // const buttonStyles = useSelector((state) => state.apply_new_theme)
  const [show_btn, setShow_btn] = useState(false)
  const Increment = (id) => {
    if (item.variants) {
      if (item.count === 0) {
        dispatch(openDialog(item))
      }
      else {
        dispatch(openRepeat(item))
      }
    } else {
      dispatch(incrementPackageCount(id));
      dispatch(add_package(id));
    }
  }
  const Decrement = (id) => {
    dispatch(decrementPackageCount(id));
  }
  const Show_btn = () => {
    if (!item.variants) {
      Increment(item.packageId)
    }
    else {
      dispatch(openDialog(item))
    }

  }


  useEffect(() => {
    if (item.count <= 0) {
      setShow_btn(false)
    }
    else {
      setShow_btn(true)
    }

  }, [item.count])

  const open_view = (data) => {
    dispatch(openView(data))
  }
  const buttonStyles = useSelector((state) => state.apply_new_theme)
  // console.log(buttonStyles)
  return (

    <Box my={1.5} sx={{ backgroundColor: 'transparent' }}>
      <Card sx={{
        backgroundColor: 'transparent',
        background: buttonStyles.child_bg,
        backdropFilter: buttonStyles.child_backdropFilter,
        color:buttonStyles.child_div_text,
        border: '1px solid #ececec',
        borderRadius: '10px',
        maxHeight: '190px',
        minHeightL: '150px'

      }} >
        <Grid container>
          <Grid item xs={7} >
            <Box py={2} px={2} >
              <Typography component="div" sx={{ color: 'black', }} >
                {item.packageName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Price:  {item.packagePrice}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Off:  {item.packageDiscount}%
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '12px', }}>
                Description: {item.packageDescription.split(' ').slice(0, 4).join(' ')} ...
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
            <Box >
              {show_btn ? <Button sx={{ mt: -5, ml: 4.5, color: buttonStyles.icons_Color, backgroundColor: 'white', width: '80px', borderRadius: '10px' }}>
                <RemoveIcon onClick={() => Decrement(item.packageId)} sx={{ mx: 1 }} />
                {item.count}
                <AddIcon onClick={() => Increment(item.packageId)} sx={{ mx: 1 }} />
              </Button> : (<Theme_Button funBtn={Show_btn} mt={-5} ml={5.5} width={'80px'} label={'Add'} textColor='#ffc219' background='white' />)
              }
            </Box>

          </Grid>
        </Grid>
      </Card>
    </Box>

  )
}
