import React from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

import styles from './AdminDashboard.module.css';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const AdminDashboard = () => {
  const { auth } = useAuth();

  return (
    <>
      <NavbarComponent
        functionaryDashboard={
          auth?.roles.includes(1984)
            ? !auth?.roles.includes(5150)
              ? true
              : false
            : false
        }
        dashboardBook={auth?.roles.includes(1984)}
        dashboardUser={auth?.roles.includes(1984)}
        dashboardLoan={auth?.roles.includes(1984)}
        dashboardReservation={auth?.roles.includes(1984)}
        dashboardFunctionary={auth?.roles.includes(5150)}
        logout={true}
      />
      <Container className={styles.dashboard} fluid>
        <h1>Bem vindo, {auth?.username}!</h1>
        <p>Acesse suas funções na barra de navegação que está localizada na <strong>parte superior da tela</strong>...</p>
        <br />
        <br />
        <br />
        <br />
        <Footer className={styles.footer_sisgb}/>
      </Container>
      
    </>
  )
}

export default AdminDashboard