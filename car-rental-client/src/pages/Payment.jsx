import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, amount } = location.state || {};

  if (!bookingId) {
    return (
      <Container className="py-5">
        <Card className="p-4 text-center">
          <h4>No booking found. Please book a car first.</h4>
          <Button onClick={() => navigate('/cars')}>Back to Cars</Button>
        </Card>
      </Container>
    );
  }

  // Replace this with your real payment gateway integration
  const handlePay = () => {
    alert('Payment successful! Thank you for your booking.');
    navigate('/');
  };

  return (
    <Container className="py-5" style={{ maxWidth: '500px' }}>
      <Card className="p-4 shadow">
        <h3 className="mb-3 text-center">Payment</h3>
        <p className="mb-2">Booking ID: <strong>{bookingId}</strong></p>
        <p className="mb-4">Amount to Pay: <strong>{amount}</strong></p>
        <Button variant="success" size="lg" className="w-100" onClick={handlePay}>
          Pay Now
        </Button>
      </Card>
    </Container>
  );
};

export default Payment;