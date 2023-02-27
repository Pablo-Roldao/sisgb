import React, { useEffect, useState } from 'react';
import axios from '../src/api/axios';

import styles from './BookCollection.module.css'

import { Col, Container, Row, Form } from 'react-bootstrap';

import Footer from '../src/components/Footer';
import NavbarComponent from '../src/components/NavbarComponent';
import Book from './Book';

const BOOK_URL = '/book'

export default function BookCollection() {

  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get(BOOK_URL);
      const data = response.data;
      setBooks(data);
    } catch (err) {
      console.log(err);
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

  return (
    <>
      <NavbarComponent about={true} signUp={true} />

      <Container fluid className={styles.welcome}>
        <Container className='p-4'>

          <Row className='p-4'>
            <Col><h1 className='text-center'>Acervo</h1></Col>
            <Col className='p-2'>
              <Form.Control type='text' placeholder='Pesquisar...' onChange={(e) => (e.target.value)}
              className={styles.search_form + ' fw-bold'}  />
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
