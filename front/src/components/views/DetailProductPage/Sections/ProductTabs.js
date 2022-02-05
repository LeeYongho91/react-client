import React, { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Pagination from '../../../utils/Pagination/Pagination';
import ReviewDialog from './ReviewDialog';

function ProductTabs(props) {
  const [value, setValue] = useState('1');
  const [reviews, setReviews] = useState([]);
  const reviewCount = props.ReviewCount || '';

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (props.Product.review !== undefined) setReviews(props.Product.review);
  }, [props.Product]);

  const renderReviews = reviews.map((review, idx) => (
    <div className="review-content" key={idx}>
      <div className="review-header">
        <span>{review.writer.name}</span>
        <span>{review.createdAt}</span>
      </div>
      <div className="review-desc">
        <p>{review.description}</p>
      </div>
    </div>
  ));

  return (
    <>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="DESCRIPTION" value="1" />
          <Tab label={`REVIEWS (${reviewCount})`} value="2" />
        </TabList>

        <TabPanel value="1">
          <h4>DESCRIPTION</h4>
          <p className="tab-desc">{props.Product.description}</p>
        </TabPanel>
        <TabPanel value="2">
          <h4 className="tab-review-title">
            1 REVIEW FOR {props.Product.title}
          </h4>
          <div className="review-layout">{renderReviews}</div>
          <div className="review-pagination">
            <Pagination />
          </div>
          <div className="review-add">
            <ReviewDialog productId={props.Product._id} />
          </div>
        </TabPanel>
      </TabContext>
    </>
  );
}

export default ProductTabs;
