import { useEffect, useRef, useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import styles from '../../components/Registers.module.css';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const BOOK_URL = '/book';

const RegisterBook = () => {

  const axiosPrivate = useAxiosPrivate();

  const { register, handleSubmit } = useForm();

  const isbnRef = useRef();
  const errRef = useRef();

  const [isbn, setIsbn] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [isbn]);

  const onSubmit = async (data) => {
    const { title, authors, numberOfPages, publisher, publishDate, edition, genre, description, imgSrc } = data;

    try {
      await axiosPrivate.post(BOOK_URL,
        JSON.stringify({
          "isbn": isbn,
          "title": title,
          "authors": authors,
          "numberOfPages": numberOfPages,
          "publisher": publisher,
          "publishDate": publishDate,
          "edition": edition,
          "genre": genre,
          "description": description,
          "imgSrc": imgSrc
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
        adminDashboard={true}
        dashboardUser={true}
        dashboardBook={true}
        dashboardLoan={true}
        dashboardReservation={true}
      />
      {success
        ? (
          <>
            <h2>Livro cadastrado com sucesso!</h2>
            <p>Voltar para <Link to='/dashboardBook'>Livros</Link>...</p>
          </>
        ) : (

          <Container fluid>
            <h2>Registrar livro</h2>
            <p ref={errRef} className={errMsg ? styles.err_msg : styles.offscreen} aria-live="assertive">{errMsg}</p>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label>ISBN do livro</Form.Label>
                <Form.Control type='text' ref={isbnRef} name='isbn' placeholder='Insira o ISBN...'
                  onChange={(e) => setIsbn(e.target.value)} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control type='text' name='title' placeholder='Insira o título...'
                  {...register('title')} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Autores</Form.Label>
                <Form.Control type='text' name='authors' placeholder='Insira os autores...'
                  {...register('authors')} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Número de páginas</Form.Label>
                <Form.Control type='number' min='0' name='numberOfPages' placeholder='Insira o número de páginas...'
                  {...register('numberOfPages')} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Editora</Form.Label>
                <Form.Control type='text' name='publisher' placeholder='Insira a editora...'
                  {...register('publisher')} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ano de publicação</Form.Label>
                <Form.Control type='number' max='2099' min='0' name='publishDate' placeholder='Insira o ano de publicação...'
                  {...register('publishDate')} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edição</Form.Label>
                <Form.Control type='text' name='edition' placeholder='Insira a edição...'
                  {...register('edition')} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Gênero</Form.Label>
                <Form.Control type='text' name='genre' placeholder='Insira o gênero...'
                  {...register('genre')} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control as='textarea' type='text' name='description' placeholder='Insira a descrição...'
                  {...register('description')} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Link da imagem da capa</Form.Label>
                <Form.Control type='url' ref={isbnRef} name='imgSrc' placeholder='Insira o link da imagem da capa...'
                  {...register('imgSrc')} required />
              </Form.Group>
              <Row >
                <Col sm>
                  <Link to='/dashboardBook'>
                    <Button>Cancelar</Button>
                  </Link>
                  <Button type='submit'>Registrar</Button>
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

export default RegisterBook