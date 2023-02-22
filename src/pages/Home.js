import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import Navbar from '../components/NavbarComponent';
import Footer from '../components/Footer';
import Book from '../components/Book';
import LoginForm from '../components/LoginForm';
import styles from './Home.module.css';

export default function Home() {

  const popularBooks = [
    {
      title: "Algum título...",
      authors: ["Autor X", "Autor Y"],
      imgSrc: "https://ihc.fcsh.unl.pt/wp-content/uploads/2018/01/livro001.jpg"
    },
    {
      title: "Algum título...",
      authors: ["Autor X", "Autor Y"],
      imgSrc: "https://ihc.fcsh.unl.pt/wp-content/uploads/2018/01/livro001.jpg"
    },
    {
      title: "Algum título...",
      authors: ["Autor X", "Autor Y"],
      imgSrc: "https://ihc.fcsh.unl.pt/wp-content/uploads/2018/01/livro001.jpg"
    },
    {
      title: "Algum título...",
      authors: ["Autor X", "Autor Y"],
      imgSrc: "https://ihc.fcsh.unl.pt/wp-content/uploads/2018/01/livro001.jpg"
    }
  ]

  const popularBooksResult = (popularBooks).map((popularBook) => {
    return (
      <Col className={' '}>
        <Book className='img-fluid' imgSrc={popularBook.imgSrc} title={popularBook.title} authors={popularBook.authors} />
      </Col>
    );
  })

  return (
    <>
      <Navbar className={styles.nav} about={true} bookCollection={true} signUp={true} />

      <Container fluid id='welcome-area' className={styles.welcome} >
        <Container className='p-5' fluid>
          <Row>
            <Col className='col-sm-7'>
              <Container className={styles.logline}>
                <h1>Bem vindo ao Sistema Gerenciador de Bibliotecas (SisGB)!</h1>
                <p>Um lugar onde você pode fazer e gerenciar empréstimos de livros da melhor forma possível...</p>
                <br></br>
                <Button className={styles.button + ' w-50 p-3'}>
                  <a href='/bookCollection' className='text-decoration-none link link-dark fw-bold'>Conheça nosso acervo...</a>
                </Button>
              </Container>
            </Col>
            <Col className='p-3'>
              <LoginForm />
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
              {popularBooksResult}
              {/*<Col className={styles.portfoliowrap}>
                  <Book className='img-fluid' imgSrc='https://ihc.fcsh.unl.pt/wp-content/uploads/2018/01/livro001.jpg' title='Aprenda Programação Orientada a Objetos em 21 dias' authors='Sintes, Anthony' />
                </Col>
                <Col className={styles.portfoliowrap}>
                  <Book imgSrc='https://staticbv.am4.com.br/publicacoes/8/thumbs/thumbnail_397_x_595.jpg' title='Aprenda Programação Orientada a Objetos em 21 dias' authors='Sintes, Anthony' />
                </Col>
                <Col className={styles.portfoliowrap}>
                  <Book imgSrc='https://staticbv.am4.com.br/publicacoes/8/thumbs/thumbnail_397_x_595.jpg' title='Aprenda Programação Orientada a Objetos em 21 dias' authors='Sintes, Anthony' />
                </Col>
                <Col className={styles.portfoliowrap}>
                  <Book imgSrc='https://staticbv.am4.com.br/publicacoes/8/thumbs/thumbnail_397_x_595.jpg' title='Aprenda Programação Orientada a Objetos em 21 dias' authors='Sintes, Anthony' />
  </Col>*/}
            </Row>
            <div className='text-center p-5'>
              <a href='/bookCollection' className={styles.btngetstarted + ' p-3 link link-light text-decoration-none'}>Navegue pelo acervo...</a>
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
              <p>1. Você incentiva a prática da leitura entre crianças e adultos que ainda não têm o hábito</p>
            </div>

            <div className={styles.accordionitem}>
              <p>2. Você espalha conhecimento</p>
            </div>

            <div className={styles.accordionitem}>
              <p>3. Exercitar o desapego</p>
            </div>

            <div className={styles.accordionitem}>
              <p>4.  Doar é tão fácil e prático</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );

}