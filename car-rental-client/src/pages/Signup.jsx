import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) navigate('/');
  }, [navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Signup successful! Please log in.');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (err) {
      setMessage('Signup failed');
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Sign Up</h2>
      {message && <Alert variant={message.includes('successful') ? 'success' : 'danger'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Enter your name" value={form.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        </Form.Group>
        <Button variant="success" type="submit" className="w-100 mb-2">Create Account</Button>
        <Button variant="outline-primary" className="w-100" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;