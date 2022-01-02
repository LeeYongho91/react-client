import NavBar from "../NavBar/NavBar";
import './LandingPage.css';

function LandingPage() {
    return (
      <>
        <NavBar />
        <section className="intro">
            <div class="inner">
              <div class="intro-content">
                  <div class="left-item">
                    <div class="item" >
                    <img src="assets/product_1.png" alt="product_1" />
                    <div class="desc">
                      <h3><span>dd</span>DECORATIVE BASKETS</h3>
                      <span>from 4,000</span>
                    </div>
                    </div>
                  </div>
                  <div class="right-item">
                  <div class="item">
                    <img src="assets/product_3.png" alt="product_3" />
                    </div>
                    <div class="item">
                    <img src="assets/product_4.png" alt="product_4" />
                    </div>
                  </div>
              </div>
              </div>
        </section>
      </>
      

  
 
      );
}

export default LandingPage
