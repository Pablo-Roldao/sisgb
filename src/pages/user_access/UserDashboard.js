import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import styles from './UserDashboard.module.css';

import Book from '../../components/Book';
import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const BOOK_URL = '/book';

const DashboardBook = () => {

  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [books, setBooks] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axiosPrivate.get(BOOK_URL);
        setBooks(response.data);
      } catch (err) {
        navigate('/', { state: { from: location }, replace: true });
      }
    }
    getBooks();
    const getCurrentUser = async () => {
      const response1 = await axiosPrivate.post('/user/get-by-cpf',
        JSON.stringify({
          "cpf": auth?.cpf
        }));
      setCurrentUser(response1.data);
    }
    getCurrentUser();
  }, []);

  useEffect(() => { }, [books]);

  const booksResult = books.map((book) => {
    return (
      <Col sm={3} key={book.isbn} >
        <Book book={book} user={currentUser} />
      </Col>
    );
  });

  return (
    <>
      <NavbarComponent
      reservationsUser={true}
      loansUser={true}
      profile={auth?.username}
      userCpf={auth?.cpf}
      logout={true}
      />
      <Container className={styles.dashboard} fluid>
        <Row className='d-flex justify-content-center'>
          {books.length === 0 ? (
            <h3 className='text-center'>Carregando...</h3>
          ) : booksResult}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardBook;