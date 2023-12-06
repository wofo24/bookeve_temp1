import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
// import { openView, closeView } from '../Redux/actions/actions';
import { add_package, show_message, openView, closeView, incrementPackageCount } from '../../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Theme_Button from '../Theme/Theme_Button';
import Checkbox from '@mui/material/Checkbox';
import Media from 'react-media';
import Slide from '@mui/material/Slide';
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
    const open = useSelector((state) => state.view_open);
    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = React.useState("");
    const view_data = useSelector((state) => state.view_data);
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const textStyle = useSelector((state) => state.apply_new_theme)


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

    console.log(selectedValue, 'selected value')
    const handleClose = () => {
        dispatch(closeView())
    };

    const add_item = () => {
        if (selectedValue || view_data?.variants == []) {
            dispatch(incrementPackageCount(view_data.packageId))
            dispatch(add_package(view_data.packageId, selectedValue ? selectedValue : ''));
            handleClose()
            dispatch(show_message(true, 'Package added successfully!', 'success'))

        }
    }

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
                                <Typography sx={{ fontFamily: textStyle.fontFamily }}><b>About package</b></Typography>
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
                                                    <span>{view_data.packageDescription}</span>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Box sx={{ flexGrow: 1 }} width={550} >
                                        <FormControl fullWidth>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={0}
                                                name="radio-buttons-group"
                                                value={selectedValue}
                                            >
                                                <Typography variant='h6' sx={{ fontFamily: textStyle.fontFamily }}>{!view_data?.variants == [] && ('Addons:')}</Typography>
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
                            <DialogActions>
                                <Theme_Button funBtn={add_item} label='Add package' />
                            </DialogActions>
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
                            PaperProps={{ style: { borderTopLeftRadius: '15px', borderTopRightRadius:'15px', zIndex: '99999', marginTop: '550px', } }}
                            fullScreen
                            TransitionComponent={Transition}
                        >
                            <Box>


                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                    <Typography sx={{ fontFamily: textStyle.fontFamily }}><b>About package</b></Typography>
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
                                    <Box minHeight={350}>
                                        <Box>
                                            <Grid item xs={12} sx={{ mt: .5, mb: 3 }}>
                                                <Typography fontSize={'large'}>Description:</Typography>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} pl={1}>
                                                        <span>{view_data.packageDescription}</span>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Box>

                                        <Box sx={{ flexGrow: 1 }}>
                                            <FormControl fullWidth>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue={0}
                                                    name="radio-buttons-group"
                                                    value={selectedValue}
                                                >
                                                    <Typography variant='h6' sx={{ fontFamily: textStyle.fontFamily }}>{!view_data?.variants == [] && ('Addons:')}</Typography>
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
                                </DialogContent >
                                <DialogActions fullScreen>
                                    <Button fullWidth size='large' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} onClick={add_item}>Add</Button>
                                </DialogActions>
                            </Box>
                        </Dialog>
                    </>
                )}

            </Media>

        </div>
    );
}
