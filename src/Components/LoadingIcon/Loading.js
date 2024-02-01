import * as React from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import { Container } from '@mui/material';

function FacebookCircularProgress(props) {
    const styles = useSelector((state) => state.all_theme)
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: styles?.colors?.loading,
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </Box>
    );
}

export default function Loading() {
    return (
        <Container sx={{ display: 'grid', placeItems: 'center', height: 800 }} >
            <Box sx={{ margin: 'auto' }} >
                <FacebookCircularProgress />
            </Box>
        </Container>
    );
}
