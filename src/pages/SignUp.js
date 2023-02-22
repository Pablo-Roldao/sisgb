import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import styles from './SignUp.module.css'

import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/Footer';

export default function SignUp() {

  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    const {name, cpf, birthDate, addres, email, password} = data;
    try {
      await registerUser(name, cpf, birthDate, addres, email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async function registerUser(name, cpf, birthDate, addres, email, password) {
    axios.post('https://sisgb.vercel.app/user/register', {
      name: name,
      cpf: cpf,
      birthDate: birthDate,
      addres: addres,
      email: email,
      password: password,
      isFunctionary: true
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
      <NavbarComponent about={true} bookCollection={true} />

      <div className={styles.sign_up_form}>
        <Container className={styles.form}>
          <h2 className='text-center'>Cadastre-se</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control {...register("name")} type='text' name='name' placeholder='Insira seu nome...' required />
            </Form.Group>
            <Form.Group>
              <Form.Label>CPF</Form.Label>
              <Form.Control {...register("cpf")} type='text' name='cpf' placeholder='Insira seu CPF...' required />
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
              <Form.Label>Senha</Form.Label>
              <Form.Control {...register("password")} type='password' name='password' placeholder='Insira sua senha...' required />
            </Form.Group>
            <div className='p-3 text-center'>
              <Button type='submit'>Cadastrar</Button>
            </div>
          </Form>
        </Container>
      </div>

      <Footer />
    </>
  )
}