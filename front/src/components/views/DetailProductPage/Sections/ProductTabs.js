import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function ProductTabs(props) {
  const [value, setValue] = useState('1');
  const { Product } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="DESCRIPTION" value="1" />
          <Tab label="REVIEWS" value="2" />
        </TabList>

        <TabPanel value="1">
          <h2>Description</h2>
          <p className="tab-desc">{Product.description}</p>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </>
  );
}

export default ProductTabs;
