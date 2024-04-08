'use client';

import styles from './form.module.css';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function LoginForm() {
  const [username, handleUsernameChange] = useState('');
  const [password, handlePasswordChange] = useState('');
  const [validated, setValidated] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleSubmit = async(event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    setValidated(true);

    if (form.checkValidity() === false) return;

    try {
      const { data } = await axios.post(
        'http://localhost:3333/api/auth/login',
        { username: username, password }
      );
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/')
    } catch(err) {
      setIsError(true);
    }
  };

  return (
    <div>
      {isError && <Alert key='danger' variant="danger">
        Invalid username or password.
      </Alert>}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" as={Col} controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            bsPrefix={`form-control ${styles['input-width']}`}
            value={username}
            onChange={event => handleUsernameChange(event.target.value)}
            autoComplete="off"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid username.
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
    </div>
  );
}
