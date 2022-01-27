import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductImage from './Sections/ProductImage';
// import ProductInfo from './Sections/ProductInfo';
import { SHOP_SERVER } from '../../Config';
import './DetailProductPage.css';

function DetailProductPage() {
  const { productId } = useParams();

  const [Product, setProduct] = useState({});

  const getProductData = async () => {
    try {
      const { data } = await axios.get(
        `${SHOP_SERVER}/product/product_by_id?id=${productId}&type=single`,
      );
      console.log(data);
      setProduct(data.product[0]);
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
            <div className="product-detail-image">
              <ProductImage detail={Product} />
            </div>
            <div className="product-detail-desc">
              <h2>{Product.title}</h2>
              <span>{Product.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProductPage;
