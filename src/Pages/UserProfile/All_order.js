import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { get_all_ordered_data} from '../../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
export default function All_order() {
  const dispatch = useDispatch()
  const buttonStyles = useSelector((state) => state.all_theme)
  const all_orders = useSelector((state) => state.all_orders)
  const error = useSelector((state) => state.error)
  React.useEffect(() => {
    dispatch(get_all_ordered_data())
  }, [])
  return (
    <Box sx={{ minWidth: 275 }} >
      <Typography variant='h5' textAlign='center' my={2} sx={{ fontFamily: buttonStyles.fontFamily }}>All orders</Typography>
      {[1, 2, 3].map((item, index) => {
        return (
          <Box p={2} key={index}>
            <Paper elevation={6}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <Grid container spacing={1} p={2}>
                <Grid item xs={6}>
                  <Typography>Package</Typography>
                </Grid>
                <Grid item xs={6} >
                  <Typography>Package Name</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Order Time&Date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>12/12/2024T04:50PM</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Address</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>123 Mau kopaganj</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Price</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>12220</Typography>
                </Grid>

              </Grid>
            </Paper>
          </Box>
        )
      })}
    </Box>
  );
}
