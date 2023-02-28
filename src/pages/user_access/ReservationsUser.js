import { Button, Container, Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import styles from '../../components/Dashboard.module.css';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const RESERVATION_URL = '/reservation';

const ReservationsUser = () => {
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [reservations, setReservations] = useState([]);

  const getReservations = async () => {
    try {
      const response = await axiosPrivate.get(RESERVATION_URL);
      const reservationsFilter = response.data.filter((reservation) => {
        if (reservation.userCpf === auth?.cpf) {
          return reservation;
        }
      })
      const responseBooks = await axiosPrivate.get('/book');
      responseBooks.data.map((book) => {
        for (let i = 0; i < reservationsFilter.length; i++) {
          if (book.isbn === reservationsFilter[i].bookIsbn) {
            reservationsFilter[i].bookTitle = book.title;
          }
        }
      })
      setReservations(reservationsFilter);
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

  const reservationsResult = reservations.map((reservation) => {
    return (
      <tr key={reservation._id}>
        <td>{reservation.bookTitle}</td>
        <td>{reservation.startDate.split('T')[0]}</td>
        <td>{reservation.finishDate.split('T')[0]}</td>
        <td>
          <Button
            className={styles.delete_button}
            onClick={() => deleteReservation(reservation._id)}
          >
            {"🗑️"}
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <NavbarComponent
        userDashboard={true}
        loansUser={true}
        profile={auth?.username}
        userCpf={auth?.cpf}
      />
      <Container className={styles.dashboard} fluid>
        <h1 className='text-center fw-bold'>Reservas em andamento</h1>
        <br />
        <Table striped responsive>
          <thead>
            <tr>
              <th>Livro</th>
              <th>Data de início</th>
              <th>Data de término</th>
              <th>Excluir</th>
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

export default ReservationsUser;