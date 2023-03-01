import React, { Component } from 'react';

import { Col, Container, Row, Image } from 'react-bootstrap';

import styles from './About.module.css'


import Navbar from '../../components/NavbarComponent';
import Footer from '../../components/Footer';

export default class About extends Component {
  render() {
    return (
      <>
        <Navbar className={styles.nav} bookCollection={true} signUp={true} logoutHide={true} />

        <Container fluid className={styles.about}>
          <Container>
            <h1>Sobre o Sistema Gerenciador de Biblioteca (SisGB)</h1>
            <Row className='text-center'>
              <Col>
                <Image src={'./pablo-profile.jpg'} title='Pablo Santos' className={styles.img} />
                <p>Pablo Roldão</p>
              </Col>
              <Col>
                <Image src='./maria-profile.jpg' title="Maria Gabriela" className={styles.img} />
                <p>Maria Gabriela</p>
              </Col>
              <Col>
                <Image src='paulo-profile.jpg' title='Paulo Cardoso' className={styles.img} />
                <p>Paulo Cardoso</p>
              </Col>

            </Row>
            <Row>
              <Col>
                <h4>
                  Este sistema busca informatizar os trabalhos em bibliotecas, possibilitando o controle do acervo bibliotecário, dos empréstimos, das reservas, dos usuários e dos funcionários. Além disso, visa possibilitar que os usuários vejam o acervo, seus empréstimos em andamento e reservem livros sem sair de suas casas.
                </h4>
              </Col>

            </Row>


           
          </Container>
          <Footer />
        </Container>

      </>
    );
  }
}
