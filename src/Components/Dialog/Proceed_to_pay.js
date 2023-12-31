import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Box, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { useDispatch, useSelector } from 'react-redux'
import { proceed_to_pay_close, open_schedule_dialog, proceed_to_pay_open, show_all_address } from '../../Redux/actions/actions';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { Paper } from '@mui/material';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
export default function Proceed_to_pay() {
    const navigate = useNavigate()
    const selected_address = useSelector(state => state.selected_address)
    const selected_date_time_var = useSelector(state => state.selected_date_time)
    const all_address = useSelector((state) => state.all_address_dialog)
    const open_schedule = useSelector((state) => state.open_schedule)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(proceed_to_pay_open())
    }, [selected_address, selected_date_time_var])

    const handleEditSchedule = () => {
        dispatch(open_schedule_dialog())
    }

    const handleClose = () => {
        dispatch(proceed_to_pay_close())
        navigate('/payment')
    };

    const HandleEdit_show_allAddress = () => {
        if (Cookies.get('token')) {
            dispatch(show_all_address())
        } else {
            navigate('/login')
        }
    }
    return (
        <div>
            {selected_address && (!open_schedule && !all_address) && (
                <Paper sx={{ position: 'fixed', bottom: 64, left: 0, right: 0, px: 3, py: 1, }} elevation={3}>
                    <Box sx={{
                        width: '100%', margin: 'auto'
                    }}>
                        <Grid container py={1}>
                            <Grid sx={{ display: 'grid', placeContent: 'center' }} xs={1}> <Typography textAlign={'start'} variant='subtitle2'><b> <HomeRoundedIcon sx={{ color: 'gray' }} /></b>
                            </Typography></Grid>
                            <Grid xs={10} px={2} sx={{ display: 'grid', placeContent: 'start' }}><Typography textAlign={'start'} variant='subtitle2'> {selected_address.split("").slice(0, 40).join('')}...</Typography></Grid>
                            <Grid xs={1} sx={{ display: 'grid', placeContent: 'center' }} ><Typography textAlign={'start'}> <ModeEditRoundedIcon onClick={HandleEdit_show_allAddress} sx={{ color: 'gray' }} fontSize='small' /></Typography></Grid>
                        </Grid>
                        <hr style={{ marginBottom: '1px', marginTop: '-3px' }} />
                        {selected_date_time_var ? (<Grid container py={1}>
                            <Grid sx={{ display: 'grid', placeContent: 'center' }} xs={1}> <Typography textAlign={'start'} variant='subtitle2'><b> <AccessTimeRoundedIcon sx={{ color: 'gray' }} /></b>
                            </Typography></Grid>
                            <Grid xs={10} px={2} sx={{ display: 'grid', placeContent: 'start' }}><Typography textAlign={'start'} variant='subtitle2'> {selected_date_time_var}</Typography></Grid>
                            <Grid xs={1} sx={{ display: 'grid', placeContent: 'center' }} ><Typography textAlign={'start'}> <ModeEditRoundedIcon onClick={handleEditSchedule} sx={{ color: 'gray' }} fontSize='small' /></Typography></Grid>
                        </Grid>) : ''}

                        <hr style={{ marginBottom: '15px', marginTop: '-3px' }} />
                        <Button size="large" variant='contained' fullWidth onClick={handleClose}>
                            {selected_address ? selected_date_time_var ? "Proceed To Pay" : 'Select a slot' : 'Select address'}
                        </Button>
                    </Box>
                </Paper>)}
        </div>
    )
}
