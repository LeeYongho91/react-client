import React from 'react';
import './Slick.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Product from '../../../ShopPage/Sections/Product';

function Slick({ Products }) {
  // settings 부분, 슬라이더의 기능을 조정할 수 있다.
  const settings = {
    dots: true, // 점은 안 보이게
    infinite: false, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 3, // 4장씩 보이게 해주세요
    slidesToScroll: 3, // 1장씩 넘어가세요

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderProducts = Products.map((product, index) => (
    <div className="card" key={index}>
      <div className="card-image">
        <img
          src={`http://localhost:5000/${product.images[0]}`}
          alt={product.title}
        />
      </div>
      <h2>{product.title}</h2>
      <div className="card-price">
        <div className="card-price-child">
          <div>ADD TO CART</div>
          <div>{product.price}</div>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="slick">
      <div className="inner">
        <div className="slick-content">
          <h4> FEATURED ITEMS</h4>
          <Slider {...settings} className="cards">
            {Product.length > 0 && renderProducts}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Slick;
