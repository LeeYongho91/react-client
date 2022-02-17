import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FileUpload from '../../utils/FileUpload';
import './UploadProductPage.css';
import { SHOP_SERVER } from '../../Config';
import { loadingToggleAction } from '../../../_actions/util_actions';
import useDialog from '../../utils/Dialogs/DialogHooks';

function UploadProductPage(props) {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState(0);
  const [Images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { alertDialog } = useDialog();

  const titleChangeHander = e => {
    setTitle(e.currentTarget.value);
  };

  const DescriptionChangeHander = e => {
    setDescription(e.currentTarget.value);
  };

  const PriceChangeHander = e => {
    setPrice(parseInt(e.currentTarget.value, 10));
  };

  const updateImages = newImages => {
    setImages(newImages);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!Title || !Description || !Price || !Images) {
      return alertDialog({ title: '', body: '모든값을 넣어주세요.' });
    }

    const body = {
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
    };

    try {
      dispatch(loadingToggleAction(true));
      const { data } = await axios.post(`${SHOP_SERVER}/upload`, body);
      console.log(data);

      if (data.success) {
        alertDialog({
          title: '',
          body: '상품 업로드에 성공하였습니다.',
          type: 'upload',
        });
      } else {
        alertDialog({ title: '', body: '상품 업로드에 실패하였습니다.' });
      }
      dispatch(loadingToggleAction(false));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="upload-content">
      <div className="upload-title">
        <h2 level={2}>상품 업로드</h2>
      </div>
      <form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label htmlFor="">이름</label>
        <TextField
          id="name"
          variant="outlined"
          fullWidth
          required
          onChange={titleChangeHander}
          value={Title}
        />
        <br />
        <br />
        <label htmlFor="">설명</label>
        <TextareaAutosize
          onChange={DescriptionChangeHander}
          value={Description}
          minRows={3}
          className="upload-desc"
        />
        <br />
        <label htmlFor="">가격</label>
        <TextField
          id="price"
          variant="outlined"
          fullWidth
          required
          onChange={PriceChangeHander}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          type="number"
        />
        <br />
        <br />
        <button htmltype="submit" className="upload-btn">
          업로드
        </button>
      </form>
    </div>
  );
}

export default UploadProductPage;
