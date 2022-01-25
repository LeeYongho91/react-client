import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormLabel from '@mui/material/FormLabel';

function Filter(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [Value, setValue] = useState(0);

  const handleClick = event => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const renderRadioboxLists = () =>
    props.list &&
    props.list.map(value => (
      <FormControlLabel
        key={value._id}
        control={<Radio />}
        value={value._id}
        label={`${value.name}`}
      />
    ));

  const handleChange = event => {
    setValue(event.target.value);
    props.handleFilters(event.target.value);
    setAnchorEl(null);
  };

  return (
    <div>
      <a href="true" className="filter-field" onClick={handleClick}>
        FILTER <FontAwesomeIcon icon="caret-down" />
      </a>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <FormControl sx={{ p: 4 }}>
          <FormLabel id="demo-radio-buttons-group-label">Price</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={Value}
            name="radio-buttons-group"
            onChange={handleChange}
          >
            {renderRadioboxLists()}
          </RadioGroup>
        </FormControl>
      </Popover>
    </div>
  );
}

export default Filter;
