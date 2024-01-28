import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Box, CardMedia, Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { close_check_out } from '../../Redux/actions/actions';
import img from '../../images/imagesSampleIMage.png'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CheckOut_list() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.open_check)
    const handleClose = () => {
        dispatch(close_check_out())
    };

    return (
        <React.Fragment>

            <Dialog
                fullScreen
                open={data.open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{ mt: 1 }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{ style: { borderRadius: '15px', zIndex: '999999999', marginTop: '100%', maxHeight: '90vh' } }}
            >
                <Box sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Button autoFocus color="inherit" sx={{ textTransform: "capitalize", fontSize: '20px' }} onClick={handleClose}>
                            Ordered Packages
                        </Button>

                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">

                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </Box>
                <Divider />
                <Typography variant='h6' mx={2} mt={2}>Packages</Typography>
                <List sx={{ overflow: 'auto', height: '30rem', maxHeight: 'calc(80vh - 250px)' }}>
                    {data?.data_success?.packages?.map((item) => {
                        return (
                            <Box sx={{ mb: 2, mx: 2, borderRadius: '10px', mt: 1, px: 2, py: 1, boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;` }}>
                                <Grid container>
                                    <Grid item xs={4} sx={{ py: 1 }}>
                                        <CardMedia
                                            sx={{ height: '110px', width: '120px', borderRadius: '10px', }}
                                            component="img"
                                            image={img}
                                        />
                                    </Grid>
                                    <Grid item xs={8} sx={{ py: 1 }}>
                                        <Box mx={2} px={1}>
                                            <Typography variant='h6'>{item?.package_name}</Typography>
                                            <Typography variant='subtitle'>Price : ₹{item.price}</Typography><br />
                                            <Typography variant='subtitle'>Quantity : {item.quantity}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        )
                    })
                    }
                    <Divider />
                    <ListItem button>
                        <ListItemText
                            primary={`Total Price: ₹${data?.data_success?.total_price}`}
                            secondary={`Payment : ${data?.data_success?.paid ? 'Paid' : 'Unpaid'}`}
                        />

                    </ListItem>
                </List>
            </Dialog>
        </React.Fragment>
    );
}