import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import styles from '../../components/Registers.module.css';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const LOAN_URL = '/loan';

const RegisterLoan = () => {
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  const { handleSubmit } = useForm();

  const errRef = useRef();

  const [userCpf, setUserCpf] = useState('');
  const [bookIsbn, setBookIsbn] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [bookIsbn, userCpf]);

  const onSubmit = async () => {

    try {
      await axiosPrivate.post(LOAN_URL,
        JSON.stringify({
          "bookIsbn": bookIsbn,
          "userCpf": userCpf
        }));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor!");
      } else if (err?.response?.status === 409) {
        setErrMsg("Livro ocupado!");
      } else if (err?.response?.status === 404) {
        setErrMsg("Livro/usuário inválido!");
      } else {
        setErrMsg("Falha no registro! " + err);
      }
      errRef.current.focus();
    }
  }

  return (
    <>
      <NavbarComponent
        adminDashboard={auth?.roles.includes(5150)}
        functionaryDashboard={
          auth?.roles.includes(1984)
            ? !auth?.roles.includes(5150)
              ? true
              : false
            : false
        }
        dashboardBook={auth?.roles.includes(1984)}
        dashboardUser={auth?.roles.includes(1984)}
        dashboardLoan={auth?.roles.includes(1984)}
        dashboardReservation={auth?.roles.includes(1984)}
        dashboardFunctionary={auth?.roles.includes(5150)}
      />

      <Container fluid className={styles.register}>
        {success
          ? (
            <Container className={styles.success_msg}>
              <h2>Empréstimo cadastrado com sucesso!</h2>
              <p>Voltar para <Link to='/dashboardLoan'>Empréstimos</Link>...</p>
            </Container>
          ) : (
            <>
              <h2>Registrar empréstimo</h2>
              <p ref={errRef} className={errMsg ? styles.err_msg : styles.offscreen} aria-live="assertive">{errMsg}</p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>ISBN do livro</Form.Label>
                  <Form.Control type='text' name='isbn' placeholder='Insira o ISBN do livro...'
                    onChange={(e) => setBookIsbn(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>CPF do usuário</Form.Label>
                  <Form.Control type='text' name='cpf' placeholder='Insira CPF do usuário...'
                    onChange={(e) => setUserCpf(e.target.value)} required />
                </Form.Group>
                <Row>
                  <Col className='text-center'>
                    <Link to='/dashboardLoan'>
                      <Button>Cancelar</Button>
                    </Link>
                  </Col>
                  <Col className='text-center'>
                    <Button type='submit'>Registrar</Button>
                  </Col>
                </Row>
              </Form>
            </>
          )
        }
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </Container>
    </>
  )
}

export default RegisterLoan