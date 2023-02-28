import React from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const AdminDashboard = () => {
  const { auth } = useAuth();

  return (
    <>
      <NavbarComponent
        dashboardFunctionary={true}
        dashboardUser={true}
        dashboardBook={true}
        dashboardLoan={true}
        dashboardReservation={true}
      />
      <Container fluid>
        <h1 className='text-center fw-bold'>Bem vindo, {auth?.username}!</h1>
      </Container>
      <Footer />
    </>
  )
}

export default AdminDashboard