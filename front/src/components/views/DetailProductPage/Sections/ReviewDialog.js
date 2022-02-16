import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loadingToggleAction } from '../../../../_actions/util_actions';
import { SHOP_SERVER } from '../../../Config';

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [Desc, setDesc] = useState('');
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const productId = props.productId;

  const handleReviewAdd = async () => {
    try {
      dispatch(loadingToggleAction(true));
      setOpen(false);

      const body = {
        productId,
        description: Desc,
      };

      const { data } = await axios.post(`${SHOP_SERVER}/review/add`, body);

      if (data.success) {
        alert('리뷰등록에 성공하였습니다');
      }
      props.refreshReviews(data.review, data.reviewCount);

      dispatch(loadingToggleAction(false));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const DescChangeHander = e => {
    setDesc(e.currentTarget.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="review-add-btn" onClick={handleClickOpen}>
        REVIEW ADD
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>REVIEW</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 5 }}>
            리뷰를 등록해주세요.
          </DialogContentText>
          <textarea
            name=""
            id=""
            cols="30"
            rows="15"
            onChange={DescChangeHander}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReviewAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
