import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

import styles from './LoginForm.module.css';

export default function LoginForm() {
  return (
    <Container id='login-form' className={styles.login_forms}>
                  <h1 className='text-center'>Login</h1>
                  <Form>
                    <Form.Group>
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control type='email' placeholder='Insira seu e-mail...' />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Senha</Form.Label>
                      <Form.Control type='password' placeholder='Insira sua senha...' />
                    </Form.Group>
                    <Row className='text-center p-3 '>
                      <Col className='m-1'>
                        <Button type='submit' className={styles.button}>
                          Entrar
                        </Button>
                      </Col>
                      <Col className='m-1'>
                        <Button className={styles.button}>
                          <a href='/signUp' className='text-decoration-none link link-light'>Cadastre-se</a>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Container>
  );
}