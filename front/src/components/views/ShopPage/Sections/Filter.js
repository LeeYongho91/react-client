import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Filter() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <a href="true" onClick={handleClick}>
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
        <FormGroup sx={{ p: 3 }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
          />
          <FormControlLabel control={<Checkbox />} label="Label" />
          <FormControlLabel control={<Checkbox />} label="Label" />
        </FormGroup>
      </Popover>
    </div>
  );
}

export default Filter;
