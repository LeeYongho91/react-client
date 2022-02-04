import React, { useState } from 'react';
import './Pagination.css';
import Pagination from 'react-js-pagination';

const Paging = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = pageValue => {
    setPage(pageValue);
  };
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={5}
      totalItemsCount={20}
      pageRangeDisplayed={5}
      prevPageText="‹"
      nextPageText="›"
      onChange={handlePageChange}
    />
  );
};
export default Paging;
