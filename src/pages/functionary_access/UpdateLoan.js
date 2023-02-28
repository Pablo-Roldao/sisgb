import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import styles from '../../components/Registers.module.css';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const LOAN_URL = '/loan';

const UpdateLoan = () => {

  const { auth } = useAuth();

  const location = useLocation();

  const axiosPrivate = useAxiosPrivate();

  const { handleSubmit } = useForm();

  const errRef = useRef();

  const id = location.state?.loanData?._id;
  const [finishDate, setFinishDate] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [finishDate]);

  const onSubmit = async () => {

    try {
      await axiosPrivate.put(LOAN_URL,
        JSON.stringify({
          "id": id,
          "finishDate": finishDate
        }));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor!");
      } else if (err?.response?.status === 404) {
        setErrMsg("Empréstimo não encontrado!");
      } else {
        console.log(err);
        setErrMsg("Falha ao atualizar! " + err);
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
      {success
        ? (
          <>
            <h2>Empréstimo atualizado com sucesso!</h2>
            <p>Voltar para <Link to='/dashboardLoan'>Empréstimos</Link>...</p>
          </>
        ) : (

          <Container fluid>
            <h2>Alterar data de término do empréstimo {location.state?.loanData?._id}</h2>
            <p ref={errRef} className={errMsg ? styles.err_msg : styles.offscreen} aria-live="assertive">{errMsg}</p>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label>Data de término</Form.Label>
                <Form.Control type='date' name='finishDate' placeholder='Insira a data de término...'
                  onChange={(e) => setFinishDate(e.target.value)} value={finishDate} required />
              </Form.Group>
              <Row >
                <Col sm>
                  <Link to='/dashboardLoan'>
                    <Button>Cancelar</Button>
                  </Link>
                  <Button type='submit'>Atualizar</Button>
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

export default UpdateLoan