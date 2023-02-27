import React from 'react';
import { Container } from 'react-bootstrap';

import NavbarComponent from '../../components/NavbarComponent';
import Footer from '../../components/Footer';

const AdminDashboard = () => {
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
        <h1 className='text-center fw-bold'>Bem vindo, Administrador!</h1>
      </Container>
      <Footer />
    </>
  )
}

export default AdminDashboard