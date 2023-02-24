import React from 'react';  
import styles from './Dashboard.module.css'
import { Button, Col, Container, Row, Table, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';

  import { NavLink } from 'react-router-dom';
import Loan from '../components/Loan';

export default function Dashboard() {


  const [loan, setLoan] = useState([]);

  const getLoan= async () => {
    try {
      const response = await axios.get("https://sisgb-api.vercel.app/loan/get-all");

      const data = response.data;

      console.log(data);
      setLoan(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLoan()
  }, []);


 

  let rowCounter = 0;
  const loanResult = loan.map((loan) => {
    if (rowCounter === 4) {
      rowCounter = 1;
      return (
        <>
          <Row></Row>
          <Col>
            <Loan />
          </Col>
        </>
      );
    } else {
      rowCounter++;
      return (
        <Col>
        <Loan />
      </Col>
      );
    }
  })


  function createPost() {
    axios
      .post("https://sisgb-api.vercel.app/loan/register", {
        userCpf: "1235522",
        bookIsbn:"55222",
        startDate:"20/04/2023",
        finishDate: "21/04/2023",
      })
      .then((response) => {
        setLoan(response.data);
      }); 
       if (!loan) return "No post!"
  }


 

    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    
    return(
        <>
          <div className={styles.sed} >
      <CDBSidebar textColor="#fff" className={styles.nav}  id="none" >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link to="/" className="text-decoration-none text-white ">
            SisGB
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/Dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="#emprestimos" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Emprestimos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/BookDsh" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">Acervo</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeChreflassName="activeClicked">
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
              <Form.Label>CPF</Form.Label>
              <Form.Control
               name='userCpf'
                type="nunber"
                placeholder="12345601256"
                autoFocus
              />
               <Form.Label>isbn</Form.Label>
              <Form.Control
                type="nunber"
                placeholder="12345601256"
                autoFocus
              />
               <Form.Label>Data de Inicio</Form.Label>
              <Form.Control
                type='date'
                autoFocus
              />

          <Form.Label>Data de termino</Form.Label>
              <Form.Control
                type='date'
                autoFocus
              />
            </Form.Group>
        
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createPost}>
            Criar
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
    {loanResult}

            </Container>
        </Container>
       
  </div>
        <Footer />
        
        </>
    )


}