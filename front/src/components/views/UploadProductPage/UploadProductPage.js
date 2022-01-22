import React, { useState } from 'react';

import axios from 'axios';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FileUpload from '../../utils/FileUpload';
import './UploadProductPage.css';

function UploadProductPage(props) {
  console.log(props);

  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState(0);
  const [Images, setImages] = useState([]);

  const titleChangeHander = e => {
    setTitle(e.currentTarget.value);
  };

  const DescriptionChangeHander = e => {
    setDescription(e.currentTarget.value);
  };

  const PriceChangeHander = e => {
    setPrice(e.currentTarget.value);
  };

  const updateImages = newImages => {
    setImages(newImages);
  };

  const submitHandler = async e => {
    e.preventDefault();
    console.log('test');

    if (!Title || !Description || !Price || !Images) {
      return alert('모든 값을 넣어주세요.');
    }

    // 서버에 채운 값들을 request로 보낸다.

    const body = {
      // 로그인 된 사람의 ID
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
    };

    try {
      const { data } = await axios.post('/api/product', body);
      console.log(data);

      if (data.success) {
        alert('상품 업로드에 성공하였습니다.');
        // props.history.push('/');
      } else {
        alert('상품 업로드에 실패하였습니다.');
      }
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
          value={Price}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
