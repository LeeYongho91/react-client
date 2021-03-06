import React, { Suspense, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../../_actions/user_actions';
import useDialog from './DialogHooks';

export default function CartDialog() {
  const navigate = useNavigate();
  const { cartCloseDialog } = useDialog();
  const dispatch = useDispatch();
  const dialog = useSelector(state => state.util.cartDialog);
  const show = dialog ? dialog.show : false;

  const handleClose = () => {
    cartCloseDialog();
  };

  const handleArgee = async () => {
    if (dialog.type === 'confirm') {
      cartCloseDialog();
      const result = await dispatch(addToCart(dialog.product));
      if (result) navigate(`/cart`);
    }
    cartCloseDialog();
    navigate(`/cart`);
  };

  useEffect(() => {
    cartCloseDialog();
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

        <DialogActions
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {dialog && dialog.type === 'confirm' ? (
            <>
              <Button variant="contained" onClick={handleArgee}>
                ??????
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                ??????
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={handleArgee}>
                ??????????????? ??????
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                ??????
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
