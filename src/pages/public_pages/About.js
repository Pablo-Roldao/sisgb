import React, { Component } from 'react';

import { Col, Container, Row, Image } from 'react-bootstrap';

import styles from './About.module.css'

import Navbar from '../../components/NavbarComponent';
import Footer from '../../components/Footer';

export default class About extends Component {
  render() {
    return (
      <>
        <Navbar signUp={true} logoutHide={true} />

        <section className={styles.about}>
          <h1 className={styles.about__title}>Sobre o Sistema Gerenciador de Bibliotecas (SisGB)</h1>
          <Row className={styles.about__people}>
            <Col className={styles.person}>
              <Image src={'./pablo-profile.jpg'} title='Pablo Santos' className={styles.img} />
              <p>Pablo Roldão</p>
            </Col>
            <Col className={styles.person}>
              <Image src='paulo-profile.jpg' title='Paulo Cardoso' className={styles.img} />
              <p>Paulo Cardoso</p>
            </Col>
            <Col className={styles.person}>
              <Image src='./maria-profile.jpg' title="Maria Gabriela" className={styles.img} />
              <p>Maria Pontes</p>
            </Col>
          </Row>
          <p className={styles.about__message}>
            Desenvolvido por Pablo Roldão, Paulo Cardoso e Maria Pontes, este sistema busca informatizar os trabalhos em bibliotecas, possibilitando o controle do acervo bibliotecário, dos empréstimos, das reservas, dos usuários e dos funcionários. Além disso, visa possibilitar que os usuários vejam o acervo, seus empréstimos em andamento e reservem livros sem sair de suas casas.
          </p>
        </section>

        <section className={styles.footer}>
          <Footer />
        </section>

      </>
    );
  }
}
