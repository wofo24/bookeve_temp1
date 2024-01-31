import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useNavigate } from 'react-router-dom';

// import {useHistory} 
import { useSelector } from 'react-redux';

export default function SuccessFull() {
    const styles = useSelector((state) => state.all_theme)
    const navigate = useNavigate();


    React.useEffect(() => {
        window.history.replaceState(null, '/', window.location.href);
    }, []);

    React.useEffect(() => {
        navigate({ state: null });
    }, []);


    return (
        <Container sx={{ margin: 'auto', textAlign: 'center', py: 10 }}>
            <CheckCircleRoundedIcon color='success' sx={{ height: 100, width: 100 }} />
            <Typography color='success' variant='h6'>Ordered Successfully!</Typography>
            <Box p={4}>
                <Button variant='contained' sx={{ margin: 1 }} style={{ background: styles?.colors?.button, color: styles?.colors?.text }} onClick={() => navigate('/track-order')}>Track order</Button>
                <Button variant='contained' style={{ background: styles?.colors?.button, color: styles?.colors?.text }} onClick={() => navigate('/')}>Go to home</Button>
            </Box>
        </Container>
    )
}
