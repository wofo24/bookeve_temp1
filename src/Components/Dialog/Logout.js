import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { open_sign_out_dialog, close_sign_out_dialog } from '../../Redux/actions/actions';
import Cookies from 'js-cookie';
export default function Logout() {
  const open = useSelector((state) => state.sign_out)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = Cookies.get('token')

  const handleClickOpen = () => {
    Cookies.remove('token')
    window.location.reload(true)
    if (token) {
      setTimeout(() => {
        Cookies.remove('token')

        navigate('/')
      }, 1000);


    }
  };

  const handleClose = () => {
    dispatch(close_sign_out_dialog())
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to Sign out?"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
           
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClickOpen} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}