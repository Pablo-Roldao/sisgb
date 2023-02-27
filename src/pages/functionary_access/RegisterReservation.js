import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import styles from '../../components/Registers.module.css';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const RESERVATION_URL = '/reservation';

const RegisterReservation = () => {

  const axiosPrivate = useAxiosPrivate();

  const { handleSubmit } = useForm();

  const errRef = useRef();

  const [userCpf, setUserCpf] = useState('');
  const [bookIsbn, setBookIsbn] = useState('');
  const [finishDate, setFinishDate] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [bookIsbn, userCpf]);

  const onSubmit = async () => {

    try {
      await axiosPrivate.post(RESERVATION_URL,
        JSON.stringify({
          "bookIsbn": bookIsbn,
          "userCpf": userCpf,
          "finishDate": finishDate
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
        adminDashboard={true}
        dashboardUser={true}
        dashboardFunctionary={true}
        dashboardBook={true}
        dashboardReservation={true}
      />
      {success
        ? (
          <>
            <h2>Reserva cadastrada com sucesso!</h2>
            <p>Voltar para <Link to='/dashboardReservation'>Reservas</Link>...</p>
          </>
        ) : (

          <Container fluid>
            <h2>Registrar reserva</h2>
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
              <Form.Group>
                <Form.Label>Data de término</Form.Label>
                <Form.Control type='date' name='finishDate' placeholder='Insira a data de término...'
                  onChange={(e) => setFinishDate(e.target.value)} required />
              </Form.Group>
              <Row >
                <Col sm>
                  <Link to='/dashboardReservation'>
                    <Button>Cancelar</Button>
                  </Link>
                  <Button type='submit'>Registrar</Button>
                </Col>

              </Row>
            </Form>
          </Container>
        )
      }

      <Footer />
    </>
  )
}

export default RegisterReservation