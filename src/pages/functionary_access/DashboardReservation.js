import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import styles from '../../components/Dashboard.module.css';

import DeleteSvg from '../../components/DeleteSvg';
import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';
import UpdateSvg from '../../components/UpdateSvg';

const RESERVATION_URL = '/reservation';

const DashboardReservation = () => {
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);

  const [search, setSearch] = useState('');

  const getReservations = async () => {
    try {
      const response = await axiosPrivate.get(RESERVATION_URL);
      setReservations(response.data);
      setFilteredReservations(response.data);
    } catch (err) {
      console.log(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    getReservations();
  }, []);

  useEffect(() => { }, [filteredReservations]);

  useEffect(() => {
    if (!search) {
      setFilteredReservations(reservations);
    } else {
      const filterReservation = reservations.filter((reservation) => {
        if (
          reservation.bookIsbn.includes(search) ||
          reservation.userCpf.toLowerCase().includes(search.toLocaleLowerCase())
        )
          return reservation;
      })
      setFilteredReservations(filterReservation);
    }

  }, [search]);

  async function deleteReservation(id) {
    try {
      await axiosPrivate.post((RESERVATION_URL + '/delete'),
        JSON.stringify({
          "id": id
        })
      );
      const reservationsFilter = reservations.filter((reservation) => {
        if (reservation._id !== id)
          return reservation;
      })
      setReservations(reservationsFilter);
    } catch (err) {
      console.error(err);
    }
  }

  async function transformReservation(id) {
    try {
      await axiosPrivate.post((RESERVATION_URL + '/transform'),
        JSON.stringify({
          "id": id
        })
      );
      const reservationsFilter = reservations.filter((reservation) => {
        if (reservation._id !== id)
          return reservation;
      })
      setReservations(reservationsFilter);
    } catch (err) {
      console.error(err);
    }
  }

  const reservationsResult = filteredReservations.map((reservation) => {
    return (
      <tr key={reservation._id}>
        <td>{reservation.bookIsbn}</td>
        <td>{reservation.userCpf}</td>
        <td>{reservation.startDate.split('T')[0]}</td>
        <td>{reservation.finishDate.split('T')[0]}</td>
        <td>
          <Link to='/updateReservation' state={{ reservationId: reservation._id }} >
            <Button className={styles.update_button}>
              <UpdateSvg />
            </Button>
          </Link>
        </td>
        <td>
          <Button
            onClick={() => deleteReservation(reservation._id)}
            className={styles.delete_button}
          >
            <DeleteSvg />
          </Button>
        </td>
        <td>
          <Button
            onClick={() => transformReservation(reservation._id)}
            className={styles.transform_button}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z" />
            </svg>
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
        dashboardBook={auth?.roles.includes(1984)}
        dashboardUser={auth?.roles.includes(1984)}
        dashboardLoan={auth?.roles.includes(1984)}
        dashboardFunctionary={auth?.roles.includes(5150)}
      />
      <Container fluid className={styles.dashboard}>
        <h1 className='text-center fw-bold'>Controle de reservas</h1>

        <Row>
          <Col sm>
            <Link to='/registerReservation' >
              <Button className={styles.register_button}> + Cadastrar reserva</Button>
            </Link>
          </Col>
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

        <Table striped responsive>
          <thead>
            <tr>
              <th>ISBN do livro</th>
              <th>CPF do usuário</th>
              <th>Data de início</th>
              <th>Data de término</th>
              <th>Editar</th>
              <th>Excluir</th>
              <th>Transformar em empréstimo</th>
            </tr>
          </thead>
          <tbody>
            {reservationsResult}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardReservation;