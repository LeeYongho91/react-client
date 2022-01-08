import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
    return (
        <footer>
            <div className="inner">
                <div className="footer-content">
                    <div className="left-content">
                        <span>What We Do</span>
                        <span>Order Tracking</span>
                        <span>Contact Us</span>
                        <span>© Qode Interactive</span>
                    </div>
                    <div className="right-content">
                        <span>Follow Us</span>
                        <span><FontAwesomeIcon icon={['fab', 'facebook-f']} /></span>
                        <span><FontAwesomeIcon icon={['fab', 'twitter']} /></span>
                        <span><FontAwesomeIcon icon={['fab', 'instagram']} /></span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
