import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function SuccessFull() {
    const navigate = useNavigate()
    const buttonStyles = useSelector((state) => state.apply_new_theme)

    return (
        <Container sx={{ margin: 'auto', textAlign: 'center', py: 10 }}>
            <CheckCircleRoundedIcon color='success' sx={{ height: 100, width: 100 }} />
            <Typography color='success' variant='h6'>Ordered Successfully!</Typography>
            <Box p={4}>
                <Button variant='contained' sx={{margin: 1 }} style={{background:buttonStyles.buttonColor, color:buttonStyles.buttonText}} onClick={() => navigate('/track_order')}>Track order</Button>
                <Button variant='contained'  style={{background:buttonStyles.buttonColor, color:buttonStyles.buttonText}} onClick={() => navigate('/')}>Go to home</Button>
            </Box>
        </Container>
    )
}
