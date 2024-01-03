import { Box, Container, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
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
import { openAdd_Address, closeAdd_Address, openDelete_Address, get_all_address } from '../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import Media from 'react-media';
export default function Address(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const all_address = useSelector((state) => state.all_address)
    const [selectedAddress, setSelectedAddress] = useState('');

    const handleClickOpen = (data) => {
        dispatch(openAdd_Address(data))
    };
    const handleClose = () => {
    }
    useEffect(() => {
        dispatch(get_all_address())
    }, [all_address.posted_address_result])

    const handle_Delete_Dialog = () => {
        dispatch(openDelete_Address())
    }

    const handleChange = (event) => {
        setSelectedAddress(event.target.value);
    };
    console.log(all_address)
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
                            {all_address?.all_address?.data?.map((item, index) => (
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
                                                            <FormControlLabel value={`${item.house_no},${item.city},${item.state},${item.address_type}`} control={<Radio />} />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Box>
                                                <Box>
                                                    <Typography fontWeight={500}>House Number: {item.house_no}</Typography>
                                                    <Typography fontWeight={500}>City: {item.city}</Typography>
                                                    <Typography fontWeight={500}>State: {item.state}</Typography>
                                                    <Typography fontWeight={500}>Country: {item.country}</Typography>
                                                    <Typography fontWeight={500}>Address Type: {item.address_type}</Typography>
                                                </Box>
                                            </FormLabel>
                                        </Grid>

                                        <Grid xs={2} p={2} >
                                            <DeleteIcon onClick={handle_Delete_Dialog} style={{ color: buttonStyles.buttonColor }} />
                                            <br />
                                            <br />
                                            <EditIcon autoFocus onClick={() => handleClickOpen('update_address')} style={{ color: buttonStyles.buttonColor }} />
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
                    <Box>
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
                            {all_address?.all_address?.data?.map((item, index) => (
                                <Card sx={{ my: 2, borderRadius: '10px' }}>
                                    <Grid container mx={1}>
                                        <Grid xs={10} p={1}>
                                            <FormLabel id="demo-radio-buttons-group-label" sx={{ display: 'flex' }}>
                                                <Box mt={4.5}>
                                                    <FormControl sx={{ display: 'flex' }}>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            value={selectedAddress}
                                                            onChange={handleChange}
                                                            name="radio-buttons-group"
                                                        >
                                                            <FormControlLabel value={`${item.house_no},${item.city},${item.state},${item.address_type}`} control={<Radio />} />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Box>
                                                <Box>
                                                    <Typography fontWeight={500}>House Number: {item.house_no}</Typography>
                                                    <Typography fontWeight={500}>City: {item.city}</Typography>
                                                    <Typography fontWeight={500}>State: {item.state}</Typography>
                                                    <Typography fontWeight={500}>Country: {item.country}</Typography>
                                                    <Typography fontWeight={500}>Address Type: {item.address_type}</Typography>
                                                </Box>
                                            </FormLabel>
                                        </Grid>

                                        <Grid xs={2} p={2} >
                                          
                                            <DeleteIcon onClick={handle_Delete_Dialog} style={{ color: buttonStyles.buttonColor }} />
                                            <br />
                                            <br />
                                           
                                            <EditIcon autoFocus onClick={()=>handleClickOpen(item)} style={{ color: buttonStyles.buttonColor, marginTop: '20px' }} />


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
                    </Box>
                )}

            </Media>



        </Container>
    )
}
