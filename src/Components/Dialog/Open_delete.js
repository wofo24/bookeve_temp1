import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { openDelete_Address, closeDelete_Address } from '../../Redux/actions/actions';
export default function Open_delete() {
  const open = useSelector((state) => state.delete_open)

  const buttonStyles = useSelector((state) => state.apply_new_theme)
  const dispatch = useDispatch()
  const handleClickOpen = () => {
    dispatch(openDelete_Address())
  };

  const handleClose = () => {
    dispatch(closeDelete_Address())
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: { borderRadius: '15px' } }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you Really want to delete the address ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{m:1}}>
          <Button onClick={handleClose}>No</Button>
          <Button  size='medium' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
