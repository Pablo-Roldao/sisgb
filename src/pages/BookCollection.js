import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

import styles from './BookCollection.module.css'

import { Col, Container, Row, Form } from 'react-bootstrap';

import Footer from '../components/Footer';
import NavbarComponent from '../components/NavbarComponent';
import Book from '../components/Book';

export default function BookCollection() {

  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get("https://sisgb-api.vercel.app/book/get-all");

      const data = response.data;

      console.log(data);
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBooks()
  }, []);


 

  let rowCounter = 0;
  const booksResult = books.map((book) => {
    if (rowCounter === 4) {
      rowCounter = 1;
      return (
        <>
          <Row></Row>
          <Col className='col-sm-3'>
            <Book className='img-fluid' imgSrc={book.imgSrc} title={book.title} authors={book.authors}></Book>
          </Col>
        </>
      );
    } else {
      rowCounter++;
      return (
        <Col className='col-sm-3'>
          <Book className='img-fluid' imgSrc={book.imgSrc} title={book.title} authors={book.authors}></Book>
        </Col>
      );
    }
  })

 

  return (
    <>

      <NavbarComponent about={true} signUp={true} />

<Container fluid className={styles.welcome}>
      <Container className='p-4'>

    <Row className=' p-4'>
      <Col><h1>Acervo</h1></Col>
        
       
    <Col className='p-2'>
        <Form.Control 
          type='text'
          placeholder='Busque aqui...'
          
          onChange={(e) => (e.target.value)}
        /></Col>
        </Row>

       <Row className='p-4'>
          {booksResult}
        </Row>


       
      </Container></Container>
      <Footer />

    </>
  );
}
