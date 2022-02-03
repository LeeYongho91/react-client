import React from 'react';
import { useNavigate } from 'react-router-dom';

function Product(props) {
  const navigate = useNavigate();

  const productDetailMove = () => {
    navigate(`/product/${props.product._id}`);
  };

  return (
    <div
      className={`product-content ${
        props.index % 4 === 3 || props.index === 3 ? 'four-product' : ''
      }`}
      onClick={productDetailMove}
    >
      <div className="product-image">
        <img
          src={`${process.env.REACT_APP_API_URL}/${props.product.images[0]}`}
          alt="product_1"
        />
      </div>
      <div className="product-desc">
        <h2>{props.product.title}</h2>
        <div className="product-price">
          <div className="product-price-child">
            <div>ADD TO CART</div>
            <div>￦ {props.product.price.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
