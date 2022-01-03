import NavBar from "../NavBar/NavBar";
import './LandingPage.css';

function LandingPage() {
    return (
      <>
        <NavBar />
        <section className="intro">
            <div className="inner">
              <div className="intro-content">
                  <div className="left-item">
                    <div className="item" >
                    <img src="assets/product_1.png" alt="product_1" />
                    <div className="desc">
                      <h3>DECORATIVE BASKETS</h3>
                      <span>from 4,000</span>
                    </div>
                    </div>
                  </div>
                  <div className="right-item">
                    <div className="item">
                    <img src="assets/product_4.png" alt="product_4" />
                    <div className="desc">
                      <h3>JAR</h3>
                      <span>Home Deco</span>
                    </div>
                    </div>
                    <div className="item">
                    <img src="assets/product_3.png" alt="product_3" />
                    <div className="desc">
                    <h3>WALL CLOCK</h3>
                      <span>NEW!</span>
                    </div>
                    </div>
                  </div>
              </div>
              </div>
        </section>
      </>
      

  
 
      );
}

export default LandingPage
