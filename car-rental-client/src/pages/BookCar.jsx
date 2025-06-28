import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

const BookCar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pickupDate: '',
    returnDate: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!car) {
    return (
      <Container className="py-5">
        <Alert variant="danger">No car selected. Please go back and choose a car.</Alert>
        <Button onClick={() => navigate('/cars')}>Back to Cars</Button>
      </Container>
    );
  }

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:8000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...form,
          carName: car.name,
          carId: car.id || null,
          carPrice: car.price,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Booking successful! Redirecting to payment...');
        setTimeout(() => {
          navigate('/payment', { state: { bookingId: data.bookingId, amount: car.price } });
        }, 1500);
      } else {
        setMessage(data.message || 'Booking failed');
      }
    } catch {
      setMessage('Booking failed');
    }
    setLoading(false);
  };

  return (
    <Container className="py-5" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4 text-center">Book {car.name}</h2>
      <Card className="mb-4 shadow-sm">
        <Card.Body className="d-flex align-items-center">
          <img src={car.image} alt={car.name} style={{ width: 150, height: 100, objectFit: 'cover', borderRadius: 8, marginRight: 24 }} />
          <div>
            <h5>{car.name}</h5>
            <p className="mb-1">{car.description}</p>
            <strong>{car.price}</strong>
          </div>
        </Card.Body>
      </Card>
      {message && <Alert variant={message.includes('successful') ? 'success' : 'danger'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control name="name" value={form.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" value={form.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mobile Phone</Form.Label>
          <Form.Control name="phone" type="tel" value={form.phone} onChange={handleChange} required pattern="[0-9]{10,15}" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Home Address</Form.Label>
          <Form.Control name="address" type="text" value={form.address} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pickup Date</Form.Label>
          <Form.Control name="pickupDate" type="date" value={form.pickupDate} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Return Date</Form.Label>
          <Form.Control name="returnDate" type="date" value={form.returnDate} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100" disabled={loading}>
          {loading ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </Form>
    </Container>
  );
};

export default BookCar;