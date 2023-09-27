import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { openRepeat, closeRepeat, openDialog, incrementPackageCount } from '../../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
export default function Repeat() {
  const open = useSelector((state) => state.repeat_open);
  const data = useSelector((state) => state.repeat_data);
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(closeRepeat())
  };
  const willChose = () => {
    dispatch(closeRepeat())
    dispatch(openDialog(data))
  };
  const RepeatLast = () => {
    dispatch(incrementPackageCount(data.packageId))
    handleClose()
  }
  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to repeat last?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={willChose}>No, I'll Choose.</Button>
          <Button onClick={RepeatLast} autoFocus>
            Repeat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
