import React from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Footer from '../components/Footer';

import styles from './Dashboard.module.css';

import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
  import { NavLink } from 'react-router-dom';

export default function Dashboard() {

    
    return(
        <>
          <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" className={styles.nav}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            SisGB
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Emprestimos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">Acervo</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink>

            
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
  
         

        <Container fluid className={styles.welcome} >

            <h1 className='text-center text-white'> Dasboard SisGB</h1>

            <Container className='p-4'>
              
                <Row className='p-4'>
 
                <Col className='col-sm-3'>
                        <div className={styles.card}>
                            <h2>Livros</h2>
                            <p>2222</p>
                        </div>
                
                    </Col> 
                    
                <Col className='col-sm-3'>
                        <div className={styles.card}>
                            <h2>Empréstimos</h2>
                            <p>2222</p>
                        </div>
                
                    </Col>
                    
                <Col className='col-sm-3'>
                        <div className={styles.card}>
                            <h2>Usuários</h2>
                            <p>2222</p>
                        </div>
                
                    </Col>
                <Col className='col-sm-3'>
                        <div className={styles.card}>
                            <h2>Funcionários</h2>
                            <p>2222</p>
                        </div>
                
                    </Col>
                
                </Row>


                <h1 className='text-center text-white p-5'>Ultimos Empréstimos</h1>

    <Table striped bordered hover className='p-4'>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>

            </Container>
        </Container>
       </div>

        <Footer />
        
        </>
    )


}