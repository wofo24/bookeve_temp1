import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { openDialog, closeDialog, incrementPackageCount, add_package } from '../../Redux/actions/actions';
// import useDispa
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { } from '../../Redux/actions/actions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const open = useSelector((state) => state.dialog_open);
    const dialog_data = useSelector((state) => state.dialog_data);
    const [selectedValue, setSelectedValue] = React.useState("");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const dispatch = useDispatch()
    const handleClose = () => {
        setSelectedValue(null);
        dispatch(closeDialog())
    };

    const handleIncrement = () => {
        if (selectedValue || dialog_data?.variants == []) {
            dispatch(incrementPackageCount(dialog_data.packageId))
            dispatch(add_package(dialog_data.packageId, selectedValue ? selectedValue : ''));
            setSelectedValue(null); // or setSelectedValue(''); to unselect the radio button
            handleClose();
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent >
                    <Box sx={{ flexGrow: 1 }} height={200} width={250} >
                        <Grid container mb={2}>
                            <Grid item xs={6}>
                                <Typography>Select a Option</Typography>
                            </Grid>
                            <Grid item xs={6} textAlign='end' onClick={handleClose} >
                                <Typography><CloseIcon /></Typography>
                            </Grid>
                            <hr />
                        </Grid>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={0}
                                name="radio-buttons-group"
                                onChange={handleChange}
                                value={selectedValue}
                            >
                                <Grid container>
                                    {dialog_data?.variants?.map((item, index) => (
                                        <Grid item xs={12} key={index}>
                                            <Grid container alignItems="center">
                                                <Grid item xs={6} textAlign='start'>
                                                    <FormControlLabel value={item.variantId} control={<Radio />} label={`${item.variantName}`} />
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
                    <Button onClick={handleClose} variant='outlined' color='error'>Cancel</Button>
                    <Button variant='outlined' onClick={handleIncrement}>Add </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
