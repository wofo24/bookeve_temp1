import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
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
import { openAdd_Address, closeAdd_Address, openDelete_Address } from '../../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';
// import Open_delete from '../Components/Dialog/Open_delete';
export default function Address_profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClickOpen = (data) => {
        dispatch(openAdd_Address(data))
    };
    const buttonStyles = useSelector((state) => state.apply_new_theme)

    const handle_Delete_Dialog = () => {
        dispatch(openDelete_Address())
    }

    const handleClose = () => {
        dispatch(closeAdd_Address())
    };
    return (
        <Container sx={{ marginTop: '20px' }}>
            <Typography variant='h5' textAlign='center'>All address</Typography>
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

            <Button fullWidth onClick={handleClickOpen} variant='outlined' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Add Address <AddIcon /> </Button>

        </Container >
    )
}
