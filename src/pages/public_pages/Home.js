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
      <Col sm key={book.isbn}>
        <Book imgSrc={book.imgSrc} title={book.title} authors={book.authors} />
      </Col>
    );
  })

  return (
    <section className={styles.home}>
      <Navbar about={true} signUp={true} logoutHide={true} />

      <Container id='welcome-area' className={styles.welcome_area} fluid>
        <Container>
          <Row>
            <Col id='welcome-message' className={styles.welcome_message} sm>
              <h1><strong>Bem vindo ao SisGB!</strong></h1>
              <p>Um lugar onde você pode fazer e gerenciar empréstimos de livros da melhor forma possível.</p>
              <Link to='/signUp'>
                <Button>
                  Cadastre-se
                </Button>
              </Link>
            </Col>
            <Col id='login-form' className={styles.login_form} sm>
              <LoginForm />
            </Col>
          </Row>
        </Container>

        <br />
        <br />
        <br />
        <br />
      </Container>
      <Container id='donation-incentive-area' className={styles.donation_incentive_area} fluid>
        <Row className='container'>
          <Col sm className={styles.donation_incentive_area_message}>
            <h1><strong>4 motivos para doar livros</strong></h1>
            <h5>Passar o conhecimento adiante é algo necessário que pode ajudar muitas pessoas. Então confere esses 4 motivos para você doar os livros que você não usa mais.</h5>
          </Col>
          <Col sm>
            <div>
              <h6>1. Incentivar a prática da leitura entre crianças e adultos que ainda não têm o hábito</h6>
            </div>
            <div>
              <h6>2. Espalhar conhecimento</h6>
            </div>
            <div>
              <h6>3. Exercitar o desapego</h6>
            </div>
            <div>
              <h6>4. Leva apenas alguns minutos para doar livros</h6>
            </div>
          </Col>
        </Row>

        <Footer className={styles.footer_sisgb} />
      </Container>
    </section>
  );

}