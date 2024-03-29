import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
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
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [search, setSearch] = useState('');

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axiosPrivate.get(BOOK_URL);
        setBooks(response.data);
        setFilteredBooks(response.data);
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

  useEffect(() => { }, [filteredBooks]);

  useEffect(() => {
    if (!search) {
      setFilteredBooks(books);
    } else {
      const filterBook = books.filter((book) => {
        if (
          book.isbn.includes(search) ||
          book.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
          book.authors.toLowerCase().includes(search.toLocaleLowerCase()) ||
          book.publisher.toLowerCase().includes(search.toLocaleLowerCase()) ||
          book.genre.toLowerCase().includes(search.toLocaleLowerCase())
        )
          return book;
      })
      setFilteredBooks(filterBook);
    }

  }, [search]);

  const booksResult = filteredBooks.map((book) => {
    return (
      <Col sm={3} key={book.isbn}>
        <Book book={book} user={currentUser} />
      </Col>
    );
  });

  return (
    <>
      <NavbarComponent
        reservationsUser
        loansUser
        profile={auth?.username}
        userCpf={auth?.cpf}
        logout
      />

      <section className={styles.collection}>
        <Row>
            <h1 className={styles.collection__title}>Acervo</h1>
          <Col sm>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                className={styles.search}
                type='seach'
                placeholder='Buscar...'
                aria-label='search'
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
          {books.length === 0 ? (
            <h3 className='text-center'>Carregando...</h3>
          ) : booksResult}
        </Row>
      </section>

      <section className={styles.footer}>
        <Footer />
      </section>
    </>
  );
}

export default DashboardBook;