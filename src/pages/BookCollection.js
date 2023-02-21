import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Col, Container, Row } from 'react-bootstrap';

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
          <Col>
            <Book className='img-fluid' imgSrc='https://ihc.fcsh.unl.pt/wp-content/uploads/2018/01/livro001.jpg' title={book.title} authors={book.authors}></Book>
          </Col>
        </>
      );
    } else {
      rowCounter++;
      return (
        <Col >
          <Book className='img-fluid' imgSrc='https://ihc.fcsh.unl.pt/wp-content/uploads/2018/01/livro001.jpg' title={book.title} authors={book.authors}></Book>
        </Col>
      );
    }
  })

  return (
    <>

      <NavbarComponent about={true} signUp={true} />

      <Container className='p-4'>
        <h1 className='text-center'>Acervo</h1>
        <br />
        <Row>
          {booksResult}
        </Row>
      </Container>

    </>
  );
}
