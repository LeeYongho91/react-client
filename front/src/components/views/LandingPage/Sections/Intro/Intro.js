import './Intro.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Intro({ Products }) {
  const navigate = useNavigate();

  const pageMove = productId => {
    navigate(`/product/${productId}`);
  };

  const itemRender = idx => {
    const product = Products[idx];
    return (
      <div className="item" onClick={() => pageMove(product._id)}>
        <img
          src={`${process.env.REACT_APP_API_URL}/${product.images[0]}`}
          alt={product.title}
        />
        <div className="desc">
          <h3>{product.title}</h3>
          <span>￦ {product.price.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  return (
    <section className="intro">
      <div className="inner">
        <div className="intro-content">
          <div className="left-item">
            {Products.length > 0 && itemRender(0)}
          </div>
          <div className="right-item">
            {Products.length > 0 && itemRender(1)}
            {Products.length > 0 && itemRender(2)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
