import React, { useState, useEffect } from 'react';
import './ShopPage.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import price from './Sections/Datas';
import Filter from './Sections/Filter';
import SearchFeature from './Sections/SearchFeature';
import { SHOP_SERVER } from '../../Config';
import { laadingToggleAction } from '../../../_actions/util_actions';

function ShopPage() {
  const [Filters, setFilters] = useState({
    price: [],
  });
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Next, setNext] = useState(false);
  const [searchLoading, setSearchLoading] = useState(true);
  const dispatch = useDispatch();

  const getProducts = async body => {
    try {
      setSearchLoading(false);
      console.log(searchLoading);
      if (searchLoading) dispatch(laadingToggleAction(true));
      const { data } = await axios.post(`${SHOP_SERVER}/products`, body);
      if (data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...data.productInfo]);
        } else {
          setProducts(data.productInfo);
        }
        setPostSize(data.postSize);
        setNext(data.next);
        dispatch(laadingToggleAction(false));
      } else {
        alert('상품들을 가져오는데 실패 하였습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreHandler = () => {
    const skip = Skip + Limit;

    const body = {
      skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  useEffect(() => {
    const body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const shwoFilterResults = filters => {
    const body = {
      skip: 0,
      limit: Limit,
      filters,
    };
    // setSearchLoading(true);
    getProducts(body);
    setSkip(0);
  };

  const handlerPrice = value => {
    const data = price;
    let array = [];

    for (const key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    if (category === 'price') {
      const priceValues = handlerPrice(filters);
      newFilters[category] = priceValues;
    }

    shwoFilterResults(newFilters);
    setFilters(newFilters);
  };

  const renderProducts = Products.map((product, index) => (
    <div className="product-content" key={index}>
      <div className="product-image">
        <img
          src={`http://localhost:5000/${product.images[0]}`}
          alt="product_1"
        />
      </div>
      <div className="product-desc">
        <h2>{product.title}</h2>
        <div className="product-price">
          <div className="product-price-child">
            <div>ADD TO CART</div>
            <div>￦ {product.price.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  ));

  const test = () => {
    setSearchLoading(false);
  };

  const updateSearchTerm = newSearchTerm => {
    const body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    test();
    console.log(searchLoading);

    getProducts(body);
  };

  return (
    <div className="shop">
      <div className="inner">
        <div className="shop-filter">
          <SearchFeature refreshFunction={updateSearchTerm} />
          <Filter
            list={price}
            handleFilters={filters => handleFilters(filters, 'price')}
          />
        </div>
        <div className="shop-content">{renderProducts}</div>

        {PostSize >= Limit && Next && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={loadMoreHandler}>더보기</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;
