import React from 'react'
import Coupon from '../Components/Coupon'
import { Box, Button, Grid, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function Cart() {
  const navigate = useNavigate()
  return (
    <div>
      <Box>
        <Typography>Bag</Typography>
      </Box>
      <Card sx={{ my: 2 }} elevation={2} onClick={() => navigate('/coupon')}  >
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={2}>
            <img width="40" style={{ marginTop: '10px' }} height="40" src="https://img.icons8.com/material/24/discount--v1.png" alt="discount--v1" />
          </Grid>
          <Grid item xs={8} textAlign="left">
            <Button size='large' variant='text' sx={{ marginTop: '10px' }} >Apply Coupon</Button>
          </Grid>
          <Grid item xs={2} textAlign="right">
            <ArrowForwardIosIcon sx={{ marginTop: '10px' }} />
          </Grid>
        </Grid>
      </Card>
      <Box p={4}>
        <Button variant='contained' fullWidth onClick={()=>navigate('/address')}>
          Proceed
        </Button>
      </Box>
    </div>
  )
}
