import React, { Suspense, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideDialogAction } from '../../../_actions/util_actions';
import { addToCart } from '../../../_actions/user_actions';

export default function AlertDialog() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const dialog = useSelector(state => state.util.dialog);
  const show = dialog ? dialog.show : false;

  const handleClose = () => {
    dispatch(hideDialogAction());
  };

  const handleArgee = async () => {
    dispatch(hideDialogAction());
    await dispatch(addToCart(dialog.product));
    navigate(`/cart`);
  };

  useEffect(() => {
    dispatch(hideDialogAction());
  }, []);

  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialog && dialog.title}
        </DialogTitle>
        <DialogContent>
          <Suspense>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: 'black' }}
            >
              {dialog && dialog.body}
            </DialogContentText>
          </Suspense>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleArgee}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
