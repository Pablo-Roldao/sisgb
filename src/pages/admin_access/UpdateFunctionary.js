import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Button, Row, Col, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import styles from '../../components/Registers.module.css';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const FUNCTIONARY_URL = '/user';

export default function UpdateFunctionary() {

  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  const location = useLocation();

  const errRef = useRef();

  const { handleSubmit } = useForm();

  const [name, setName] = useState(location.state?.functionaryData?.name);
  const [birthDate, setBirthDate] = useState(location.state?.functionaryData?.birthDate.split('T')[0]);
  const [addres, setAddres] = useState(location.state?.functionaryData?.addres);
  const [email, setEmail] = useState(location.state?.functionaryData?.email);
  const currentReservationsLoansQuantity = location.state?.functionaryData?.currentReservationsLoansQuantity;

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [pwd, matchPwd]);

  const onSubmit = async () => {

    const pwdIsValid = PWD_REGEX.test(pwd);
    if (!pwdIsValid) {
      setErrMsg("Invalid Entry!");
      return;
    }

    try {
      const response = await axiosPrivate.put(FUNCTIONARY_URL,
        JSON.stringify({
          name,
          cpf: location.state?.functionaryData?.cpf,
          birthDate,
          addres,
          email,
          password: pwd,
          currentReservationsLoansQuantity,
          roles: [
            {
              name: "Functionary",
              code: 1984
            }
          ]
        })
      )
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor!");
      } else if (err.response?.status === 409) {
        setErrMsg("Esse CPF já está cadastrado!")
      } else {
        console.log(err);
        setErrMsg('Falha no cadastro! ' + err);
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

      <div >
        <Container className={styles.register} fluid>
          {success ? (
            <>
              <h2 className='text-center'>Funcionário atualizado com sucesso!</h2>
              <h3 className=' text-center'>Seguir para <Link to='/dashboardFunctionary'>funcionários</Link>...</h3>
            </>
          ) : (
            <>
              <h2 className='text-center'>Alterar funcionário de CPF {location.state?.functionaryData?.cpf}</h2>
              <p ref={errRef} className={errMsg ? styles.err_msg : styles.offscreen} aria-live="assertive">{errMsg}</p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    name='name'
                    placeholder='Insira o nome...'
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Data de nascimento</Form.Label>
                  <Form.Control
                    type='date'
                    name='birthDate'
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    placeholder='Insira a data de nascimento...'
                    required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control type='text'
                    name='addres'
                    value={addres}
                    onChange={(e) => setAddres(e.target.value)}
                    placeholder='Insira o endereço...'
                    required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Insira o e-mail...'
                    required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Senha
                    {'  '}
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : styles.hide} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? styles.hide : "invalid"} />
                  </Form.Label>
                  <Form.Control
                    aria-invalid={validPwd ? false : true}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    type='password'
                    name='pwd'
                    placeholder='Insira a senha...'
                    required
                  />
                  <p id="pwdnote" className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}>
                    <span class="bi bi-exclamation"></span>
                    <strong>Regras para elaboração da senha:</strong> <br />
                    8 a 24 caracteres.<br />
                    Deve conter letras maiúsculas, minúsculas, um número e um caracter especial.<br />
                    Caracteres especiais permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                  </p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Confirmação de senha
                    {"   "}
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : styles.hide} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? styles.hide : "invalid"} />
                  </Form.Label>
                  <Form.Control
                    aria-invalid={validMatch ? false : true}
                    aria-describedby="confirmnote"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd} type='password' name='confirm_pwd' placeholder='Insira a senha novamente...' required />
                  <p id="confirmnote" className={!validMatch ? styles.instructions : styles.offscreen}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    As senhas não coincidem
                  </p>
                </Form.Group>
                <Row>
                  <Col className='text-center'>
                    <Link to='/dashboardFunctionary'>
                      <Button>Cancelar</Button>
                    </Link>
                  </Col>
                  <Col className='text-center'>
                    <Button type='submit'
                      className='shadow shadow-lg'
                      disabled={!validPwd || !validMatch ? true : false}>
                      Atualizar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </>
          )}

          <Footer />
        </Container>
      </div>

    </>
  )
}