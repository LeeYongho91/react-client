import { Carousel } from 'antd';
import './LandingPage.css';
import { Divider, Icon } from 'antd';

function LandingPage() {
    return (
        <>
        <Carousel autoplay>
          <div>
            <img src="images/main_1.png" className='carousel_img'/>
          </div>
          <div>
            <img src="images/main_2.png" className='carousel_img'/>
          </div>
          <div>
            <img src="images/main_3.png" className='carousel_img' />
          </div>
        </Carousel>
        <div className='main'>
            <div className='section_1_divide_text'>
                <span>Latest Products</span>
                <span>VIEW ALL PRODUCTS </span>
            </div>
            <Divider className='divide'/>
   
        </div>
         </>
      );
}

export default LandingPage
