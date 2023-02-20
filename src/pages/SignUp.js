import React, { Component } from 'react';

import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/Footer';
import { Button, Container, Form } from 'react-bootstrap';

export default class SignUp extends Component {
  render() {
    return (
      <>
        <NavbarComponent about={true} bookCollection={true} />
        
        <div className='p-3'>
          <Container className='border'>
            <h3 className='text-center'>Cadastre-se</h3>
            <Form action='sisgb-api.vercel.app/user/register'>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control type='text' placeholder='Insira seu nome...' />
              </Form.Group>
              <Form.Group>
                <Form.Label>CPF</Form.Label>
                <Form.Control type='text' placeholder='Insira seu CPF...' />
              </Form.Group>
              <Form.Group>
                <Form.Label>Data de nascimento</Form.Label>
                <Form.Control type='date' placeholder='Insira sua data de nascimento...' />
              </Form.Group>
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control type='email' placeholder='Insira seu e-mail...' />
              </Form.Group>
              <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Form.Control type='password' placeholder='Insira sua senha...' />
              </Form.Group>
              <div className='p-3 text-center'>
                <Button type='submit'>Cadastrar</Button>
              </div>
            </Form>
          </Container>
        </div>

        <Footer />
      </>
    );
  }
}