import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { show_message } from '../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux'
import Media from 'react-media';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snack() {
    const dispatch = useDispatch()
    const MessageArray = useSelector((state) => state?.snack_bar_message)


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(show_message(false, MessageArray.message, MessageArray.messageType))
    };
    return (
        <>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(matches) => (
                    <>
                        {matches.small && (
                            <Stack spacing={2} sx={{ width: '100%' }}>
                                <Snackbar open={MessageArray.open} autoHideDuration={5000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity={MessageArray.MessageType} sx={{ width: '100%', mb: { lg: 0, xs: 21 }, position: 'absolute' }}>
                                        {MessageArray.message}
                                    </Alert>
                                </Snackbar>
                            </Stack>
                        )}


                    </>
                )}


            </Media>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >

                {(matches) => (
                    <>
                        {matches.large && (
                            <Stack spacing={2} sx={{ width: '100%' }}>
                                <Snackbar open={MessageArray.open} autoHideDuration={5000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity={MessageArray.MessageType} sx={{ width: '100%', mb: { lg: 0, xs: 19 } }}>
                                        {MessageArray.message}
                                    </Alert>
                                </Snackbar>
                            </Stack>
                        )}
                    </>
                )}


            </Media>

        </>
    );
}
