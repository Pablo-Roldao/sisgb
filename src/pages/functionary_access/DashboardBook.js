import { Button, Container, Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import styles from '../../components/Dashboard.module.css';

import UpdateSvg from '../../components/UpdateSvg';
import DeleteSvg from '../../components/DeleteSvg';
import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const BOOK_URL = '/book';

const DashboardBook = () => {

  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [books, setBooks] = useState([]);

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
  }, []);

  useEffect(() => { }, [books]);

  async function deleteBook(isbn) {
    try {
      await axiosPrivate.post((BOOK_URL + '/delete'),
        JSON.stringify({
          "isbn": isbn
        })
      );
      const booksFilter = books.filter((book) => {
        if (book.isbn !== isbn)
          return book;
      })
      setBooks(booksFilter);
    } catch (err) {
      console.error(err);
    }
  }

  const booksResult = books.map((book) => {
    return (
      <tr key={book.isbn}>
        <td>{book.isbn}</td>
        <td>{book.title}</td>
        <td>{book.authors}</td>
        <td>{book.publisher}</td>
        <td>{book.edition}</td>
        <td>{book.genre}</td>
        <td>{
          book.state === "loaned"
            ? "Emprestado"
            : book.state === "reserved"
              ? "Reservado"
              : "Livre"
        }</td>
        <td>
          <Link to='/updateBook' state={{ bookData: book }} >
            <Button className={styles.update_button}>
              <UpdateSvg />
            </Button>
          </Link>
        </td>
        <td>
          <Button
            onClick={() => deleteBook(book.isbn)}
            disabled={book.state !== 'free' ? true : false}
            className={styles.delete_button}
          >
            <DeleteSvg />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <NavbarComponent
        adminDashboard={auth?.roles.includes(5150)}
        functionaryDashboard={
          auth?.roles.includes(1984)
            ? !auth?.roles.includes(5150)
              ? true
              : false
            : false
        }
        dashboardUser={auth?.roles.includes(1984)}
        dashboardLoan={auth?.roles.includes(1984)}
        dashboardReservation={auth?.roles.includes(1984)}
        dashboardFunctionary={auth?.roles.includes(5150)}
      />
      <Container fluid className={styles.dashboard}>
        <h1 className='text-center fw-bold'>Controle de livros</h1>

        <Link to='/registerBook'>
          <Button className={styles.register_button}> + Cadastrar livro</Button>
        </Link>

        <Table striped responsive>
          <thead>
            <tr>
              <th >ISBN</th>
              <th>Título</th>
              <th>Autores</th>
              <th>Editora</th>
              <th>Edição</th>
              <th>Gênero</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {booksResult}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardBook;