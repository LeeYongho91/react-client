import React, { Suspense, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useDialog from './DialogHooks';

export default function AlertDialog() {
  const { alertCloseDialog } = useDialog();
  const dialog = useSelector(state => state.util.alertDialog);
  const show = dialog ? dialog.show : false;
  const navigate = useNavigate();

  const handleClose = () => {
    alertCloseDialog();
    if (dialog.type === 'upload') navigate('/shop');
    else if (dialog.type === 'login') navigate('/login');
  };

  useEffect(() => {
    alertCloseDialog();
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
              style={{ color: 'black', padding: '10px 50px' }}
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
          <Button variant="contained" onClick={handleClose}>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
