import React from 'react';
import { Button, Col, Container, Row, Table, Card, Form, Modal } from 'react-bootstrap';
import Footer from '../components/Footer';
import  { useState } from 'react';
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
    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    
    return(
        <>
          <div className={styles.sed} >
      <CDBSidebar textColor="#fff" className={styles.nav} >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            SisGB
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/Dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="#emprestimos" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Emprestimos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/bookColletionS" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">Acervo</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/perfil" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Perfil</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="stop">Sair</CDBSidebarMenuItem>
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


                <h1 className='text-center text-white p-5' id='emprestimos'>Empréstimos</h1>

    <div>
    <Button className={styles.btn} onClick={handleShow}> + Novo Empréstimo</Button>
</div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register Emprestimo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    <br></br>
        
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