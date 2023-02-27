import { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Footer from './Footer';
import NavbarComponent from './NavbarComponent';
import styles from './DashboardBook.module.css'

const BOOK_URL = '/book';

const DashboardBook = () => {

    const [books, setBooks] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

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

    const updateBook = (bookIsbn) => {
        ;
    }

    const deleteBook = (bookIsbn) => {

    }

    const booksResult = books.map((book) => {
        return (
            <tr>
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
                    {"✏️"}
                </td>
                <td>
                    {"🗑️"}
                </td>
            </tr>
        );
    })

    return (
        <>
            <NavbarComponent dashboard={true} />
            <Container fluid className={styles.screenone}> 
            <h1 className='text-center p-4 text-white'>Controle de Livros</h1>
            
             <Container className='p-2'>
                      <Row>
                            <Col>
                                <Link to='/registerBook' >
                                    <Button className={styles.btn}> ➕ Cadastrar livro</Button>
                                </Link>
                            </Col>
                        </Row></Container>
            <Container className={styles.books}>
              
               

                <Table striped responsive className='p-4'>
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
            </Container>
            <Footer />
        </>
    )
}

export default DashboardBook;