import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { closeDialog, incrementPackageCount, add_package, show_message } from '../../Redux/actions/actions';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import StarsSharpIcon from '@mui/icons-material/StarsSharp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Paper from '@mui/material/Paper';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import Checkbox from '@mui/material/Checkbox';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useMediaQuery from '@mui/material/useMediaQuery';
import Media from 'react-media';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const dispatch = useDispatch()
    const open = useSelector((state) => state.dialog_open);
    const dialog_data = useSelector((state) => state.dialog_data);
    const [selectedValue, setSelectedValue] = React.useState("");
    const textStyle = useSelector((state) => state.all_theme)
    const buttonStyles = useSelector((state) => state.all_theme)
    const steps = [
        {
            label: 'Select campaign settings',
            description: `For each ad campaign that you create, you can control how much
                    you're willing to spend on clicks and conversions, which networks
                    and geographical locations you want your ads to show on, and more.`,
        },
        {
            label: 'Create an ad group',
            description:
                'An ad group contains one or more ads which target a shared set of keywords.',
        },
        {
            label: 'Create an ad',
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
    ];
    const dic = [
        {
            icon: <CheckCircleIcon fontSize='large' />,
            dis: ' If you run into any problems with your ads, find out how to tell if re running and how to resolve approval issues'
        },
        {
            icon: <CheckCircleIcon fontSize='large' />,
            dis: ' If you run into any problems with your ads, find out how to tell if re running and how to resolve approval issues'
        },
        {
            icon: <CancelIcon fontSize='large' />,
            dis: ' If you run into any problems with your ads, find out how to tell if re running and how to resolve approval issues'
        },

    ]

    const handleClose = () => {
        setSelectedValue(null);
        dispatch(closeDialog())
    };

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

    const handleIncrement = () => {
        if (selectedValue || dialog_data?.variants == []) {
            dispatch(incrementPackageCount(dialog_data.packageId))
            dispatch(add_package(dialog_data.packageId, selectedValue ? selectedValue : ''));
            setSelectedValue(null);
            handleClose();
            dispatch(show_message(true, 'Package added successfully!', 'success'))

        }
    }

    return (
        <>
            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.large && (

                    <>
                        <Dialog
                            PaperProps={{ style: { borderRadius: '15px', zIndex: '99999' } }}
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"

                        >
                            <DialogContent style={{ borderRadius: '10px' }} >
                                <Box sx={{ flexGrow: 1, height: 600 }}  >
                                    <Grid container mb={2}>
                                        <Grid item xs={10}>
                                            {/* <Typography><b></b></Typography> */}
                                            <Typography variant='h5' sx={{ fontFamily: textStyle.fontFamily }}><b>{dialog_data.packageName}</b></Typography>
                                            <Box mt={1}>

                                                <Typography sx={{ fontSize: '14px', my: 1 }}><StarsSharpIcon fontSize='small' /> 4.8(25)</Typography>
                                                <Typography sx={{ fontSize: '14px' }}> <LocalOfferIcon fontSize='small' /> &#8377;50 above &#8377;99 </Typography>
                                            </Box>

                                        </Grid>
                                        <Grid item xs={2} textAlign='end' onClick={handleClose} >
                                            <Typography ><CloseIcon /></Typography>
                                        </Grid>
                                        <hr />
                                    </Grid>
                                    <Box  my={4}>
                                        {/* <Typography variant='h5'></Typography> */}
                                        <Typography variant='h6' sx={{ fontFamily: textStyle.fontFamily }}><b>Frequently add together</b></Typography>
                                        <FormControl >
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={0}
                                                name="radio-buttons-group"

                                                value={selectedValue}
                                            >
                                                <Grid container my={2}>
                                                    {dialog_data?.variants?.map((item, index) => (
                                                        <Grid item xs={12} key={index}>
                                                            <Grid container alignItems="center">
                                                                <Grid item xs={6} textAlign='start'>
                                                                    <FormControlLabel onClick={handleChange} value={item.variantId} control={<Checkbox defaultChecked />} label={`${item.variantName}`} />
                                                                </Grid>
                                                                <Grid item xs={6} textAlign='end'>
                                                                    <Typography>&#8377; {item.variantPrice}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                    <hr />
                                    <Box  sx={{ background: 'skyblue', px: 2, py: 5, my: 4, borderRadius: '10px', textAlign: 'center', alignContent: 'center' }}>

                                        <Typography variant='h5' mb={2} sx={{ fontFamily: textStyle.fontFamily }}><b>The UC difference</b></Typography>

                                        <Box sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'flex-start',
                                            margin: 'auto',
                                        }}>
                                            <Paper elevation={3} sx={{
                                                m: 'auto', width: 123,
                                                height: 128, my: 1,
                                            }}>
                                                <ContentCutIcon />
                                                <AutoAwesomeIcon />
                                            </Paper>
                                            <Paper elevation={3} sx={{
                                                m: 'auto', width: 123,
                                                height: 128, my: 1
                                            }}>
                                                <ContentCutIcon />
                                                <AutoAwesomeIcon />
                                            </Paper>
                                            <Paper elevation={3} sx={{
                                                m: 'auto', width: 123,
                                                height: 128, my: 1
                                            }}>
                                                <ContentCutIcon />
                                                <AutoAwesomeIcon />
                                            </Paper>
                                        </Box>


                                    </Box>
                                    <hr />
                                    <Box>
                                        {/* <Typography variant='h5'>About the Process</Typography> */}
                                        <Typography variant='h5' mb={2} sx={{ fontFamily: textStyle.fontFamily }}><b>About the Process</b></Typography>
                                        <Box sx={{ maxWidth: '100%' }}>
                                            <Stepper orientation="vertical">
                                                {steps.map((step, index) => (
                                                    <Step key={step.label}>
                                                        <StepLabel>
                                                            <b> {step.label}</b>
                                                        </StepLabel>
                                                        <Typography ml={3} fontSize={'12px'}>{step.description}</Typography>


                                                    </Step>
                                                ))}
                                            </Stepper>

                                        </Box>
                                        <hr />
                                    </Box>
                                    <Box my={5}>
                                        <Button>RECOMMENDED</Button>
                                        <Typography variant='h4'><b>After care guide</b></Typography>
                                        {/* <Typography variant='h4' mb={2} sx={{fontFamily:textStyle.fontFamily}}><b>About the Process</b></Typography>  */}
                                        {dic?.map((item, index) => (
                                            <Grid container my={2} key={index}>
                                                <Grid item xs={1}>
                                                    <Typography sx={{ fontSize: '20px', color: 'green', mt: 1 }}> {item.icon}</Typography>
                                                </Grid>
                                                <Grid item xs={11} px={2}>
                                                    <Typography variant='h6'> {item.dis}</Typography>
                                                </Grid>
                                            </Grid>
                                        ))}
                                        <hr />
                                    </Box>
                                    <Box my={2}>
                                        <Typography variant='h5'>Customers reviews</Typography>
                                    </Box>
                                </Box>

                            </DialogContent>
                            <DialogActions>
                                <Button fullWidth size='large' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} onClick={handleIncrement}>Add</Button>
                            </DialogActions>
                        </Dialog>
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
                            PaperProps={{ style: { borderRadius: '15px', zIndex: '99999', marginTop: '490px' } }}
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                            fullScreen

                        >
                            <Box>
                                <DialogContent style={{ borderRadius: '10px' }} >
                                    <Box sx={{ flexGrow: 1, height: 450 }}  >
                                        <Grid container mb={2}>
                                            <Grid item xs={10}>
                                                {/* <Typography><b></b></Typography> */}
                                                <Typography variant='h5' sx={{ fontFamily: textStyle.fontFamily }}><b>{dialog_data.packageName}</b></Typography>
                                                <Box mt={1}>

                                                    <Typography sx={{ fontSize: '14px', my: 1 }}><StarsSharpIcon fontSize='small' /> 4.8(25)</Typography>
                                                    <Typography sx={{ fontSize: '14px' }}> <LocalOfferIcon fontSize='small' /> &#8377;50 above &#8377;99 </Typography>
                                                </Box>

                                            </Grid>
                                            <Grid item xs={2} textAlign='end' onClick={handleClose} >
                                                <Typography ><CloseIcon /></Typography>
                                            </Grid>
                                            <hr />
                                        </Grid>
                                        <Box  my={4}>
                                            <Typography variant='h6' sx={{ fontFamily: textStyle.fontFamily }}><b>Frequently add together</b></Typography>
                                            <FormControl >
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue={0}
                                                    name="radio-buttons-group"

                                                    value={selectedValue}
                                                >
                                                    <Grid container my={2}>
                                                        {dialog_data?.variants?.map((item, index) => (
                                                            <Grid item xs={12} key={index}>
                                                                <Grid container alignItems="center">
                                                                    <Grid item xs={6} textAlign='start'>
                                                                        <FormControlLabel onClick={handleChange} value={item.variantId} control={<Checkbox defaultChecked />} label={`${item.variantName}`} />
                                                                    </Grid>
                                                                    <Grid item xs={6} textAlign='end'>
                                                                        <Typography>&#8377; {item.variantPrice}</Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </RadioGroup>
                                            </FormControl>
                                        </Box>
                                        <hr />
                                        <Box  sx={{ background: 'skyblue', px: 2, py: 5, my: 4, borderRadius: '10px', textAlign: 'center', alignContent: 'center' }}>

                                            <Typography variant='h5' mb={2} sx={{ fontFamily: textStyle.fontFamily }}><b>The UC difference</b></Typography>

                                            <Box sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                justifyContent: 'flex-start',
                                                margin: 'auto',
                                            }}>
                                                <Paper elevation={3} sx={{
                                                    m: 'auto', width: 123,
                                                    height: 128, my: 1,
                                                }}>
                                                    <ContentCutIcon />
                                                    <AutoAwesomeIcon />
                                                </Paper>
                                                <Paper elevation={3} sx={{
                                                    m: 'auto', width: 123,
                                                    height: 128, my: 1
                                                }}>
                                                    <ContentCutIcon />
                                                    <AutoAwesomeIcon />
                                                </Paper>
                                                <Paper elevation={3} sx={{
                                                    m: 'auto', width: 123,
                                                    height: 128, my: 1
                                                }}>
                                                    <ContentCutIcon />
                                                    <AutoAwesomeIcon />
                                                </Paper>
                                            </Box>


                                        </Box>
                                        <hr />
                                        <Box>
                                            {/* <Typography variant='h5'>About the Process</Typography> */}
                                            <Typography variant='h5' mb={2} sx={{ fontFamily: textStyle.fontFamily }}><b>About the Process</b></Typography>
                                            <Box sx={{ maxWidth: '100%' }}>
                                                <Stepper orientation="vertical">
                                                    {steps?.map((step, index) => (
                                                        <Step key={step.label}>
                                                            <StepLabel>
                                                                <b> {step.label}</b>
                                                            </StepLabel>
                                                            <Typography ml={3} fontSize={'12px'}>{step.description}</Typography>


                                                        </Step>
                                                    ))}
                                                </Stepper>

                                            </Box>
                                            <hr />
                                        </Box>
                                        <Box my={5}>
                                            <Button>RECOMMENDED</Button>
                                            <Typography variant='h4'><b>After care guide</b></Typography>
                                            {/* <Typography variant='h4' mb={2} sx={{fontFamily:textStyle.fontFamily}}><b>About the Process</b></Typography>  */}
                                            {dic?.map((item, index) => (
                                                <Grid container my={2} key={index}>
                                                    <Grid item xs={1}>
                                                        <Typography sx={{ fontSize: '20px', color: 'green', mt: 1 }}>{item.icon}</Typography>
                                                    </Grid>
                                                    <Grid item xs={11} px={2}>
                                                        <Typography variant='h6'>{item.dis}</Typography>
                                                    </Grid>
                                                </Grid>
                                            ))}


                                            <hr />
                                        </Box>
                                        <Box my={2}>
                                            <Typography variant='h5'>Customers reviews</Typography>
                                        </Box>
                                    </Box>

                                </DialogContent>
                                <DialogActions>
                                    <Button fullWidth size='large' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} onClick={handleIncrement}>Add</Button>
                                </DialogActions>
                            </Box>
                        </Dialog>
                    </>
                )}
            </Media >

        </>

    );
}
