import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
// import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Card } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
// import { openAdd_Address, closeAdd_Address, handle_Delete_Dialog, openDelete_Address, hide_all_address, show_all_address } from '../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { show_all_address, hide_all_address, openDelete_Address, openAdd_Address } from '../../Redux/actions/actions';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function All_Address() {
    // const [open, setOpen] = React.useState(false);
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const open = useSelector((state) => state.all_address_dialog)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleClose = () => {
        dispatch(hide_all_address())
    };

    const handleClickOpen = (data) => {
        dispatch(openAdd_Address(data))
    };

    const handle_Delete_Dialog = () => {
        dispatch(openDelete_Address())
    }

    return (
        <div>
            <React.Fragment>

                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Saved Address
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
                    <DialogContent dividers>
                        <Container sx={{ marginTop: '20px' }}>
                            <Card sx={{ my: 2 }}>
                                <Grid container mx={1}>
                                    <Grid xs={8} p={2}>
                                        <FormLabel id="demo-radio-buttons-group-label" sx={{ display: 'flex' }}>
                                            <Box mt={3}>
                                                <FormControl sx={{ display: 'flex' }}>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue=""
                                                        name="radio-buttons-group"
                                                    >
                                                        <FormControlLabel value="female" control={<Radio />} />

                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>

                                            <Box>
                                                <Typography fontWeight={600}>House Number: </Typography>
                                                <Typography fontWeight={600}>City: </Typography>
                                                <Typography fontWeight={600}>State: </Typography>
                                                <Typography fontWeight={600}>Address Type: </Typography>
                                            </Box>
                                        </FormLabel>
                                    </Grid>

                                    <Grid xs={4} p={2} >
                                        <Button onClick={handle_Delete_Dialog} variant="contained" startIcon={<DeleteIcon />} >
                                        </Button>
                                        <br />
                                        <br />
                                        <Button variant="contained" onClick={handleClickOpen} startIcon={<EditIcon />}>

                                        </Button>


                                    </Grid>
                                </Grid>
                            </Card>
                            <Button style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} fullWidth onClick={handleClickOpen} variant='outlined' sx={{ my: 1 }}>Add Address <AddIcon /> </Button>

                            <Button fullWidth variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Proceed</Button>
                        </Container>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Save changes
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>

        </div>
    )
}
