import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

const features = [
  { icon: "🚗", title: "Wide Range of Cars", desc: "Choose from economy, luxury, and SUVs for every journey." },
  { icon: "⏱️", title: "Instant Booking", desc: "Book your car in seconds with our seamless process." },
  { icon: "💸", title: "Affordable Prices", desc: "Best rates guaranteed with no hidden charges." },
  { icon: "🛡️", title: "24/7 Support", desc: "We’re here for you anytime, anywhere." },
];

const Home = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    AOS.init({ duration: 1000 });
    function syncUser() {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  return (
    <div className="home-bg text-light" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232526 0%, #414345 100%)' }}>
      <Container className="text-center py-5">
        <h1 data-aos="fade-down" className="mb-4 fw-bold display-4">Welcome to CarXpress</h1>
        <p data-aos="fade-up" className="lead mb-4 fs-4">
          Rent your favorite car anytime, anywhere.<br />
          <span style={{ color: '#ffc107' }}>Reliable</span>, <span style={{ color: '#17a2b8' }}>fast</span>, and <span style={{ color: '#28a745' }}>affordable</span> service with 24/7 support.
        </p>
        {!user && (
          <>
            <Row className="justify-content-center mb-4">
              <Col md="auto" data-aos="fade-up">
                <Button as={Link} to="/login" variant="primary" size="lg" className="px-4 shadow-sm">
                  Login
                </Button>
              </Col>
              <Col md="auto" data-aos="fade-up" data-aos-delay="200">
                <Button as={Link} to="/signup" variant="outline-light" size="lg" className="px-4 shadow-sm">
                  Sign Up
                </Button>
              </Col>
            </Row>
              <img
          src="data:image/jpeg;base64,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"
          alt="Car Rental"
          className="img-fluid mt-4 rounded shadow"
          data-aos="zoom-in"
          style={{ maxHeight: '400px', border: '4px solid #fff', background: '#222'  }}
        />
        <br />
            <Row className="justify-content-center mb-5">
              <Col md={8} data-aos="zoom-in">
                <Card className="bg-dark text-light border-0 shadow-lg">
                  <Card.Body>
                    <Card.Title className="fs-3 mb-3">Why Choose CarXpress?</Card.Title>
                    <Row>
                      {features.map((f, idx) => (
                        <Col xs={6} md={3} key={f.title} className="mb-3">
                          <div style={{ fontSize: '2.5rem' }}>{f.icon}</div>
                          <div className="fw-bold mt-2">{f.title}</div>
                          <div style={{ fontSize: '0.95rem', color: '#ccc' }}>{f.desc}</div>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
        
      </Container>
    </div>
  );
};

export default Home;