import React from 'react';
import './Slick.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

function Slick() {
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

  return (
    <section className="slick">
      <div className="inner">
        <div className="slick-content">
          <h4> FEATURED ITEMS</h4>
          <Slider {...settings} className="cards">
            <div className="card">
              <div className="card-image">
                <img src="assets/product_1.png" alt="product_1" />
              </div>
              <h2>fdsfsfds</h2>
              <div className="card-price">
                <div className="card-price-child">
                  <div>ADD TO CART</div>
                  <div>1,000</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="assets/product_2.png" alt="product_2" />
              </div>
              <h2>fdsfsfds</h2>
              <div className="card-price">
                <div className="card-price-child">
                  <div>ADD TO CART</div>
                  <div>1,000</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="assets/product_3.png" alt="product_3" />
              </div>
              <h2>fdsfsfds</h2>
              <div className="card-price">
                <div className="card-price-child">
                  <div>ADD TO CART</div>
                  <div>1,000</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="assets/product_4.png" alt="product_4" />
              </div>
              <h2>fdsfsfds</h2>
              <div className="card-price">
                <div className="card-price-child">
                  <div>ADD TO CART</div>
                  <div>1,000</div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Slick;
