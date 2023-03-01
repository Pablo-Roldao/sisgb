import { useState, useEffect, useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios';

import styles from './SignUp.module.css'

import NavbarComponent from '../../components/NavbarComponent';
import Footer from '../../components/Footer';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/user/';

export default function SignUp() {

  const errRef = useRef();

  const { register, handleSubmit } = useForm();

  const [cpf, setCpf] = useState('');
  const [validCpf, setValidCpf] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidCpf(isCpfValid(cpf));
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [cpf, pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [cpf, pwd, matchPwd]);

  function isCpfValid(strCpf) {
    if (strCpf.length !== 11 ||
      strCpf === "00000000000" ||
      strCpf === "11111111111" ||
      strCpf === "22222222222" ||
      strCpf === "33333333333" ||
      strCpf === "44444444444" ||
      strCpf === "55555555555" ||
      strCpf === "66666666666" ||
      strCpf === "77777777777" ||
      strCpf === "88888888888" ||
      strCpf === "99999999999")
      return false;
    var soma;
    var resto;
    soma = 0;
    if (strCpf === "00000000000") return false;

    for (let i = 1; i <= 9; i++) soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(strCpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(strCpf.substring(10, 11))) return false;
    return true;
  }

  const onSubmit = async data => {

    const pwdIsValid = PWD_REGEX.test(pwd);
    if (!pwdIsValid) {
      setErrMsg("Invalid Entry!");
      return;
    }

    const { name, birthDate, addres, email } = data;

    try {
      const response = await axios.post(REGISTER_URL,
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
      console.log(JSON.stringify(response));
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
      <NavbarComponent about={true} bookCollection={true} logoutHide={true} />

      <div className={styles.sign_up_form}>
        <Container className={styles.form}>
          {success ? (
            <>
              <h2 className='text-center'>Usuário cadastrado com sucesso!</h2>
              <h3 className=' text-center'>Seguir para <Link to='/' className={styles.login_button + ' text-decoration-none'}>entrar</Link>...</h3>
            </>
          ) : (
            <>
              <h2 className='text-center'>Cadastre-se</h2>
              <p ref={errRef} className={errMsg ? styles.err_msg : styles.offscreen} aria-live="assertive">{errMsg}</p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control {...register("name")} type='text' name='name' placeholder='Insira seu nome...' required />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    CPF
                    {"   "}
                    <FontAwesomeIcon icon={faCheck} className={validCpf ? "valid" : styles.hide} />
                    <FontAwesomeIcon icon={faTimes} className={validCpf || !cpf ? styles.hide : "invalid"} />
                  </Form.Label>
                  <Form.Control
                    aria-invalid={validPwd ? false : true}
                    aria-describedby="cpfnote"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    type='text'
                    name='cpf'
                    placeholder='Insira seu CPF...'
                    required
                  />
                  <p id="cpfnote" className={validCpf || !cpf ? styles.offscreen : styles.instructions}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {"  "}Não coloque caracteres especiais, como . ou -, no CPF.
                  </p>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Data de nascimento</Form.Label>
                  <Form.Control {...register("birthDate")} type='date' name='birthDate' placeholder='Insira sua data de nascimento...' required />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control {...register("addres")} type='text' name='addres' placeholder='Insira seu endereço...' required />
                </Form.Group>

                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control {...register("email")} type='email' name='email' placeholder='Insira seu e-mail...' required />
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
                    placeholder='Insira sua senha...'
                    required
                  />
                  <p id="pwdnote" className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}>
                    <span className="bi bi-exclamation"></span>
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
                <div className='p-3 text-center'>
                  <Button type='submit'
                    className='shadow shadow-lg'
                    disabled={!validPwd || !validMatch || !validCpf ? true : false}>
                    Cadastrar
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Container>
        
      <Footer />
      </div>

    </>
  )
}