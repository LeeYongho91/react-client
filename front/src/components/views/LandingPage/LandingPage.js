import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Intro from './Sections/Intro/Intro';
import Welcome from './Sections/Welcome/Welcome';
import Slick from './Sections/Slick/Slick';
import {
  loadingToggleAction,
  productImagesAction,
} from '../../../_actions/util_actions';
import { SHOP_SERVER } from '../../Config';

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip] = useState(0);
  const [Limit] = useState(10);
  const [Products, setProducts] = useState([]);


  const dispatch = useDispatch();

  const getProducts = async body => {
    try {
      dispatch(loadingToggleAction(true));
      const { data } = await axios.post(`${SHOP_SERVER}/products`, body);
      if (data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...data.productInfo]);
        } else {
          setProducts(data.productInfo);
        }
        dispatch(productImagesAction(Products));
        dispatch(loadingToggleAction(false));
      } else {
        alert('상품들을 가져오는데 실패 하였습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };


  const productImages = () => {
    
  }

  useEffect(() => {
    const body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  return (
    <>
      <Intro Products={Products} />
      <Welcome />
      <Slick Products={Products} />
    </>
  );
}

export default LandingPage;
