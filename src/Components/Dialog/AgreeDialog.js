import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux'
import { close_agree_dialog } from '../../Redux/actions/actions';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const open = useSelector((state) => state.agree_box)
  const dispatch = useDispatch()
  const buttonStyles = useSelector((state) => state.apply_new_theme)

  const handleClose = () => {
    dispatch(close_agree_dialog())
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}

        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you really want to Cancel this Booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size='medium' variant='outlined' style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: buttonStyles.buttonColor }} >Disagree</Button>
          <Button onClick={handleClose} size='medium' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
