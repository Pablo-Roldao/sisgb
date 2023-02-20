import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../pages/Home.module.css'

import Navbar from '../components/NavbarComponent';
import Footer from '../components/Footer';
import Book from '../components/Book';

export default class Home extends Component {
  render() {

    return (
      <>
        <Navbar className={styles.nav} about={true} bookCollection={true} signUp={true} />

        <Container id='welcome-area' className={styles.welcome} fluid>
          <Container className='p-5' fluid>
            <Row>
              <Col className='col-sm-7'>
                <Container className={styles.logline}>
                  <h1>Bem vindo ao Sistema Gerenciador de Bibliotecas (SisGB)!</h1>
                  <p>Um lugar onde você pode fazer e gerenciar empréstimos de livros da melhor forma possível...</p>
                 <br></br>
                   <Button className='p-3 btn'>
                   
                    <a href='/bookCollection' className='text-decoration-none'>Conheça nosso acervo...</a>
                  </Button>
                </Container>
              </Col>
              <Col className='p-3'>
                <Container id='login-form' className={styles.loginforns}>
                  <h1 className='text-center'>Login</h1>
                  <Form>
                    <Form.Group>
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control type='email' placeholder='Insira seu e-mail...' />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Senha</Form.Label>
                      <Form.Control type='password' placeholder='Insira sua senha...' />
                    </Form.Group>
                    <Row className='text-center p-3 '>
                      <Col className='m-1'>
                        <Button type='submit' className={styles.button}>
                          Entrar
                        </Button>
                      </Col>
                      <Col className='m-1'>
                        <Button className={styles.button}>
                          <a href='/signUp' className='text-decoration-none'>Cadastre-se</a>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Container>
              </Col>
            </Row>
          </Container>

        </Container>

        <Container fluid id='popular-books ' className={styles.portfolio}>
          <div className='text-center p-4' >
            <h1>Livros em alta</h1>
            <p className='p-2'>Navegue pela imensidão de livros presentes em nossa biblioteca...</p>
          </div>
          <div>
            <Container>
              <Row>
                <Col className={styles.portfoliowrap}>
                  <Book className='img-fluid' imgSrc='https://staticbv.am4.com.br/publicacoes/8/thumbs/thumbnail_397_x_595.jpg' title='Aprenda Programação Orientada a Objetos em 21 dias' authors='Sintes, Anthony' />
                </Col>
                <Col className={styles.portfoliowrap}>
                  <Book imgSrc='https://staticbv.am4.com.br/publicacoes/8/thumbs/thumbnail_397_x_595.jpg' title='Aprenda Programação Orientada a Objetos em 21 dias' authors='Sintes, Anthony' />
                </Col>
                <Col className={styles.portfoliowrap}>
                  <Book imgSrc='https://staticbv.am4.com.br/publicacoes/8/thumbs/thumbnail_397_x_595.jpg' title='Aprenda Programação Orientada a Objetos em 21 dias' authors='Sintes, Anthony' />
                </Col>
                <Col className={styles.portfoliowrap}>
                  <Book imgSrc='https://staticbv.am4.com.br/publicacoes/8/thumbs/thumbnail_397_x_595.jpg' title='Aprenda Programação Orientada a Objetos em 21 dias' authors='Sintes, Anthony' />
                </Col>
              </Row>
              <div className='text-center p-5'>
                <Link className= {styles.btngetstarted} to={'/bookCollection'}>Navegue pelo acervo...</Link>
              </div>
            </Container>
          </div>
        </Container>

        <Container fluid id='reasons-donation' className={styles.faq}>
          <Row >
            <Col className='p-4'>
              <h2>4 motivos para doar livros</h2>
              <p>Passar o conhecimento adiante é algo necessário que pode ajudar muitas pessoas. Então confere esses 4 motivos para você doar os livros que você não usa mais.</p>
            </Col>
            <Col>
              <div className={styles.accordionitem}>
                <p>
                   
                   1. Você incentiva a prática da leitura entre crianças e adultos que ainda não têm o hábito
                </p>
              
                
              </div>

              <div className={styles.accordionitem}>
                <p>
                 
                   2. Você espalha conhecimento
                  
                </p>
                
  
              </div>

              <div className={styles.accordionitem}>
                <p>
                  
                
                    3. Exercitar o desapego
               
                </p>
                
              </div>

              <div className={styles.accordionitem}>
                <p>
               
                   
                  4.  Doar é tão fácil e prático
                 
                </p>
               
              </div>

            </Col>
          </Row>
        </Container>

        <Footer />
      </>
    );
  }
}