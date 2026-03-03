// components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    navigate('/login');
  };

  // Don't show navbar on login/signup pages
  const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/signup';
  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">FoodOrdering</Link>
      </div>
      <ul className="navbar-menu">
        {/* These links only show when logged in */}
        {token ? (
          <>
            <li>
              <Link to="/">Restaurants</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/cart">
                Cart
                {cart.length > 0 && (
                  <span className="cart-badge">{cart.length}</span>
                )}
              </Link>
            </li>
            {user.role === 'admin' && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <li>
              <Link to="/orders">My Orders</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout ({user.name || 'User'})
              </button>
            </li>
          </>
        ) : (
          // No links shown when not logged in (navbar will be hidden on auth pages anyway)
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;