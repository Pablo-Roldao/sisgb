import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/Footer';

export default function SignUp() {

  const { register, handleSubmit, formState: { erros } } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <>
      <NavbarComponent about={true} bookCollection={true} />

      <div className='p-3'>
        <Container className='border'>
          <h3 className='text-center'>Cadastre-se</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control type='text' name='name' {...register("name")} placeholder='Insira seu nome...' required />
            </Form.Group>
            <Form.Group>
              <Form.Label>CPF</Form.Label>
              <Form.Control type='text' name='cpf' {...register("cpf")} placeholder='Insira seu CPF...' required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control type='date' name='birthDate' {...register("birthDate")} placeholder='Insira sua data de nascimento...' required />
            </Form.Group>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control type='email' name='email' {...register("email")} placeholder='Insira seu e-mail...' required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Senha</Form.Label>
              <Form.Control type='password' name='password' {...register("password")} placeholder='Insira sua senha...' required />
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