import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import styles from '../../components/Registers.module.css';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const BOOK_URL = '/book';

const RegisterBook = () => {
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  const { register, handleSubmit } = useForm();

  const isbnRef = useRef();
  const errRef = useRef();

  const [isbn, setIsbn] = useState('');
  const [genre, setGenre] = useState('Fantasia');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [isbn]);
  const onSubmit = async (data) => {
    const { title, authors, numberOfPages, publisher, publishDate, edition, description, imgSrc } = data;

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

      <Container className={styles.register} fluid>
        {success
          ? (
            <Container className={styles.success_msg} fluid>
              <h1>Livro cadastrado com sucesso!</h1>
              <h3>Voltar para <Link to='/dashboardBook' className='text-decoration-none'>livros</Link>...</h3>
            </Container>
          ) : (

            <>
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
                  <Form.Select
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    <option value='Fantasia'>Fantasia</option>
                    <option value='Ficção científica'>Ficção científica</option>
                    <option value='Distopia'>Distopia</option>
                    <option value='Ação e aventura'>Ação e aventura</option>
                    <option value='Ficção Policial'>Ficção Policial</option>
                    <option value='Horror'>Horror</option>
                    <option value='Thriller e Suspense'>Thriller e Suspense</option>
                    <option value='Ficção histórica'>Ficção histórica</option>
                    <option value='Romance'>Romance</option>
                    <option value='Novela'>Novela</option>
                    <option value='Ficção Feminina'>Ficção Feminina</option>
                    <option value='LGBTQ+'>LGBTQ+</option>
                    <option value='Ficção Contemporânea'>Ficção Contemporânea</option>
                    <option value='Realismo mágico'>Realismo mágico</option>
                    <option value='Graphic Novel'>Graphic Novel</option>
                    <option value='Conto'>Conto</option>
                    <option value='Jovem adulto'>Jovem adulto</option>
                    <option value='Novo Adulto'>Novo Adulto</option>
                    <option value='Memórias e autobiografia'>Memórias e autobiografia</option>
                    <option value='Biografia'>Biografia</option>
                    <option value='Gastronomia'>Gastronomia</option>
                    <option value='Arte e Fotografia'>Arte e Fotografia</option>
                    <option value='Autoajuda'>Autoajuda</option>
                    <option value='História'>História</option>
                    <option value='Viagem'>Viagem</option>
                    <option value='Crimes Reais'>Crimes Reais</option>
                    <option value='Humor'>Humor</option>
                    <option value='Ensaios'>Ensaios</option>
                    <option value='Guias & Como fazer'>Guias & Como fazer</option>
                    <option value='Religião e Espiritualidade'>Religião e Espiritualidade</option>
                    <option value='Humanidades e Ciências Sociais'>Humanidades e Ciências Sociais</option>
                    <option value='Paternidade e família'>Paternidade e família</option>
                    <option value='Tecnologia e Ciência'>Tecnologia e Ciência</option>
                    <option value='Infantil'>Infantil</option>
                  </Form.Select>
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
                  <Col className='text-center'>
                    <Link to='/dashboardBook'>
                      <Button>Cancelar</Button>
                    </Link>
                  </Col>
                  <Col className='text-center' >
                    <Button type='submit'>Registrar</Button>
                  </Col>
                </Row>
              </Form>

            </>
          )
        }
        <Footer />
      </Container>
    </>
  )
}

export default RegisterBook