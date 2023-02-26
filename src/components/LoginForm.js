import { useEffect, useRef, useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

import styles from './LoginForm.module.css';

const LOGIN_URL = '/auth'

export default function LoginForm() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const to = location.state?.from?.pathname || "/dashboard";

  const cpfRef = useRef();
  const errRef = useRef();

  const [cpf, setCpf] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    cpfRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [cpf, pwd]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ cpf: cpf, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCrendentials: true
        }
      );
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      const roles = response?.data?.roles;

      setAuth({ cpf, pwd, roles, accessToken, refreshToken });
      setCpf('');
      setPwd('');
      navigate(to, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor!");
      } else if (err.response?.status === 400) {
        setErrMsg("Faltando CPF ou senha...");
      } else if (err.response?.status === 401) {
        setErrMsg("Não autorizado!");
      } else {
        setErrMsg("Falha ao entrar: " + err);
      }
      errRef.current.focus();
    }
  }

  return (
    <Container id='login-form' className={styles.login_form + ' p-3'}>
      <h1><strong>Entrar</strong></h1>
      <p ref={errRef} className={errMsg ? styles.err_msg : styles.offscreen} aria-live="assertive">{errMsg}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor='cpf'>CPF</Form.Label>
          <Form.Control
            type='text'
            id='cpf'
            placeholder='Insira seu CPF...'
            ref={cpfRef}
            onChange={(e) => setCpf(e.target.value)}
            value={cpf}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='password'>Senha</Form.Label>
          <Form.Control
            type='password'
            id='password'
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            placeholder='Insira sua senha...'
            required
          />
        </Form.Group>
        <Row className='text-center'>
          <Col>
            <Button type='submit'>
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