import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ProductImage from './Sections/ProductImage';
import ProductTabs from './Sections/ProductTabs';
import ProductInfo from './Sections/ProductInfo';
// import ProductInfo from './Sections/ProductInfo';
import { SHOP_SERVER } from '../../Config';
import './DetailProductPage.css';
import { loadingToggleAction } from '../../../_actions/util_actions';
import useDialog from '../../utils/Dialogs/DialogHooks';
import { addToCart } from '../../../_actions/user_actions';

function DetailProductPage() {
  const { productId } = useParams();
  const [Product, setProduct] = useState({});
  const [ReviewCount, setReviewCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const { cartDialog, cartDupDialog, alertDialog } = useDialog();

  const getProductData = async (ProductId = productId, Skip = skip) => {
    try {
      dispatch(loadingToggleAction(true));
      const { data } = await axios.get(
        `${SHOP_SERVER}/product/product_by_id?id=${ProductId}&type=single&skip=${Skip}`,
      );
      setProduct(data.product[0]);
      setReviewCount(data.reviewCount);
      setRelatedProducts(data.relatedProducts);
      dispatch(loadingToggleAction(false));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handlePageChange = pageValue => {
    setSkip((pageValue - 1) * 5);
    getProductData((pageValue - 1) * 5);
  };
  const productDetailMove = id => {
    navigate(`/product/${id}`);
    getProductData(id);
  };

  const addCartHandler = async id => {
    try {
      if (!user.userData.isAuth) {
        await alertDialog({
          title: '',
          body: '로그인 해주세요.',
          type: 'login',
        });
        return;
      }
      const body = {
        productId: id,
        qty: 1,
      };

      const cart = user.cartDetail;
      let duplicate = false;

      if (cart) {
        for (const product of cart) {
          if (id === product._id) duplicate = true;
        }

        if (duplicate) {
          await cartDupDialog(body);
          return;
        }
      }

      await dispatch(addToCart(body));
      cartDialog();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const renderRelatedProducts = relatedProducts.map((product, idx) => (
    <div className="related-item" key={idx}>
      <div
        className="related-item-image"
        onClick={() => productDetailMove(`${product._id}`)}
      >
        <img
          src={`${process.env.REACT_APP_API_URL}/${product.images[0]}`}
          alt={product.title}
        />
      </div>
      <h2>{product.title}</h2>
      <div className="related-item-price">
        <div className="related-item-price-child">
          <div onClick={() => addCartHandler(`${product._id}`)}>
            ADD TO CART
          </div>
          <div>￦ {product.price.toLocaleString()}</div>
        </div>
      </div>
    </div>
  ));

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="product-detail">
      <div className="inner">
        <div className="product-detail-layout">
          <div className="product-detail-content">
            <ProductImage detail={Product} />
            <ProductInfo Product={Product} ReviewCount={ReviewCount} />
          </div>
          <div className="product-detail-tabs">
            <ProductTabs
              Product={Product}
              ReviewCount={ReviewCount}
              handlePageChange={handlePageChange}
            />
          </div>
          <div className="related-products-content">
            <h3>RELATED PRODUCTS</h3>
            <div className="related-products">{renderRelatedProducts}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProductPage;
