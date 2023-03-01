import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Navbar from '../../components/NavbarComponent';
import Footer from '../../components/Footer';
import Book from '../../components/Book';
import LoginForm from '../../components/LoginForm';
import styles from './Home.module.css';

export default function Home() {

  const [books] = useState([
    {
      isbn: "6549885a26165",
      title: "Algum título...",
      authors: ["Autor X", "Autor Y"],
      imgSrc: "https://ihc.fcsh.unl.pt/wp-content/uploads/2018/01/livro001.jpg"
    },
    {
      isbn: "6549883126165",
      title: "Algum título...",
      authors: ["Autor X", "Autor Y"],
      imgSrc: "https://ihc.fcsh.unl.pt/wp-content/uploads/2018/01/livro001.jpg"
    },
    {
      isbn: "6549885126165",
      title: "Algum título...",
      authors: ["Autor X", "Autor Y"],
      imgSrc: "https://ihc.fcsh.unl.pt/wp-content/uploads/2018/01/livro001.jpg"
    },
    {
      isbn: "65498d5126165",
      title: "Algum título...",
      authors: ["Autor X", "Autor Y"],
      imgSrc: "https://ihc.fcsh.unl.pt/wp-content/uploads/2018/01/livro001.jpg"
    }
  ]);

  const booksResult = (books).map((book) => {
    return (
      <Col sm  key={book.isbn}>
        <Book imgSrc={book.imgSrc} title={book.title} authors={book.authors}/>
      </Col>
    );
  })

  return (
    <section className={styles.home}>
      <Navbar about={true} signUp={true} logoutHide={true}/>

      <Container id='welcome-area' className={styles.welcome_area} fluid>
        <Container>
          <Row>
            <Col id='welcome-message' className={styles.welcome_message} sm>
              <h1><strong>Bem vindo ao SisGB!</strong></h1>
              <p>Um lugar onde você pode fazer e gerenciar empréstimos de livros da melhor forma possível.</p>
              <Link to='/bookCollection'>
                <Button>
                  Conheça nosso acervo...
                </Button>
              </Link>
            </Col>
            <Col id='login-form' className={styles.login_form} sm>
              <LoginForm />
            </Col>
          </Row>
        </Container>

      </Container>

      
      <Container id='donation-incentive-area' className={styles.donation_incentive_area + ' d-flex justify-content-center'} fluid>
        <Row className='container'>
          <Col sm className={styles.donation_incentive_area_message}>
            <h1><strong>4 motivos para doar livros</strong></h1>
            <h6>Passar o conhecimento adiante é algo necessário que pode ajudar muitas pessoas. Então confere esses 4 motivos para você doar os livros que você não usa mais.</h6>
          </Col>
          <Col sm>
            <div>
              <p>1. Incentivar a prática da leitura entre crianças e adultos que ainda não têm o hábito</p>
            </div>
            <div>
              <p>2. Espalhar conhecimento</p>
            </div>
            <div>
              <p>3. Exercitar o desapego</p>
            </div>
            <div>
              <p>4. Leva apenas alguns minutos para doar livros</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </section>
  );

}