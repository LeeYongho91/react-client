import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductImage from './Sections/ProductImage';
import ProductTabs from './Sections/ProductTabs';
import ProductInfo from './Sections/ProductInfo';

// import ProductInfo from './Sections/ProductInfo';
import { SHOP_SERVER } from '../../Config';
import './DetailProductPage.css';
import { loadingToggleAction } from '../../../_actions/util_actions';

function DetailProductPage() {
  const { productId } = useParams();

  const [Product, setProduct] = useState({});
  const dispatch = useDispatch();

  const getProductData = async () => {
    try {
      dispatch(loadingToggleAction(true));

      const { data } = await axios.get(
        `${SHOP_SERVER}/product/product_by_id?id=${productId}&type=single`,
      );
      console.log(data);
      setProduct(data.product[0]);
      dispatch(loadingToggleAction(false));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="product-detail">
      <div className="inner">
        <div className="product-detail-layout">
          <div className="product-detail-content">
            <ProductImage detail={Product} />
            <ProductInfo Product={Product} />
          </div>
          <div className="product-detail-tabs">
            <ProductTabs Product={Product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProductPage;
