import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './LoginForm.module.css';

export default function LoginForm() {
  return (
    <Container id='login-form' className={styles.login_form + ' p-3'}>
      <h1><strong>Entrar</strong></h1>
      <Form>
        <Form.Group>
          <Form.Label>CPF</Form.Label>
          <Form.Control type='text' placeholder='Insira seu CPF...' />
        </Form.Group>
        <Form.Group>
          <Form.Label>Senha</Form.Label>
          <Form.Control type='password' placeholder='Insira sua senha...' />
        </Form.Group>
        <Row className='text-center'>
          <Col>
            <Button>
              Entrar
            </Button>
          </Col>
          <Col sm>
            <Link to='/signUp'>
              <Button>Cadastre-se</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}