import React from 'react';
import TextField from '@mui/material/TextField';

function ProductInfo(props) {
  const price = props.Product.price || 0;
  const reviewCount = props.ReviewCount || '';
  const { title } = props.Product;
  const priceSetting = `￦ ${parseInt(price, 10).toLocaleString()}`;
  return (
    <div className="product-detail-desc">
      <h2>{title}</h2>
      <span>{price > 0 && priceSetting}</span>
      <span>CUSTOMER REVIEW ( {reviewCount} )</span>
      <div className="product-detail-tag">
        SKU: 008 <br />
        <br />
        Categories: Decoration, Home Decor <br />
        <br />
        Tags: Black, Modern
      </div>
      <div className="product-detail-cart">
        <TextField
          id="outlined-number"
          label="Quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={1}
        />
        <button className="cart-btn">Add To Cart</button>
      </div>
    </div>
  );
}

export default ProductInfo;
