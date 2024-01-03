import { Box, Container, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Card } from '@mui/material'
import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { checked_out_get, open_check_out } from '../Redux/actions/actions';
import { Link } from 'react-router-dom';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import { useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Track_order() {
    const [expanded, setExpanded] = React.useState(false);
    const data = useSelector(state => state.check_out_data)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(checked_out_get())
    }, [])
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    console.log(data?.check_out_get_list_success, 'this is check oute data')

    return (
        <Container>
            <Grid container sx={{ m: 1, pt: 2 }}>
                <Grid item xs={1} onClick={() => navigate('/')}><WestRoundedIcon fontSize='medium' /></Grid>
                <Grid item xs={11}><Typography pt={.4} px={1}>Go to Home</Typography></Grid>
            </Grid>
            {data?.check_out_get_list_success && data?.check_out_get_list_success?.data?.map((item) => (
                <Card sx={{
                    m: 1, my: 2,
                    borderRadius: '10px',
                    backdropFilter: `blur(10px)`,
                    background: ' rgb(255 255 255 / 0.6)',
                    color: 'black',
                }}>
                    <CardHeader
                        title={<Box fontSize={'18px'} fontWeight={200}>Packages: {item?.packages.length}</Box>}
                        subheader={<Box>
                            <Typography>
                                Appointment Date: <span style={{ color: 'black' }}>{item.appointment_date.split(" ").join(' Time-')}</span>
                            </Typography>
                            <Typography>
                                Applied Coupon: {item.coupon ? item.coupon : 'No Coupon '}
                            </Typography>
                            <Typography>
                                Discount: &#8377;{item.discount}
                            </Typography>
                            <Typography>
                                Total Price: &#8377;{item.total_price}
                            </Typography>
                        </Box>}
                    />
                    <CardContent sx={{ mt: -3 }}>
                        <Typography variant="body2" color="text.secondary">
                            <Link to={'#'} style={{ marginTop: "12px" }} onClick={() => dispatch(open_check_out(item))}> View in details</Link>
                        </Typography>
                    </CardContent>


                </Card>
            ))}

        </Container>
    )
}
