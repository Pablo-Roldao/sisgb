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
      />
      <Container fluid>
        <h1 className='text-center fw-bold'>Bem vindo, {auth?.username}!</h1>
      </Container>
      <Footer />
    </>
  )
}

export default AdminDashboard