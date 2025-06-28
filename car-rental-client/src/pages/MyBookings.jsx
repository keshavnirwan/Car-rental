import React, { useEffect, useState } from 'react';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user?.email) {
      setError('You must be logged in to view your bookings.');
      setLoading(false);
      return;
    }
    fetch(`http://localhost:8000/api/mybookings?email=${encodeURIComponent(user.email)}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch bookings.');
        setLoading(false);
      });
  }, [user]);

  if (loading) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">My Bookings</h2>
      {bookings.length === 0 ? (
        <Alert variant="info">No bookings found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Car</th>
              <th>Pickup Date</th>
              <th>Return Date</th>
              <th>Price</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.car_name}</td>
                <td>{b.pickup_date}</td>
                <td>{b.return_date}</td>
                <td>{b.car_price}</td>
                <td>{b.phone}</td>
                <td>{b.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyBookings;