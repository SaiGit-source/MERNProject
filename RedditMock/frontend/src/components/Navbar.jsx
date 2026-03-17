import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">OpenForum</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create" className="nav-button">Create Post</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
