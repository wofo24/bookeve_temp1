import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import { Container } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { get_all_package_all_review, closeView } from '../../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Media from 'react-media';
import Loading from '../LoadingIcon/Loading'
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewDialog() {

    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = React.useState("");
    const open = useSelector((state) => state.view_open);
    const view_data = useSelector((state) => state.view_data);
    const package_review = useSelector((state) => state.package_review);
    const loading = useSelector((state) => state.package_review.loading);
    const styles = useSelector((state) => state.all_theme)

    const handleClose = () => {
        dispatch(closeView())
    };

    React.useEffect(() => {
        if (open) {
            dispatch(get_all_package_all_review(view_data.id))
        }
    }, [open])

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue((prevValues) => {
            if (Array.isArray(prevValues)) {
                return event.target.checked ? [...prevValues, value] : prevValues.filter(item => item !== value);
            } else {
                return event.target.checked ? [value] : [];
            }
        });
    };

    return (
        <div>
            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.large && (
                    <>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            PaperProps={{ style: { borderRadius: '15px' } }}
                        >
                            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                <Typography sx={{ fontFamily: styles?.typography?.fontFamily }}><b>About package</b></Typography>
                            </DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            {/* <hr/> */}
                            <DialogContent dividers>
                                <Box width={550}>
                                    <Box>
                                        <Grid item xs={12} sx={{ mt: .5, mb: 3 }}>
                                            <Typography fontSize={'large'}>Description:</Typography>
                                            <Grid container alignItems="center">
                                                <Grid item xs={12} pl={1}>
                                                    <span>{view_data.package_detail}</span>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box xs={12} sx={{ background: "#fff", mt: 1, p: 2 }}>
                                        <Typography sx={{ fontSize: '25px' }}>&#9733; <span style={{ fontSize: '25px', fontWeight: '600' }}>{view_data?.avg_star_rating}</span></Typography>
                                        <Typography mx={0} variant='subtitle'>{view_data?.reviews_count}  reviews</Typography>
                                        <Box>
                                            <Grid container mt={2}>
                                                <Grid item xs={2}>
                                                    &#9733; <span style={{}}>5</span>
                                                </Grid>
                                                <Grid item xs={8} sx={{}}>
                                                    <LinearProgress sx={{ mt: 1.4 }} variant="determinate" value={view_data && view_data.rating_distribution && view_data.rating_distribution['5_star']} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography textAlign={'center'}>   {view_data && view_data.rating_distribution && view_data.rating_distribution['5_star']}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container mt={2}>
                                                <Grid item xs={2}>
                                                    &#9733; <span style={{}}>4</span>
                                                </Grid>
                                                <Grid item xs={8} sx={{}}>
                                                    <LinearProgress sx={{ mt: 1.4 }} variant="determinate" value={view_data && view_data.rating_distribution && view_data.rating_distribution['4_star']} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography textAlign={'center'}>   {view_data && view_data.rating_distribution && view_data.rating_distribution['4_star']}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container mt={2}>
                                                <Grid item xs={2}>
                                                    &#9733; <span style={{}}>3</span>
                                                </Grid>
                                                <Grid item xs={8} sx={{}}>
                                                    <LinearProgress sx={{ mt: 1.4 }} variant="determinate" value={view_data && view_data.rating_distribution && view_data.rating_distribution['3_star']} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography textAlign={'center'}>   {view_data && view_data.rating_distribution && view_data.rating_distribution['3_star']}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container mt={2}>
                                                <Grid item xs={2}>
                                                    &#9733; <span style={{}}>2</span>
                                                </Grid>
                                                <Grid item xs={8} sx={{}}>
                                                    <LinearProgress sx={{ mt: 1.4 }} variant="determinate" value={view_data && view_data.rating_distribution && view_data.rating_distribution['2_star']} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography textAlign={'center'}>   {view_data && view_data.rating_distribution && view_data.rating_distribution['2_star']}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container mt={2}>
                                                <Grid item xs={2}>
                                                    &#9733; <span style={{}}>1</span>
                                                </Grid>
                                                <Grid item xs={8} sx={{}}>
                                                    <LinearProgress sx={{ mt: 1.4 }} variant="determinate" value={view_data && view_data.rating_distribution && view_data.rating_distribution['1_star']} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography textAlign={'center'}>   {view_data && view_data.rating_distribution && view_data.rating_distribution['1_star']}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>

                                    </Box>
                                    {loading ? <Loading /> :
                                        <Container sx={{ mt: 2, borderRadius: '5px', bgcolor: '#fff' }}>
                                            {package_review?.data?.success &&
                                                <>
                                                    <Typography variant={'h6'} pt={2}>Reviews</Typography>
                                                    {package_review?.data?.data?.map((item) => {
                                                        return (
                                                            <List sx={{ width: '100%' }}>
                                                                <ListItem alignItems="flex-start">
                                                                    <ListItemAvatar>
                                                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                                    </ListItemAvatar>
                                                                    <ListItemText
                                                                        primary={item.customer_name}
                                                                        secondary={
                                                                            <React.Fragment>
                                                                                <Typography
                                                                                    sx={{ display: 'inline' }}
                                                                                    component="span"
                                                                                    variant="body2"
                                                                                    color="gray"
                                                                                >
                                                                                    {item?.created}
                                                                                </Typography>

                                                                            </React.Fragment>
                                                                        }
                                                                    />
                                                                    <Typography> &#9733;  {item.rating}</Typography>
                                                                </ListItem>
                                                                <Box mx={5}>
                                                                    <Typography variant="subtitle">
                                                                        {item.comment}
                                                                    </Typography>

                                                                </Box>
                                                                <Divider variant="inset" component="li" sx={{ mt: 1 }} />

                                                            </List>
                                                        )
                                                    })}
                                                </>}
                                        </Container>
                                    }
                                    <Box sx={{ flexGrow: 1 }} width={550} >
                                        <FormControl >
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={0}
                                                name="radio-buttons-group"
                                                value={selectedValue}
                                            >
                                                <Typography variant='h6' sx={{ fontFamily: styles?.typography?.fontFamily }}>{!view_data?.variants == [] && ('Addons:')}</Typography>
                                                <Grid container my={2} px={2}>
                                                    {view_data?.variants?.map((item, index) => (
                                                        <Grid item xs={12} key={index}>
                                                            <Grid container alignItems="center">
                                                                <Grid item xs={8} textAlign='start'>
                                                                    <FormControlLabel onChange={handleChange} value={item.variantId} control={<Checkbox defaultChecked />} label={`${item.variantName}`} />
                                                                </Grid>
                                                                <Grid item xs={4} textAlign='end'>
                                                                    <Typography>&#8377; {item.variantPrice}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </DialogContent>
                            {/* <DialogActions>
                                <Theme_Button funBtn={add_item} label='Add package' />
                            </DialogActions> */}
                        </BootstrapDialog>
                    </>
                )}

            </Media>
            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.small && (
                    <>
                        <Dialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            PaperProps={{ style: { borderTopLeftRadius: '15px', borderTopRightRadius: '15px', marginTop: '550px', } }}
                            fullScreen
                            TransitionComponent={Transition}
                        >
                            <Box  >


                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                    <Typography sx={{ fontFamily: styles?.typography?.fontFamily }}><b>Details</b></Typography>
                                </DialogTitle>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Box minHeight={350} sx={{ background: '#E7E7E7', pt: 1, overflow: 'scroll', height: '30rem' }}>
                                    <Box xs={12} sx={{ background: "#fff", mt: 1, pt: 1 }}>
                                        <Grid container alignItems="center">
                                            <Grid item xs={12} pl={1}>
                                                <Typography variant='subtitle'>

                                                    <div>
                                                        <ul>

                                                            {view_data?.package_detail?.split(',').map((item) => (
                                                                <li>{item}</li>
                                                            ))
                                                            }
                                                        </ul>
                                                    </div>

                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Box>

                                    <Box xs={12} sx={{ background: "#fff", mt: 1, p: 2 }}>

                                        <Typography sx={{ fontSize: '25px' }}>&#9733; <span style={{ fontSize: '25px', fontWeight: '600' }}>{view_data?.avg_star_rating}</span></Typography>
                                        <Typography mx={0} variant='subtitle'>{view_data?.reviews_count}  reviews</Typography>
                                        <Box>
                                            <Grid container mt={2}>
                                                <Grid item xs={2}>
                                                    &#9733; <span style={{}}>5</span>
                                                </Grid>
                                                <Grid item xs={8} sx={{}}>
                                                    <LinearProgress sx={{ mt: 1.4 }} variant="determinate" value={view_data && view_data.rating_distribution && view_data.rating_distribution['5_star']} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography textAlign={'center'}>   {view_data && view_data.rating_distribution && view_data.rating_distribution['5_star']}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container mt={2}>
                                                <Grid item xs={2}>
                                                    &#9733; <span style={{}}>4</span>
                                                </Grid>
                                                <Grid item xs={8} sx={{}}>
                                                    <LinearProgress sx={{ mt: 1.4 }} variant="determinate" value={view_data && view_data.rating_distribution && view_data.rating_distribution['4_star']} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography textAlign={'center'}>   {view_data && view_data.rating_distribution && view_data.rating_distribution['4_star']}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container mt={2}>
                                                <Grid item xs={2}>
                                                    &#9733; <span style={{}}>3</span>
                                                </Grid>
                                                <Grid item xs={8} sx={{}}>
                                                    <LinearProgress sx={{ mt: 1.4 }} variant="determinate" value={view_data && view_data.rating_distribution && view_data.rating_distribution['3_star']} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography textAlign={'center'}>   {view_data && view_data.rating_distribution && view_data.rating_distribution['3_star']}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container mt={2}>
                                                <Grid item xs={2}>
                                                    &#9733; <span style={{}}>2</span>
                                                </Grid>
                                                <Grid item xs={8} sx={{}}>
                                                    <LinearProgress sx={{ mt: 1.4 }} variant="determinate" value={view_data && view_data.rating_distribution && view_data.rating_distribution['2_star']} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography textAlign={'center'}>   {view_data && view_data.rating_distribution && view_data.rating_distribution['2_star']}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container mt={2}>
                                                <Grid item xs={2}>
                                                    &#9733; <span style={{}}>1</span>
                                                </Grid>
                                                <Grid item xs={8} sx={{}}>
                                                    <LinearProgress sx={{ mt: 1.4 }} variant="determinate" value={view_data && view_data.rating_distribution && view_data.rating_distribution['1_star']} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography textAlign={'center'}>   {view_data && view_data.rating_distribution && view_data.rating_distribution['1_star']}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>

                                    </Box>
                                    {loading ? <Loading /> :
                                        <Container sx={{ mt: 2, borderRadius: '5px', bgcolor: '#fff' }}>
                                            {package_review?.data?.success &&
                                                <>
                                                    <Typography variant={'h6'} pt={2}>Reviews</Typography>
                                                    {package_review?.data?.data?.map((item) => {
                                                        return (
                                                            <List sx={{ width: '100%' }}>
                                                                <ListItem alignItems="flex-start">
                                                                    <ListItemAvatar>
                                                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                                    </ListItemAvatar>
                                                                    <ListItemText
                                                                        primary={item.customer_name}
                                                                        secondary={
                                                                            <React.Fragment>
                                                                                <Typography
                                                                                    sx={{ display: 'inline' }}
                                                                                    component="span"
                                                                                    variant="body2"
                                                                                    color="gray"
                                                                                >
                                                                                    {item?.created}
                                                                                </Typography>

                                                                            </React.Fragment>
                                                                        }
                                                                    />
                                                                    <Typography> &#9733;  {item.rating}</Typography>
                                                                </ListItem>
                                                                <Box mx={5}>
                                                                    <Typography variant="subtitle">
                                                                        {item.comment}
                                                                    </Typography>

                                                                </Box>
                                                                <Divider variant="inset" component="li" sx={{ mt: 1 }} />

                                                            </List>
                                                        )
                                                    })}
                                                </>}
                                        </Container>

                                    }




                                    <Box sx={{ flexGrow: 1 }}>
                                        <FormControl >
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={0}
                                                name="radio-buttons-group"
                                                value={selectedValue}
                                            >
                                                <Typography variant='h6' sx={{ fontFamily: styles?.typography?.fontFamily }}>{!view_data?.variants == [] && ('Addons:')}</Typography>
                                                <Grid container my={2} px={2}>
                                                    {view_data?.variants?.map((item, index) => (
                                                        <Grid item xs={12} key={index}>
                                                            <Grid container alignItems="center">
                                                                <Grid item xs={8} textAlign='start'>
                                                                    <FormControlLabel onChange={handleChange} value={item.variantId} control={<Checkbox defaultChecked />} label={`${item.variantName}`} />
                                                                </Grid>
                                                                <Grid item xs={4} textAlign='end'>
                                                                    <Typography>&#8377; {item.variantPrice}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                </Box>

                            </Box>
                        </Dialog>
                    </>
                )}

            </Media>

        </div>
    );
}
