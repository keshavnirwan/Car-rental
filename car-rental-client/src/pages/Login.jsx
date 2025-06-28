import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) navigate('/');
  }, [navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        // Save user info (customize as per your backend response)
        localStorage.setItem('user', JSON.stringify({ email: form.email }));
        setMessage('Login successful!');
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch {
      setMessage('Login failed');
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Login</h2>
      {message && <Alert variant={message === 'Login successful!' ? 'success' : 'danger'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mb-2">
          Login
        </Button>
        <Button variant="outline-secondary" className="w-100" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default Login;