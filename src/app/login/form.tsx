'use client';

import styles from './form.module.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


export default function LoginForm() {
  const [email, handleEmailChange] = useState('');
  const [password, handlePasswordChange] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    console.log('here', email, password)

  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" as={Col} controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          bsPrefix={`form-control ${styles['input-width']}`}
          value={email}
          onChange={event => handleEmailChange(event.target.value)}
          autoComplete="off"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" as={Col} controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          bsPrefix={`form-control ${styles['input-width']}`}
          value={password}
          onChange={event => handlePasswordChange(event.target.value)}
          autoComplete="off"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password.
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}
