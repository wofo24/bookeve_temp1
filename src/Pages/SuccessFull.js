import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useNavigate } from 'react-router-dom';
export default function SuccessFull() {
    const navigate = useNavigate()
    return (

        <Container sx={{ margin: 'auto', textAlign: 'center', py: 10 }}>
            <CheckCircleRoundedIcon color='success' sx={{ height: 100, width: 100 }} />
            <Typography color='success' variant='h6'>Ordered Successfully!</Typography>
            <Box p={4}>
                <Button variant='contained' sx={{ margin: 1 }} onClick={() => navigate('/track_order')}>Track order</Button>
                <Button variant='contained' onClick={() => navigate('/')}>Go to home</Button>
            </Box>
        </Container>
    )
}
