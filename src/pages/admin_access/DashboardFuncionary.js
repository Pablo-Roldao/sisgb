import React from 'react'
import { Container } from 'react-bootstrap'

import NavbarComponent from '../../components/NavbarComponent';
import Footer from '../../components/Footer';

const DashboardFuncionary = () => {
  return (
    <>
      <NavbarComponent
        adminDashboard={true}
        dashboardUser={true}
        dashboardBook={true}
        dashboardLoan={true}
        dashboardReservation={true}
      />
      <Container fluid>
          <h1 className='text-center fw-bold'>Controle de funcionários</h1>
      </Container>
      <Footer />
    </>
  )
}

export default DashboardFuncionary