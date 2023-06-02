import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Navbar from '../../components/NavbarComponent';
import Footer from '../../components/Footer';
import LoginForm from '../../components/LoginForm';
import styles from './Home.module.css';

export default function Home() {

  return (
    <>
      <div className={styles.header}>
        <Navbar about signUp logoutHide />
      </div>

      <div className={styles.main}>

        <section id='welcome-area' className={styles.section + ' ' + styles.welcome}>
          <h1 className={styles.welcome__title}>Bem vindo ao <abbr title='Sistema Gerenciador de Bibliotecas'>SisGB</abbr></h1>
          <p className={styles.welcome__sis_description}>Um lugar onde você pode realizar e gerenciar empréstimos de livros da melhor forma possível.</p>
          <div className='text-center'>
            <Link to='/signUp'>
              <Button className={'btn btn-dark ' + styles.welcome__signup_button}>
                Cadastre-se
              </Button>
            </Link>
          </div>
        </section>

        <section className={styles.section + ' ' + styles.login}>
          <LoginForm />
        </section>

        <section className={styles.section + ' ' + styles.donation}>
          <h2 className={styles.donation__title}>Quatro motivos para doar livros</h2>
          <p className={styles.donation__phrase}>Passar o conhecimento adiante é algo necessário que pode ajudar muitas pessoas. Então confere esses 4 motivos para você doar os livros que você não usa mais.</p>
          <ol>
            <li>Incentivar a prática da leitura entre crianças e adultos que ainda não têm o hábito</li>
            <li>Espalhar conhecimento</li>
            <li>Exercitar o desapego</li>
            <li>Leva apenas alguns minutos para doar livros</li>
          </ol>
        </section>

        <section className={styles.section + ' ' + styles.footer}>
          <Footer />
        </section>

      </div>
    </>
  );
}