import React from 'react';  
import styles from './Dashboard.module.css'
import { Button, Col, Container, Row, Table, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from 'axios';
import {  useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Loan from '../components/Loan';
import NavbarComponent from '../components/NavbarComponent';

export default function Dashboard() {


  /*const [dataa, setData] = useState({
    userCpf: '000.000.000-00',
  bookIsbn: '000-00-0000-000-1',
  startDate: 12/11/2023,
  finishDate: 15/11/2023
  });

  const userData = {
    userCpf: dataa.userCpf,
    bookIsbn: dataa.bookIsbn,
    startDate: dataa.startDate,
    finishDate: dataa.finishDate

  };
  axios.post("https://sisgb-api.vercel.app/loan/", userData).then((response) => {
    console.log(response.status);
  });
*/




const [loans, setloans] = useState([]);

const getloans = async () => {
  try {
    const response = await axios.get('https://sisgb-api.vercel.app/loan/');
    const data = response.data;
    setloans(data);
  } catch (error) {
    console.log(error);
  }

}
useEffect(() => {
  getloans()
}, []);

const loansResult = loans.map((loan) => {
  return (
    <Col sm={3}>
      <Loan userCpf={loan.userCpf}/>
    </Col>
  );
})
 

    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    
    return(
        <>
        <NavbarComponent contoleLoan={true} />
 <Container fluid className={styles.welcome} >

          
                <h1 className='text-center  p-5' id='emprestimos'>Empréstimos</h1>
    <Row>
      
      
      <Col >    
      <Button className={styles.btn} onClick={handleShow}> ➕ Novo Empréstimo</Button>
      <Button className={styles.btn2} onClick={handleShow}> ✏️ Editar Empréstimo</Button>
      <Button className={styles.btn3} onClick={handleShow}> 🗑️ Deletar Empréstimo</Button>
      </Col>
      
    
    
    </Row>

    

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register Emprestimo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='my-form'>
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
          <Button variant="primary" >
            Criar
          </Button>
        </Modal.Footer>
      </Modal>
    <br></br>
    <Row className='p-4'>  

  </Row> 
  {loans.length === 0 ?( <h3 className='text-center'>Carregando...</h3>): loansResult}
            </Container>
        <Footer />
        </>
    )


}