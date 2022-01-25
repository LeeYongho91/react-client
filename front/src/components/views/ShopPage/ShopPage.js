import React, { useState, useEffect } from 'react';
import './ShopPage.css';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import price from './Sections/Datas';
import Filter from './Sections/Filter';
import { SHOP_SERVER } from '../../Config';

function ShopPage() {
  const [Filters, setFilters] = useState({
    price: [],
  });
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Next, setNext] = useState(false);

  const getProducts = async body => {
    try {
      const { data } = await axios.post(`${SHOP_SERVER}/products`, body);
      if (data.success) {
        console.log(data);
        if (body.loadMore) {
          setProducts([...Products, ...data.productInfo]);
        } else {
          setProducts(data.productInfo);
        }
        setPostSize(data.postSize);
        setNext(data.next);
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
  }, [Limit, Skip]);

  const shwoFilterResults = filters => {
    const body = {
      skip: 0,
      limit: Limit,
      filters,
    };

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
            <div>{product.price}</div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="shop">
      <div className="inner">
        <div className="shop-filter">
          <TextField
            label="Search Product"
            className="search-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
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
