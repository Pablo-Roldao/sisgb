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

const LOAN_URL = '/loan';

const DashboardLoan = () => {
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [loans, setLoans] = useState([]);

  const getLoans = async () => {
    try {
      const response = await axiosPrivate.get(LOAN_URL);
      setLoans(response.data);
    } catch (err) {
      console.log(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    getLoans();
  }, []);

  useEffect(() => { }, [loans]);

  async function deleteLoan(id) {
    try {
      await axiosPrivate.post((LOAN_URL + '/delete'),
        JSON.stringify({
          "id": id
        })
      );
      const loansFilter = loans.filter((loan) => {
        if (loan._id !== id)
          return loan;
      })
      setLoans(loansFilter);
    } catch (err) {
      console.error(err);
    }
  }

  const loansResult = loans.map((loan) => {
    return (
      <tr key={loan._id}>
        <td>{loan.bookIsbn}</td>
        <td>{loan.userCpf}</td>
        <td>{loan.startDate.split('T')[0]}</td>
        <td>{loan.finishDate.split('T')[0]}</td>
        <td>
          <Link to='/updateLoan' state={{ loanData: loan }} >
            <Button className={styles.update_button}> 
            <UpdateSvg />
            </Button>
          </Link>
        </td>
        <td>
          <Button
            onClick={() => deleteLoan(loan._id)}
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
        dashboardBook={auth?.roles.includes(1984)}
        dashboardUser={auth?.roles.includes(1984)}
        dashboardReservation={auth?.roles.includes(1984)}
        dashboardFunctionary={auth?.roles.includes(5150)}
      />
      <Container fluid className={styles.dashboard}>
        <h1 className='text-center fw-bold'>Controle de empréstimos</h1>

        <Link to='/registerLoan' >
          <Button className={styles.register_button}> + Cadastrar empréstimo</Button>
        </Link>

        <Table striped responsive>
          <thead>
            <tr>
              <th>ISBN do livro</th>
              <th>CPF do usuário</th>
              <th>Data de início</th>
              <th>Data de término</th>
              <th>Editar</th>
              <th>Excluir</th>
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

export default DashboardLoan