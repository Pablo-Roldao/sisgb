import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

import styles from '../../components/Registers.module.css';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const USER_URL = '/user/';

export default function RegisterUser() {

  const { auth } = useAuth();

  const errRef = useRef();

  const { register, handleSubmit } = useForm();

  const [cpf, setCpf] = useState('');

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
  }, [cpf, pwd, matchPwd]);

  const onSubmit = async data => {

    const pwdIsValid = PWD_REGEX.test(pwd);
    if (!pwdIsValid) {
      setErrMsg("Invalid Entry!");
      return;
    }

    const { name, birthDate, addres, email } = data;

    try {
      const response = await axios.post(USER_URL,
        JSON.stringify({
          name: name,
          cpf: cpf,
          birthDate: birthDate,
          addres: addres,
          email: email,
          password: pwd,
          roles: [
            {
              name: "User",
              code: 2001
            }
          ]
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor!");
      } else if (err.response?.status === 409) {
        setErrMsg("Esse CPF já está cadastrado!")
      } else {
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
        <Container>
          {success ? (
            <>
              <h2 className='text-center'>Usuário cadastrado com sucesso!</h2>
              <h3 className=' text-center'>Seguir para <Link to='/dashboardUser' className={styles.login_button + ' text-decoration-none'}>usuários</Link>...</h3>
            </>
          ) : (
            <>
              <h2 className='text-center'>Cadastrar usuário</h2>
              <p ref={errRef} className={errMsg ? styles.err_msg : styles.offscreen} aria-live="assertive">{errMsg}</p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control {...register("name")} type='text' name='name' placeholder='Insira o nome...' required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>CPF</Form.Label>
                  <Form.Control onChange={(e) => setCpf(e.target.value)} type='text' name='cpf' placeholder='Insira o CPF...' required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Data de nascimento</Form.Label>
                  <Form.Control {...register("birthDate")} type='date' name='birthDate' placeholder='Insira a data de nascimento...' required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control {...register("addres")} type='text' name='addres' placeholder='Insira o endereço...' required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control {...register("email")} type='email' name='email' placeholder='Insira o e-mail...' required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Senha
                    {'  '}
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : styles.hide} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? styles.hide : "invalid"} />
                  </Form.Label>
                  <Form.Control aria-invalid={validPwd ? false : true} aria-describedby="pwdnote" onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)} onChange={(e) => setPwd(e.target.value)}
                    value={pwd} type='password' name='pwd' placeholder='Insira sua senha...' required />
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
                    value={matchPwd} type='password' name='confirm_pwd' placeholder='Insira sua senha novamente...' required />
                  <p id="confirmnote" className={!validMatch ? styles.instructions : styles.offscreen}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    As senhas não coincidem
                  </p>
                </Form.Group>
                <Row>
                  <Col>
                    <Link to='/dashboardUser'>
                      <Button>Cancelar</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button type='submit'
                      className='shadow shadow-lg'
                      disabled={!validPwd || !validMatch ? true : false}>
                      Cadastrar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </>
          )}
        </Container>
      </div>

      <Footer />
    </>
  )
}