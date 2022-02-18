import React from 'react';
import './AboutPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AboutPage() {
  return (
    <div className="about-us">
      <div className="inner">
        <div className="about-image">
          <img src="/assets/about.png" alt="about" />
        </div>
        <div className="about-content">
          <div className="about-item">
            <div className="about-item-header">
              <FontAwesomeIcon icon="shopping-bag" className="about-icon" />{' '}
              <span>Shop online</span>
            </div>
            <div className="about-item-body">
              {' '}
              <p>
                There are many variations pasbut the majority have suffered.
              </p>
            </div>
          </div>
          <div className="about-item">
            <div className="about-item-header">
              <FontAwesomeIcon icon="money-check" className="about-icon" />{' '}
              <span>Payment methods</span>
            </div>
            <div className="about-item-body">
              <p>Letraset sheets containing Lorem Ipsum publishing software.</p>
            </div>
          </div>
          <div className="about-item">
            <div className="about-item-header">
              <FontAwesomeIcon icon="truck" className="about-icon" />{' '}
              <span>Free shipping</span>
            </div>
            <div className="about-item-body">
              <p>when an unknown printer took a make a type book.</p>
            </div>
          </div>
          <div className="about-item">
            <div className="about-item-header">
              <FontAwesomeIcon icon="check-circle" className="about-icon" />{' '}
              <span>Return policy</span>
            </div>
            <div className="about-item-body">
              <p>Various versions have evolved over the years purpose.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
