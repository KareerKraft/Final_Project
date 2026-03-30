import { Link, useLocation } from 'react-router-dom';
import { placementGuideMap } from '../data/placementGuideItems';
import '../styles/Header.css';

function Header() {
  const location = useLocation();
  const showLoginButton = location.pathname !== '/explore';
  const isPlacementGuidePage = location.pathname.startsWith('/placement-guide');
  const placementGuideSlug = location.pathname.split('/')[2];
  const placementGuideTheme = placementGuideMap[placementGuideSlug]?.theme;
  const placementGuideHeaderClass = placementGuideTheme
    ? `header-placement-guide-${placementGuideTheme}`
    : 'header-placement-guide';

  return (
    <header className={`header ${isPlacementGuidePage ? placementGuideHeaderClass : ''}`}>
      <div className="header-container">
        <div className="logo">
          <img src="/logo.png" alt="KK Logo" className="kk-logo-img" />
        </div>
        <nav className="nav-menu">
          <Link to="/explore" className="nav-link">HOME</Link>
          <Link to="/explore#explore-features" className="nav-link">EXPLORE FEATURES</Link>
          <Link to="/AboutUs" className="nav-link">ABOUT US</Link>
          <Link to="/Help" className="nav-link">HELP</Link>
        </nav>
        {showLoginButton ? (
          <div className="login-container" style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <button className="login-btn" onClick={() => window.location.href='/login'}>login</button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
