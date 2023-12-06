import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
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
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useSelector, useDispatch } from 'react-redux';
import { openAdd_Address, closeAdd_Address, openDelete_Address } from '../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import Media from 'react-media';
// import Open_delete from '../Components/Dialog/Open_delete';
export default function Address(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const [selectedAddress, setSelectedAddress] = useState('');

    const handleClickOpen = (data) => {
        dispatch(openAdd_Address(data))
    };
    const handleClose = () => {

    }

    const address = [
        {
            house_num: '112',
            city: 'mau',
            state: 'up',
            pin: 275305,
            address_type: 'Home'

        },
        {
            house_num: '12',
            city: 'Lucknow',
            state: 'up',
            pin: 22722,
            address_type: 'Office'

        },
    ]
    const handle_Delete_Dialog = () => {
        dispatch(openDelete_Address())
    }
    const handleChange = (event) => {
        setSelectedAddress(event.target.value);
    };
    return (
        <Container sx={{ marginTop: '20px', my: 1 }}>
            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.large && (
                    <>

                        <Grid container>

                            <Grid xs={6} textAlign={'left'}>
                                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                    <Typography onClick={() => navigate('/profile')}><ArrowBackRoundedIcon sx={{ mt: .5, mr: 2 }} fontSize='large' /></Typography>
                                    <Typography variant='h5' mt={1}> <b>Address</b></Typography>
                                </Box>
                            </Grid>
                            <Grid xs={6} textAlign={'end'}>
                                <Button variant='outlined'> <b>Help</b></Button>

                            </Grid>
                        </Grid>
                        <hr />
                        <Container sx={{ marginTop: '20px', width: 650, px: 30, py: 3 }} >
                            {address.map((item, index) => (
                                <Card sx={{ my: 2, borderRadius: '10px' }}>
                                    <Grid container mx={1}>
                                        <Grid xs={10} p={1}>
                                            <FormLabel id="demo-radio-buttons-group-label" sx={{ display: 'flex' }}>
                                                <Box mt={3}>
                                                    <FormControl sx={{ display: 'flex' }}>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            value={selectedAddress}
                                                            onChange={handleChange}
                                                            name="radio-buttons-group"
                                                        >
                                                            <FormControlLabel value={`${item.house_num},${item.city},${item.state},${item.address_type}`} control={<Radio />} />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Box>
                                                <Box>
                                                    <Typography fontWeight={500}>House Number: {item.house_num}</Typography>
                                                    <Typography fontWeight={500}>City: {item.city}</Typography>
                                                    <Typography fontWeight={500}>State: {item.state}</Typography>
                                                    <Typography fontWeight={500}>Address Type: {item.address_type}</Typography>
                                                </Box>
                                            </FormLabel>
                                        </Grid>

                                        <Grid xs={2} p={2} >
                                            {/* <Button  variant="contained" startIcon={} style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} autoFocus >
                                                            </Button> */}
                                            <DeleteIcon onClick={handle_Delete_Dialog} style={{ color: buttonStyles.buttonColor }} />
                                            <br />
                                            <br />
                                            {/* <Button style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} startIcon={ }>
                                                            </Button> */}
                                            <EditIcon autoFocus onClick={handleClickOpen} style={{ color: buttonStyles.buttonColor }} />


                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                            <Box mx={10}>
                                <Button style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} fullWidth onClick={handleClickOpen} variant='outlined' sx={{ my: 1 }}>Add Address <AddIcon /> </Button>

                            </Box>
                            {props.from && (
                                <Button fullWidth onClick={() => navigate('/schedule')} variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Proceed</Button>

                            )}


                        </Container>
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
                        <Grid container mt={2}>

                            <Grid xs={6} textAlign={'left'}>
                                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                    <Typography onClick={() => navigate('/profile')}><ArrowBackRoundedIcon fontSize='medium' /></Typography>
                                    <Typography variant='h6' mx={1}> <b>Address</b></Typography>
                                </Box>
                            </Grid>
                            <Grid xs={6} textAlign={'end'}>
                                <Button variant='outlined'> <b>Help</b></Button>

                            </Grid>
                        </Grid>
                        <hr />
                        <Container sx={{ width: 'auto' }} >
                            {address.map((item, index) => (
                                <Card sx={{ my: 2, borderRadius: '10px' }}>
                                    <Grid container mx={1}>
                                        <Grid xs={10} p={1}>
                                            <FormLabel id="demo-radio-buttons-group-label" sx={{ display: 'flex' }}>
                                                <Box mt={3}>
                                                    <FormControl sx={{ display: 'flex' }}>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            value={selectedAddress}
                                                            onChange={handleChange}
                                                            name="radio-buttons-group"
                                                        >
                                                            <FormControlLabel value={`${item.house_num},${item.city},${item.state},${item.address_type}`} control={<Radio />} />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Box>
                                                <Box>
                                                    <Typography fontWeight={500}>House Number: {item.house_num}</Typography>
                                                    <Typography fontWeight={500}>City: {item.city}</Typography>
                                                    <Typography fontWeight={500}>State: {item.state}</Typography>
                                                    <Typography fontWeight={500}>Address Type: {item.address_type}</Typography>
                                                </Box>
                                            </FormLabel>
                                        </Grid>

                                        <Grid xs={2} p={2} >
                                            {/* <Button  variant="contained" startIcon={} style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} autoFocus >
                                                            </Button> */}
                                            <DeleteIcon onClick={handle_Delete_Dialog} style={{ color: buttonStyles.buttonColor }} />
                                            <br />
                                            <br />
                                            {/* <Button style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} startIcon={ }>
                                                            </Button> */}
                                            <EditIcon autoFocus onClick={handleClickOpen} style={{ color: buttonStyles.buttonColor }} />


                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                            <Box mx={10}>
                                <Button style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} fullWidth onClick={handleClickOpen} variant='outlined' sx={{ my: 1 }}>Add Address <AddIcon /> </Button>

                            </Box>
                            {/* {props.from && ( */}
                            <Button fullWidth onClick={() => navigate('/schedule')} variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Proceed</Button>

                            {/* )} */}


                        </Container>
                    </>
                )}

            </Media>



        </Container>
    )
}
