import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Contact = () => {
  const user = JSON.parse(localStorage.getItem('user')); // { name, email } or null

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    message: ''
  });
  const [status, setStatus] = useState(null);

useEffect(() => {
  if (user) {
    setFormData(f => ({
      ...f,
      name: user.name,
      email: user.email
    }));
  }
}, []); // <-- empty dependency array

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // For authenticated users, always send their name/email from user object
    const payload = user
      ? { name: user.name, email: user.email, message: formData.message }
      : formData;
    try {
      const res = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      setStatus(result.message || "Message sent!");
      setFormData(f => ({ ...f, message: '' }));
    } catch (err) {
      setStatus("Error sending message.");
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Contact Us</h2>
      {status && <Alert variant="info">{status}</Alert>}
      <Form onSubmit={handleSubmit}>
        {!user && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
          </>
        )}
        {user && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control value={user.name} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control value={user.email} disabled />
            </Form.Group>
          </>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control name="message" as="textarea" rows={3} placeholder="Write your message" value={formData.message} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">Send</Button>
      </Form>
    </Container>
  );
};

export default Contact;