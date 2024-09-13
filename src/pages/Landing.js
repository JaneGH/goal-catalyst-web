import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import {Logo} from '../components/';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
    <nav>
      <Logo />
    </nav>
    <div className='container page'>
      {/* info */}
      <div className='info'>
        <h1>
          Goal <span>creating</span> app
        </h1>
        <p>
            Unlock your potential with our goal-setting app!
            Whether you're aiming to achieve personal milestones or help others reach their aspirations,
            our app provides the perfect platform. Create, track, and manage goals effortlessly.
        </p>
        <Link to='/register' className='btn btn-hero'>
          Login/Register
        </Link>
      </div>
      <img src={main} alt='goal hunt' className='img main-img' />
    </div>
  </Wrapper>
  );
};


export default Landing;