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
import { add_package, openView, closeView, incrementPackageCount } from '../../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Theme_Button from '../Theme/Theme_Button';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ViewDialog() {
    const open = useSelector((state) => state.view_open);
    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = React.useState("");
    const view_data = useSelector((state) => state.view_data);
    const buttonStyles = useSelector((state) => state.button_style)
    console.log(buttonStyles, 'button style selected')

    const handleClickOpen1 = () => {
        dispatch(openView())
    };
    console.log(view_data)
    const handleChange = (event) => {
        setSelectedValue(event.target.value);

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
        }
    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    About Package
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
                <DialogContent >
                    <Box>
                        <Grid item xs={12} sx={{ mt: -3, mb: 3 }}>
                            <Typography variant='h6'>Description:</Typography>
                            <Grid container alignItems="center">
                                <Grid item xs={12}>
                                    <Typography>{view_data.packageDescription}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} height={200} width={250} >
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={0}
                                name="radio-buttons-group"
                                onChange={handleChange}
                                value={selectedValue}
                            >
                                <Grid container>
                                    <Typography variant='h6'>{!view_data?.variants == [] && ('Variants:')}</Typography>
                                    {view_data?.variants?.map((item, index) => (
                                        <Grid item xs={12} key={index}>
                                            <Grid container alignItems="center">
                                                <Grid item xs={6} textAlign='start'>
                                                    <FormControlLabel value={`${item.variantId}`} control={<Radio />} label={`${item.variantName}`} />
                                                </Grid>
                                                <Grid item xs={6} textAlign='end'>
                                                    <Typography>{item.variantPrice}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Theme_Button funBtn={add_item} label='Add package'/>
                    {/* <Button autoFocus sx={buttonStyles} variant='contained' onClick={add_item}>
                        Add package
                    </Button> */}
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
