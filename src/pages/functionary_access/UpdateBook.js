import { useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import styles from '../../components/Registers.module.css';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const BOOK_URL = '/book';

const UpdateBook = () => {

  const { auth } = useAuth();

  const location = useLocation();

  const axiosPrivate = useAxiosPrivate();

  const { handleSubmit } = useForm();

  const errRef = useRef();

  const [title, setTitle] = useState(location.state?.bookData?.title);
  const [authors, setAuthors] = useState(location.state?.bookData?.authors);
  const [numberOfPages, setNumberOfPages] = useState(location.state?.bookData?.numberOfPages);
  const [publisher, setPublisher] = useState(location.state?.bookData?.publisher);
  const [publishDate, setPublishDate] = useState(location.state?.bookData?.publishDate.split('-')[0]);
  const [edition, setEdition] = useState(location.state?.bookData?.edition);
  const [genre, setGenre] = useState(location.state?.bookData?.genre);
  const [description, setDescription] = useState(location.state?.bookData?.description);
  const [imgSrc, setImgSrc] = useState(location.state?.bookData?.imgSrc);


  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {

    try {
      await axiosPrivate.put(BOOK_URL,
        JSON.stringify({
          "isbn": location.state?.bookData?.isbn,
          "title": title,
          "authors": authors,
          "numberOfPages": numberOfPages,
          "publisher": publisher,
          "publishDate": publishDate,
          "edition": edition,
          "genre": genre,
          "description": description,
          "imgSrc": imgSrc,
          "state": location.state?.bookData?.state
        }));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor!");
      } else if (err?.response?.status === 409) {
        setErrMsg("Já existe um livro cadastrado com esse ISBN!");
      } else {
        setErrMsg("Falha no registro! " + err);
      }
      errRef.current.focus();
    }
  }

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
        dashboardBook={auth?.roles.includes(1984)}
        dashboardUser={auth?.roles.includes(1984)}
        dashboardLoan={auth?.roles.includes(1984)}
        dashboardReservation={auth?.roles.includes(1984)}
        dashboardFunctionary={auth?.roles.includes(5150)}
      />
      {success
        ? (
          <>
            <h2>Livro atualizado com sucesso!</h2>
            <p>Voltar para <Link to='/dashboardBook'>Livros</Link>...</p>
          </>
        ) : (
          <Container className={styles.register} fluid>
            <h2>Atualizar livro</h2>
            <p ref={errRef} className={errMsg ? styles.err_msg : styles.offscreen} aria-live="assertive">{errMsg}</p>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  placeholder='Insira o título...'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Autores</Form.Label>
                <Form.Control
                  type='text'
                  name='authors'
                  placeholder='Insira os autores...'
                  onChange={(e) => setAuthors(e.target.value)}
                  value={authors}
                  required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Número de páginas</Form.Label>
                <Form.Control
                  type='number'
                  min='0'
                  name='numberOfPages'
                  placeholder='Insira o número de páginas...'
                  onChange={(e) => setNumberOfPages(e.target.value)}
                  value={numberOfPages}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Editora</Form.Label>
                <Form.Control
                  type='text'
                  name='publisher'
                  placeholder='Insira a editora...'
                  onChange={(e) => setPublisher(e.target.value)}
                  value={publisher}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ano de publicação</Form.Label>
                <Form.Control
                  type='number'
                  max='2099'
                  min='0'
                  name='publishDate'
                  placeholder='Insira o ano de publicação...'
                  onChange={(e) => setPublishDate(e.target.value)}
                  value={publishDate}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edição</Form.Label>
                <Form.Control
                  type='text'
                  name='edition'
                  placeholder='Insira a edição...'
                  onChange={(e) => setEdition(e.target.value)}
                  value={edition}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Gênero</Form.Label>
                <Form.Control
                  type='text'
                  name='genre'
                  placeholder='Insira o gênero...'
                  onChange={(e) => setGenre(e.target.value)}
                  value={genre}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as='textarea'
                  type='text'
                  name='description'
                  placeholder='Insira a descrição...'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Link da imagem da capa</Form.Label>
                <Form.Control
                  type='url'
                  name='imgSrc'
                  placeholder='Insira o link da imagem da capa...'
                  onChange={(e) => setImgSrc(e.target.value)}
                  value={imgSrc}
                  required
                />
              </Form.Group>
              <Row >
                <Col className='text-center'>
                  <Link to='/dashboardBook'>
                    <Button>Cancelar</Button>
                  </Link>
                </Col>
                <Col className='text-center'>
                  <Button type='submit'>Atualizar</Button>
                </Col>
              </Row>
            </Form>
          </Container>
        )
      }

      <Footer />
    </>
  )
}

export default UpdateBook