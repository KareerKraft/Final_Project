import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src="/logo.png" alt="KK Logo" className="kk-logo-img" />
        </div>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/AboutUs" className="nav-link">ABOUT US</Link>
          <Link to="/Help" className="nav-link">HELP</Link>
        </nav>
        <div className="login-container" style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <button className="login-btn" onClick={() => window.location.href='/login'}>login</button>
        </div>
      </div>
    </header>
  );
}

export default Header;