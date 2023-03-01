import React from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

import styles from './FunctionaryDashboard.module.css';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const FunctionaryDashboard = () => {
  const { auth } = useAuth();

  return (
    <>
      <NavbarComponent
        adminDashboard={auth?.roles.includes(5150)}
        dashboardBook={auth?.roles.includes(1984)}
        dashboardUser={auth?.roles.includes(1984)}
        dashboardLoan={auth?.roles.includes(1984)}
        dashboardReservation={auth?.roles.includes(1984)}
        dashboardFunctionary={auth?.roles.includes(5150)}
      />
      <Container className={styles.dashboard} fluid>
        <h1 className='text-center fw-bold'>Bem vindo, {auth?.username}!</h1>
        <p>Acesse suas funções na barra de navegação que está localizada na <strong>parte superior da tela</strong>...</p>
      </Container>
      <Footer />
    </>
  )
}

export default FunctionaryDashboard;