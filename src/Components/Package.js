import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import img from '../images/SampleIMage.jpg'
import { Fullscreen } from '@mui/icons-material';
import { Button } from '@mui/material';
import style_css from '../Css/Home.module.css'
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
export default function Package({ item }) {
  const theme = useTheme();
  return (
    <div>
      <Box my={1.5}>
        <Card sx={{ borderRadius: '10px' }} >
          <Grid container>
            <Grid item xs={7}>
              <Box sx={{}} py={1} px={2}>

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
                </Typography></Box>

            </Grid>
            <Grid item xs={5}>
              <CardMedia
                component="img"
                sx={{ width: 130, height: '100%', float: 'right' }}
                image={img}
                alt="Live from space album cover"
              />

              <Button className={`${style_css.add_btn}`} sx={{ mt: -7, ml: 6, color: '#ffc219', background: 'white', width: '80px', borderRadius: '10px' }} >Add</Button>
            </Grid>

          </Grid>


        </Card>
      </Box>
    </div >
  )
}
