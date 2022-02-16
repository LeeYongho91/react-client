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

export default function AlertDialog() {
  const navigate = useNavigate();
  const { closeDialog } = useDialog();
  const dispatch = useDispatch();
  const dialog = useSelector(state => state.util.dialog);
  const show = dialog ? dialog.show : false;

  const handleClose = () => {
    closeDialog();
  };

  const handleArgee = async () => {
    if (dialog.type === 'confirm') {
      closeDialog();
      const result = await dispatch(addToCart(dialog.product));
      if (result) navigate(`/cart`);
    }
    closeDialog();
    navigate(`/cart`);
  };

  useEffect(() => {
    closeDialog();
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
                확인
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                취소
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={handleArgee}>
                장바구니로 가기
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                취소
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
