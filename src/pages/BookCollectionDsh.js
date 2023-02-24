import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

import styles from './BookCollection.module.css'

import { Col, Container, Row, Form, Modal, Button } from 'react-bootstrap';

import Footer from '../components/Footer';
import NavbarComponent from '../components/NavbarComponent';
import Book from '../components/Book';

const BOOK_URL = '/book'

export default function BookDsh() {

  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get(BOOK_URL);
      const data = response.data;
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBooks()
  }, []);

  const booksResult = books.map((book) => {
    return (
      <Col sm={3} key={book.isbn}>
        <Book className='img-fluid' imgSrc={book.imgSrc} title={book.title} authors={book.authors} ></Book>
      </Col>
    );
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


 
  const [loan, setLoan] = useState([]);
    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    

  return (
    <>
      <NavbarComponent about={true} signUp={true} />

      <Container fluid className={styles.welcome}>
        <Container className='p-4'>

          <Row className='p-4'>
            <Col><h1 className='text-center'>Acervo</h1></Col>
            <Col className='p-2'>
            <div>
    <Button className={styles.btn} onClick={handleShow}> + Novo Empréstimo</Button>
</div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="nunber"
                placeholder="12345601256"
                autoFocus
              />
               <Form.Label>Isbn</Form.Label>
              <Form.Control
                type="nunber"
                placeholder="12345601256"
                autoFocus
              />
               <Form.Label>Autor</Form.Label>
              <Form.Control
                type='text'
                autoFocus
              />

          <Form.Label>Url da imagem</Form.Label>
              <Form.Control
                type='url'
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
            </Col>
          </Row>

          <Row className='p-4'>
            {books.length === 0 ? (
              <h3 className='text-center'>Carregando...</h3>
            ) : booksResult}
          </Row>

        </Container></Container>
      <Footer />

    </>
  );
}
