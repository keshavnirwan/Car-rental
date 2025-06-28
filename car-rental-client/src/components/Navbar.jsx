import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import carImg from '../assets/car.jpeg';

function NavigationBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const syncAuth = () => setIsAuthenticated(!!localStorage.getItem('user'));
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  // Helper to highlight active link
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        className="custom-navbar"
        style={{
          background: 'linear-gradient(90deg, #0a024e 0%, #1a3d7c 100%)',
          boxShadow: '0 2px 16px 0 rgba(10,2,78,0.10)',
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold" style={{ color: '#e3ffe6', fontSize: '1.7rem', letterSpacing: '1px' }}>
            <img
              src={carImg}
              alt="Car Logo"
              width="120"
              height="48"
              className="me-2"
              style={{ objectFit: 'cover', borderRadius: '8px', marginLeft: '-10px', boxShadow: '0 2px 8px rgba(26,61,124,0.15)' }}
            />
            CarRental
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto align-items-center">
              <Nav.Link
                as={Link}
                to="/"
                className={`nav-link-custom ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className={`nav-link-custom ${isActive('/about') ? 'active' : ''}`}
              >
                About
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/cars"
                className={`nav-link-custom ${isActive('/cars') ? 'active' : ''}`}
              >
                Cars
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                className={`nav-link-custom ${isActive('/contact') ? 'active' : ''}`}
              >
                Contact
              </Nav.Link>
              {isAuthenticated && (
                <Nav.Link
                  as={Link}
                  to="/mybookings"
                  className={`nav-link-custom ${isActive('/mybookings') ? 'active' : ''}`}
                >
                  My Bookings
                </Nav.Link>
              )}
              <NavDropdown
                title={
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                    roundedCircle
                    width="32"
                    height="32"
                    alt="Profile"
                    style={{ border: '2px solidrgb(9, 35, 148)', background: '#fff' }}
                  />
                }
                id="profile-dropdown"
                align="end"
                className="profile-dropdown-custom"
              >
                {isAuthenticated ? (
                  <>
                    <NavDropdown.Item disabled>👤 User</NavDropdown.Item>
                    <NavDropdown.Item disabled>
                      📧 {JSON.parse(localStorage.getItem('user'))?.email || 'user@example.com'}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/signup">Sign Up</NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <style>
        {`
        .custom-navbar {
          font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
          min-height: 70px;
        }
        .custom-navbar .navbar-brand {
          color: #e3ffe6 !important;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .nav-link-custom {
          color:rgb(246, 250, 250) !important;
          font-size: 1.08rem;
          margin: 0 0.5rem;
          padding: 0.5rem 1rem !important;
          border-radius: 0.5rem;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .nav-link-custom:hover, .nav-link-custom.active {
          background:rgb(4, 2, 19) !important;
          color:rgb(245, 246, 248) !important;
          box-shadow: 0 2px 8px rgba(26,61,124,0.10);
          font-weight: 600;
        }
        .profile-dropdown-custom .dropdown-toggle {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .profile-dropdown-custom .dropdown-menu {
          background: #f9f9f9;
          border-radius: 1rem;
          min-width: 180px;
          box-shadow: 0 4px 24px rgba(26,61,124,0.10);
        }
        .profile-dropdown-custom .dropdown-item {
          color: #1a3d7c !important;
          font-weight: 500;
          border-radius: 0.5rem;
          transition: background 0.2s, color 0.2s;
        }
        .profile-dropdown-custom .dropdown-item:hover {
          background:rgb(27, 68, 87) !important;
          color: #0a024e !important;
        }
        `}
      </style>
    </>
  );
}

export default NavigationBar;