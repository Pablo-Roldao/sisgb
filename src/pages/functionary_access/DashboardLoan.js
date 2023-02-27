import { Button, Container, Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const LOAN_URL = '/loan';

const DashboardLoan = () => {
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
      <tr>
        <td>{loan._id}</td>
        <td>{loan.bookIsbn}</td>
        <td>{loan.userCpf}</td>
        <td>{loan.startDate.split('T')[0]}</td>
        <td>{loan.finishDate.split('T')[0]}</td>
        <td>
          <Link to='/updateLoan' state={{ loanData: loan }} >
            <Button> {"✏️"}</Button>
          </Link>
        </td>
        <td>
          <Button onClick={() => deleteLoan(loan._id)}>
            {"🗑️"}
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <NavbarComponent
        adminDashboard={true}
        dashboardUser={true}
        dashboardReservation={true}
        dashboardBook={true}
      />
      <Container fluid>
        <h1 className='text-center fw-bold'>Controle de empréstimos</h1>

        <Link to='/registerLoan' >
          <Button> ➕ Cadastrar empréstimo</Button>
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