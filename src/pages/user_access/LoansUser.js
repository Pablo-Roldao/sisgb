import { Button, Container, Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import styles from '../../components/Dashboard.module.css';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const LOAN_URL = '/loan';

const LoansUser = () => {
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [loans, setLoans] = useState([]);


  const getLoans = async () => {
    try {
      const response = await axiosPrivate.get(LOAN_URL);
      const loansFilter = response.data.filter((loan) => {
        if (loan.userCpf === auth?.cpf) {
          return loan;
        }
      })
      const responseBooks = await axiosPrivate.get('/book');
      responseBooks.data.map((book) => {
        for (let i = 0; i < loansFilter.length; i++) {
          if (book.isbn === loansFilter[i].bookIsbn) {
            loansFilter[i].bookTitle = book.title;
          }
        }
      })
      setLoans(loansFilter);
    } catch (err) {
      console.log(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    getLoans();
  }, []);

  useEffect(() => { }, [loans]);

  async function renewLoan(id) {
    let finishDate = new Date();
    finishDate.setDate(finishDate.getDate() + 7);
    finishDate = finishDate.toISOString().split('T')[0];
    try {
      await axiosPrivate.put(LOAN_URL,
        JSON.stringify({
          "id": id,
          "finishDate": finishDate
        }));
      getLoans();
    } catch (err) {
      console.log(err);
    }
  }

  const loansResult = loans.map((loan) => {
    const now = (new Date().toISOString().split('T')[0]);
    const finishDate = loan.finishDate.split('T')[0];
    const startDate = loan.startDate.split('T')[0];
    return (
      <tr key={loan._id}>
        <td>{loan.bookTitle}</td>
        <td>{startDate}</td>
        <td>{finishDate}</td>
        <td>
          <Button
            className={styles.renew_button}
            onClick={() => renewLoan(loan._id)}
            disabled={
              now !== finishDate
                ? true
                : false
            }
          >
            Renovar
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <NavbarComponent
        userDashboard={true}
        reservationsUser={true}
        profile={auth?.username}
        userCpf={auth?.cpf}
      />
      <Container fluid className={styles.dashboard}>
        <h1 className='text-center fw-bold'>Empréstimos em andamento</h1>

        <Table striped responsive rounded bordered>
          <thead>
            <tr>
              <th>ISBN do livro</th>
              <th>Data de início</th>
              <th>Data de término</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loansResult}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
}

export default LoansUser