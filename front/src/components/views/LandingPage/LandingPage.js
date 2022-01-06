import NavBar from '../NavBar/NavBar';
import Intro from './Sections/Intro/Intro';
import Welcome from './Sections/Welcome/Welcome';
import Slick from './Sections/Slick/Slick';

function LandingPage() {
    return (
      <>
    
        <NavBar />
        <div className='test'>
        <Intro />
        <Welcome />
        <Slick />
        </div>
      
        
      </>
      

  
 
      );
}

export default LandingPage
