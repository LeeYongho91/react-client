import React from 'react';
import './Slick.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
// import Product from '../../../ShopPage/Sections/Product';

function Slick({ Products }) {
  const navigate = useNavigate();

  // settings 부분, 슬라이더의 기능을 조정할 수 있다.
  const settings = {
    dots: true, // 점은 안 보이게
    infinite: true, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 3, // 3장씩 보이게 해주세요
    slidesToScroll: 3, // 3장씩 넘어가세요
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // 3장씩 보이게 해주세요
          slidesToScroll: 1, // 3장씩 넘어가세요
        },
      },
    ],
  };

  const pageMove = productId => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="slick">
      <div className="inner">
        <h4> FEATURED ITEMS</h4>
        {Products.length > 0 && (
          <Slider {...settings} className="cards">
            <div
              className="card"
              key={0}
              onClick={() => pageMove(Products[0]._id)}
            >
              <div className="card-image">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${Products[0].images[0]}`}
                  alt={Products[0].title}
                />
              </div>
              <h2>{Products[0].title}</h2>
              <div className="card-price">
                <div className="card-price-child">
                  <div>ADD TO CART</div>
                  <div>￦ {Products[0].price.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div
              className="card"
              key={1}
              onClick={() => pageMove(Products[1]._id)}
            >
              <div className="card-image">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${Products[1].images[0]}`}
                  alt={Products[1].title}
                />
              </div>
              <h2>{Products[1].title}</h2>
              <div className="card-price">
                <div className="card-price-child">
                  <div>ADD TO CART</div>
                  <div>￦ {Products[1].price.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div
              className="card"
              key={1}
              onClick={() => pageMove(Products[2]._id)}
            >
              <div className="card-image">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${Products[2].images[0]}`}
                  alt={Products[2].title}
                />
              </div>
              <h2>{Products[2].title}</h2>
              <div className="card-price">
                <div className="card-price-child">
                  <div>ADD TO CART</div>
                  <div>￦ {Products[2].price.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div
              className="card"
              key={1}
              onClick={() => pageMove(Products[3]._id)}
            >
              <div className="card-image">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${Products[3].images[0]}`}
                  alt={Products[3].title}
                />
              </div>
              <h2>{Products[3].title}</h2>
              <div className="card-price">
                <div className="card-price-child">
                  <div>ADD TO CART</div>
                  <div>￦ {Products[3].price.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </Slider>
        )}
      </div>
    </section>
  );
}

export default Slick;
