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
  const [ProductsImages, setProductsImage] = useState([]);

  const dispatch = useDispatch();

  // const productImages = () => {
  //   const arr = [];
  //   Products.forEach(product => {
  //     arr.push(product.images[0]);
  //   });
  //   setProductsImage(arr);
  //   dispatch(productImagesAction(ProductsImages));
  // };

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
        dispatch(loadingToggleAction(false));
      } else {
        alert('상품들을 가져오는데 실패 하였습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const body = {
      skip: Skip,
      limit: Limit,
    };

    if (Products.length === 0) {
      getProducts(body);
    } else if (ProductsImages.length === 0) {
      const arr = [];

      for (let i = 0; i < Products.length; i++) {
        const product = Products[i];
        arr.push(product.images[0]);
        if (i === 7) break;
      }
      setProductsImage(arr);
    } else {
      dispatch(productImagesAction(ProductsImages));
    }
  }, [Products, ProductsImages]);

  return (
    <>
      <Intro Products={Products} />
      <Welcome />
      <Slick Products={Products} />
    </>
  );
}

export default LandingPage;
