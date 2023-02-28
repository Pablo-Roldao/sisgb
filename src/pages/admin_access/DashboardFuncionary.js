import { Button, Container, Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const FUNCTIONARY_URL = '/user';

const DashboardFunctionary = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const location = useLocation();

  const [functionaries, setFunctionaries] = useState([]);

  const getFunctionaries = async () => {
    try {
      const response = await axiosPrivate.get(FUNCTIONARY_URL);
      const functionariesFilter = response.data.filter((functionary) => {
        if (functionary.cpf !== auth?.cpf)
          if (functionary.roles.some(role => role.code === 1984))
            return functionary;
      })
      setFunctionaries(functionariesFilter);

    } catch (err) {
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    getFunctionaries();
  }, []);

  useEffect(() => { }, [functionaries]);

  async function deleteFunctionary(cpf) {
    try {
      await axiosPrivate.post((FUNCTIONARY_URL + '/delete'),
        JSON.stringify({
          "cpf": cpf
        })
      );
      const functionaryFilter = functionaries.filter((functionary) => {
        if (functionary.cpf !== cpf) {
          if (functionary.cpf !== auth?.cpf)
            return functionary;
        }
      })
      setFunctionaries(functionaryFilter);
    } catch (err) {
      console.error(err);
    }
  }

  const functionariesResult = functionaries.map((functionary) => {
    return (
      <tr>
        <td>{functionary.cpf}</td>
        <td>{functionary.name}</td>
        <td>{functionary.email}</td>
        <td>{functionary.currentReservationsLoansQuantity}</td>
        <td>{functionary.birthDate.split('T')[0]}</td>
        <td>
          <Link to='/updateFunctionary' state={{ functionaryData: functionary }} >
            <Button> {"✏️"}</Button>
          </Link>
        </td>
        <td>
          <Button onClick={() => deleteFunctionary(functionary.cpf)}>
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
        dashboardLoan={true}
        dashboardReservation={true}
        dashboardBook={true}
        dashboardFunctionary={true}
      />
      <Container fluid>
        <h1 className='text-center fw-bold'>Controle de funcionários</h1>

        <Link to='/registerFunctionary' >
          <Button> ➕ Cadastrar funcionário</Button>
        </Link>

        <Table striped responsive>
          <thead>
            <tr>
              <th>CPF</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Nº E/R</th>
              <th>Data de nascimento</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {functionariesResult}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardFunctionary;