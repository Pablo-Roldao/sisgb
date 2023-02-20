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
          <div className='text-center p-5' >
            <h1>Livros em alta</h1>
            <p>Navegue pela imensidão de livros presentes em nossa biblioteca...</p>
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
              <div className='text-center p-3'>
                <Link to={'/bookCollection'}>Navegue pelo acervo...</Link>
              </div>
            </Container>
          </div>
        </Container>

        <Container id='reasons-donation' className='border p-3'>
          <Row>
            <Col>
              <h3>4 motivos para doar livros</h3>
              <p>Passar o conhecimento adiante é algo necessário que pode ajudar muitas pessoas. Então confere esses 4 motivos para você doar os livros que você não usa mais.</p>
            </Col>
            <Col>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#reason1">
                    <span class="num">1.</span>
                    Você incentiva a prática da leitura entre crianças e adultos que ainda não têm o hábito
                  </button>
                </h3>
                <div id="reason1" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                  <div class="accordion-body">
                    Doando seus livros que não são mais utilizados, você pode propocionar o hábito da leitura em diversas outras pessoas!
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#reason2">
                    <span class="num">2.</span>
                    Você espalha conhecimento
                  </button>
                </h3>
                <div id="reason2" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                  <div class="accordion-body">
                    Propagar o conhecimento é a base da educação, contribua com isso fazendo com que mais pessoas tenham acesso ao conhecimento contido nos livros.
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq-content-4">
                    <span class="num">3.</span>
                    Exercitar o desapego
                  </button>
                </h3>
                <div id="faq-content-4" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                  <div class="accordion-body">
                    Algumas coisas não são essenciais de se possuir, exercite o desapego e doe conhecimento! Embora você ame livros, fazer com que o conteúdo deles fiquem disponíveis a outras pessoas com certeza vale mais a pena que o sentimento de tê-los em posse.
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq-content-5">
                    <span class="num">4.</span>
                    Doar é tão fácil e prático
                  </button>
                </h3>
                <div id="faq-content-5" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                  <div class="accordion-body">
                    É simples, vá ao nosso espaço presencial com o livro e faça sua doação em minutos. Sem complicações, sem demora, rápido como ler uma página!
                  </div>
                </div>
              </div>

            </Col>
          </Row>
        </Container>

        <Footer />
      </>
    );
  }
}