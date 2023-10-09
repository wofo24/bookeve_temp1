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
export default function Package({ item }) {
  const dispatch = useDispatch()
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

  return (
    <div>
      <Box my={1.5}>
        <Card sx={{ borderRadius: '10px' }} >
          <Grid container>
            <Grid item xs={7}>
              <Box py={1} px={2}>
                <Typography component="div" >
                  {item.packageName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Price:  {item.packagePrice}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Off:  {item.packageDiscount}%
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                  Description: {item.packageDescription.split(' ').slice(0, 5).join(' ')} ..
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                </Typography>
                <Button sx={{ textTransform: 'capitalize' }} onClick={() => open_view(item)}>View details</Button>
              </Box>

            </Grid>
            <Grid item xs={5}>
              <CardMedia
                component="img"
                sx={{ width: 130, height: '100%', float: 'right' }}
                image={img}
                alt="Live from space album cover"
              />
              {show_btn ? <Button className={`${style_css.add_btn}`} sx={{ mt: -7, ml: 6, color: '#ffc219', backgroundColor: 'white', width: '80px', borderRadius: '10px' }}>
                <RemoveIcon onClick={() => Decrement(item.packageId)} sx={{ mx: 1 }} />
                {item.count}
                <AddIcon onClick={() => Increment(item.packageId)} sx={{ mx: 1 }} />
              </Button> : <Button className={`${style_css.add_btn}`} sx={{ mt: -7, ml: 6, color: '#ffc219', background: 'white', width: '80px', borderRadius: '10px' }} onClick={Show_btn} >Add</Button>}
            </Grid>
          </Grid>


        </Card>
      </Box>
    </div >
  )
}
