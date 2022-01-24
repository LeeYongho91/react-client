import React from 'react';
import './ShopPage.css';
import Filter from './Sections/Filter';

function ShopPage() {
  return (
    <div className="shop">
      <div className="inner">
        <div className="shop-filter">
          <Filter />
        </div>
        <div className="shop-content">
          <div className="product-content">
            <div className="product-image">
              <img src="assets/product_1.png" alt="product_1" />
            </div>
            <div className="product-desc">
              <h2>ddddd</h2>
              <div className="product-price">
                <div className="product-price-child">
                  <div>ADD TO CART</div>
                  <div>1,000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-content">
            <div className="product-image">
              <img src="assets/product_2.png" alt="product_1" />
            </div>
            <div className="product-desc">
              <h2>ddddd</h2>
              <div className="product-price">
                <div className="product-price-child">
                  <div>ADD TO CART</div>
                  <div>1,000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-content">
            <div className="product-image">
              <img src="assets/product_3.png" alt="product_1" />
            </div>
            <div className="product-desc">
              <h2>ddddd</h2>
              <div className="product-price">
                <div className="product-price-child">
                  <div>ADD TO CART</div>
                  <div>1,000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-content">
            <div className="product-image">
              <img src="assets/product_4.png" alt="product_1" />
            </div>
            <div className="product-desc">
              <h2>ddddd</h2>
              <div className="product-price">
                <div className="product-price-child">
                  <div>ADD TO CART</div>
                  <div>1,000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-content">
            <div className="product-image">
              <img src="assets/product_1.png" alt="product_1" />
            </div>
            <div className="product-desc">
              <h2>ddddd</h2>
              <div className="product-price">
                <div className="product-price-child">
                  <div>ADD TO CART</div>
                  <div>1,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
