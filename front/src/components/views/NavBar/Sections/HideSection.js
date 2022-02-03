import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HideSection(props) {
  const images = useSelector(state => state.util.images) || [];
  const hdnActive = props.hdnActive;

  const hiddenSectionClick = () => {
    props.hiddenSectionClick();
  };

  const renderImages = () =>
    images.map((path, idx) => (
      <div className="item" key={idx}>
        <img src={`${process.env.REACT_APP_API_URL}/${path}`} alt={path} />
      </div>
    ));

  return (
    <div className={`hidden-section ${hdnActive ? 'active' : ''}`}>
      <div className="close">
        <span onClick={hiddenSectionClick}>
          <FontAwesomeIcon icon="times" />
        </span>
      </div>
      <h3>Welcome</h3>
      <p>Advertising is the way great brands get to be great brands.</p>
      <div className="items">{images.length > 0 && renderImages()}</div>
      <h3>WE ARE AWESOME FOLOW US</h3>
      <div className="sns">
        <span>
          <FontAwesomeIcon icon={['fab', 'facebook-f']} />
        </span>
        <span>
          <FontAwesomeIcon icon={['fab', 'twitter']} />
        </span>
        <span>
          <FontAwesomeIcon icon={['fab', 'instagram']} />
        </span>
      </div>
    </div>
  );
}

export default HideSection;
