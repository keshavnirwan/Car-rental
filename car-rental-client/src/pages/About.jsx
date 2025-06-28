import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap'; 
import { FaCarSide, FaSmile, FaTools, FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa'; 

const testimonials = [
  {
    name: "Amit Sharma",
    text: "The booking process was seamless and the car was in excellent condition. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Priya Verma",
    text: "Affordable prices and great customer service. Will rent again!",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Rahul Singh",
    text: "Wide range of cars and very flexible rental terms. Loved the experience!",
    image: "https://randomuser.me/api/portraits/men/65.jpg"
  }
];

const About = () => (
  <div style={{ background: 'linear-gradient(0deg,rgb(0, 1, 14) 0%, #f9f9f9 100%)', minHeight: '100vh' }}>
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="align-items-center mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <h1 className="display-4 fw-bold mb-3" style={{ color:'revert' }}>About CarRental</h1>
          <p className="lead" style={{ color:'black' }}>
            Experience the freedom of the road with our premium and economy car rentals. 
            We pride ourselves on quality, reliability, and customer satisfaction.
          </p>
        </Col>
        <Col md={6}>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJx47itgnCXg59v_XHDctfLXQj7b32nYOxqQ&s" 
            alt="about" 
            className="img-fluid rounded shadow-lg"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          />
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="text-center mb-5">
        <Col md={4} className="mb-4">
          <FaCarSide size={48} color="#1a3d7c" className="mb-3" />
          <h5>Wide Selection</h5>
          <p>Choose from luxury sedans, SUVs, hatchbacks, and more to suit every journey.</p>
        </Col>
        <Col md={4} className="mb-4">
          <FaTools size={48} color="#1a3d7c" className="mb-3" />
          <h5>Well Maintained</h5>
          <p>Our fleet is regularly serviced and sanitized for your safety and comfort.</p>
        </Col>
        <Col md={4} className="mb-4">
          <FaSmile size={48} color="#1a3d7c" className="mb-3" />
          <h5>Customer First</h5>
          <p>24/7 support and flexible rental plans to ensure a hassle-free experience.</p>
        </Col>
      </Row>

      {/* Testimonial Carousel */}
      <Row className="justify-content-center">
        <Col md={8}>
          <h3 className="text-center mb-4" style={{ color: 'revert' }}>What Our Customers Say</h3>
          <Carousel indicators={false} interval={5000} fade>
            {testimonials.map((t, idx) => (
              <Carousel.Item key={idx}>
                <Card className="border-0 shadow-sm p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="rounded-circle me-3" 
                      style={{ width: 60, height: 60, objectFit: 'cover', border: '2px solid #1a3d7c' }}
                    />
                    <div>
                      <h6 className="mb-0">{t.name}</h6>
                      <small className="text-muted">Customer</small>
                    </div>
                  </div>
                  <Card.Text className="fst-italic" style={{ color: '#555' }}>
                    "{t.text}"
                  </Card.Text>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
    {/* Floating animation keyframes */}  

     {/* Contact Info Section */}
<Row className="justify-content-center mt-5">
  <Col md={8}>
    <Card
      className="p-4 border-0 shadow-sm"
      style={{
        background: 'linear-gradient(270deg,rgb(10, 2, 78) 0%, #f9f9f9 100%)',
        borderRadius: '1.5rem',
      }}
    >
      <h4 className="mb-3 fw-bold" style={{ color: '#1a3d7c', letterSpacing: '1px' }}>
        Contact CarRental
      </h4>
      <div className="mb-2" style={{ fontSize: '1.1rem', color: '#222' }}>
        <strong>Email:</strong>{' '}
        <a href="mailto:support@carrental.com" style={{ color: '#1a3d7c', textDecoration: 'underline' }}>
          support@carrental.com
        </a>
      </div>
      <div className="mb-2" style={{ fontSize: '1.1rem', color: '#222' }}>
        <strong>Phone:</strong>{' '}
        <a href="tel:+911234567890" style={{ color: '#1a3d7c', textDecoration: 'underline' }}>
          +91 12345 67890
        </a>
      </div>
      <div className="mb-2" style={{ fontSize: '1.1rem', color: '#222' }}>
        <strong>Address:</strong> 123 Main Street, New Delhi, India
      </div>
      <div className="mb-3" style={{ fontSize: '1.1rem', color: '#222' }}>
        <strong>Hours:</strong> Mon-Sun, 8:00 AM – 10:00 PM
      </div>
      <div className="d-flex align-items-center gap-4 mt-2">
        <a
          href="https://wa.me/911234567890"
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          style={{ color: '#25D366', fontSize: '2rem', transition: 'transform 0.2s' }}
        >
          <FaWhatsapp />
        </a>
        <a
          href="https://facebook.com/carrental"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
          style={{ color: '#1877F3', fontSize: '2rem', transition: 'transform 0.2s' }}
        >
          <FaFacebook />
        </a>
        <a
          href="https://instagram.com/carrental"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          style={{ color: '#E4405F', fontSize: '2rem', transition: 'transform 0.2s' }}
        >
          <FaInstagram />
        </a>
      </div>
    </Card>
  </Col>
</Row>
 
    // ...existing code...
<style>
  {`
    @keyframes float {
      0% { transform: translateY(0px);}
      50% { transform: translateY(-12px);}
      100% { transform: translateY(0px);}
    }
    .contact-social a:hover {
      transform: scale(1.15);
      filter: brightness(1.2);
    }
  `}
</style> 
  </div>
);

export default About;