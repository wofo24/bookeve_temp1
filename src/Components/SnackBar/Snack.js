import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { show_message } from '../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux'
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
        dispatch( show_message(false, MessageArray.message, MessageArray.messageType))
    };
   console.log(MessageArray)
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={MessageArray.open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={MessageArray.MessageType} sx={{ width: '100%' }}>
                    {MessageArray.message}
                </Alert>
            </Snackbar>
            {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
        </Stack>
    );
}
