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
  let to = location.state?.from?.pathname;

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
      const username = response?.data?.username;

      if (!to) {
        if (roles.includes(5150)) {
          to = '/adminDashboard';
        } else if (roles.includes(1984)) {
          to = '/functionaryDashboard';
        } else {
          to = '/userDashboard';
        }
      }

      setAuth({ cpf, username, pwd, roles, accessToken, refreshToken });
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
    <Container id='login-form' className={styles.login}>
      <h1 className={styles.login__title}>Entrar</h1>
      <p ref={errRef} className={errMsg ? styles.err_msg : styles.offscreen} aria-live="assertive">{errMsg}</p>
      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label htmlFor='cpf'>CPF</Form.Label>
          <Form.Control
            className={styles.login__input}
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
            className={styles.login__input}
            type='password'
            id='password'
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            placeholder='Insira sua senha...'
            required
          />
        </Form.Group>

        <div className='text-center'>
          <Button type='submit' className={'btn btn-dark ' + styles.login__submit_button}>
            Entrar
          </Button>
        </div>

      </Form>
    </Container>
  );
}