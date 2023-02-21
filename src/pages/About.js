import React, { Component } from 'react';

import { Col, Container, Row, Image } from 'react-bootstrap';

import styles from './About.module.css'


import Navbar from '../components/NavbarComponent';
import Footer from '../components/Footer';

export default class About extends Component {
  render() {
    return (
      <>
        <Navbar className={styles.nav} bookCollection={true} signUp={true} />

        <Container fluid className={styles.welcome}>
          <Container>
            <h1 className='text-center '> Quem somos?</h1>
            <Row className='text-center p-4'>
              <Col>
                <Image src='https://pps.whatsapp.net/v/t61.24694-24/319739971_5468149453290699_6268322776429377067_n.jpg?ccb=11-4&oh=01_AdSEqCHP_51nLEreakiIebJxu9mGuGa5Eqh7dlpKa4CSeg&oe=64021AC4' title='Pablo Santos' className={styles.img} />
                <br></br>
                <br></br>
                <p className='fw-bold'>Pablo Roldão</p>
              </Col>
              <Col>
                <Image src='https://pps.whatsapp.net/v/t61.24694-24/312282518_512640284140916_956721877032146133_n.jpg?ccb=11-4&oh=01_AdRLJsKA_3pdMZtRi0N2PufHyVE-2dYMpbP5XeUU1sqd7Q&oe=64020974' title="Maria Gabriela" className={styles.img} />
                <br></br>
                <br></br>
                <p className='fw-bold'>Maria Gabriela</p>
              </Col>
              <Col>
                <Image src='https://pps.whatsapp.net/v/t61.24694-24/312282513_872782853854766_7218014564138224856_n.jpg?ccb=11-4&oh=01_AdSA1krgrUZobmzmNzovMqM1efy6yBNBBA77gYJoAMMzAg&oe=64021F03' title='Paulo Cardoso' className={styles.img} />

                <br></br>
                <br></br>
                <p className='fw-bold'>Paulo Cardoso</p>
              </Col>

            </Row>
            <Row>
              <Col>
                <h4 className='text-justify'>Nomeado por SISGB, o presente trabalho busca a implantação de um sistema que visa a gestão do acervo bibliotecário em instituições públicas. A partir de pesquisas foi localizado a inexistência de sistemas que disponibilizam o controle de livros e empréstimos na rede municipal de ensino na cidade de Garanhuns, usando como modelo a biblioteca Luiz Brasil localizada no parque Euclides Dourado atendendo suas necessidades e possibilitando atualizações de novas funções para outros estudantes e uma forma de contribuir aos bibliotecários e usuários uma aplicação intuitiva, simples e segura no qual busca conter perdas de livros, além da conclusão do curso técnico em informática integrado por estudantes do IFPE  Campus Garanhuns e a oportunidade de atividades posteriores de extensão.
                </h4>
              </Col>

            </Row>

          </Container>
        </Container>

        <Footer />

      </>
    );
  }
}
