import { Button, Container, Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const RESERVATION_URL = '/reservation';

const DashboardReservation = () => {
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [reservations, setReservations] = useState([]);

  const getReservations = async () => {
    try {
      const response = await axiosPrivate.get(RESERVATION_URL);
      setReservations(response.data);
    } catch (err) {
      console.log(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    getReservations();
  }, []);

  useEffect(() => { }, [reservations]);

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

  const reservationsResult = reservations.map((reservation) => {
    return (
      <tr key={reservation._id}>
        <td>{reservation._id}</td>
        <td>{reservation.bookIsbn}</td>
        <td>{reservation.userCpf}</td>
        <td>{reservation.startDate.split('T')[0]}</td>
        <td>{reservation.finishDate.split('T')[0]}</td>
        <td>
          <Link to='/updateReservation' state={{ reservationId: reservation._id }} >
            <Button> {"✏️"}</Button>
          </Link>
        </td>
        <td>
          <Button onClick={() => deleteReservation(reservation._id)}>
            {"🗑️"}
          </Button>
        </td>
        <td>
          <Button onClick={() => transformReservation(reservation._id)}>
            Transformar
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
      <Container fluid>
        <h1 className='text-center fw-bold'>Controle de reservas</h1>

        <Link to='/registerReservation' >
          <Button> ➕ Cadastrar reserva</Button>
        </Link>

        <Table striped responsive>
          <thead>
            <tr>
              <th>Id</th>
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