import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CartItem(props) {
  const navigate = useNavigate();
  const renderCartImage = images => {
    if (images.length > 0) {
      const image = images[0];
      return `${process.env.REACT_APP_API_URL}/${image}`;
    }
  };
  const pageMove = productId => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {}, [props.test]);

  const renderItems = () =>
    props.products &&
    props.products.map((product, index) => (
      <tr key={index}>
        <td>
          <div className="cart-product">
            <div className="cart-image" onClick={() => pageMove(product._id)}>
              <img src={renderCartImage(product.images)} alt={product.title} />
            </div>
            <div className="cart-desc">
              <span>{product.title}</span>
              <div
                className="cart-remove"
                onClick={() => props.removeItem(product._id)}
              >
                Remove item
              </div>
            </div>
          </div>
        </td>
        <td>{product.price.toLocaleString()}</td>
        <td>{product.quantity}</td>
        <td>{(product.price * product.quantity).toLocaleString()}</td>
      </tr>
    ));

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </>
  );
}

export default CartItem;
