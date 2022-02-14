import React, { Suspense } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { /* useModal, */ useHideModal } from './DialogWrapperHooks';

export default function AlertDialog() {
  //   const { modal } = useModal();
  const { handleOnClose } = useHideModal();
  // Import dynamic component according to component path param
  //   const CustomComponent = lazy(() => import(`${modal.componentPath}`));
  //   const [open, setOpen] = useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <div>
      <Dialog
        open={false}
        /*         onClose={handleClose} */
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">dd</DialogTitle>
        <DialogContent>
          <Suspense>
            <DialogContentText id="alert-dialog-description">
              {/* {modal.componentPath ? (
                <CustomComponent {...modal.componentProps} />
              ) : (
                modal.body
              )} */}
              ddd
            </DialogContentText>
          </Suspense>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose}>Disagree</Button>
          <Button onClick={handleOnClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
