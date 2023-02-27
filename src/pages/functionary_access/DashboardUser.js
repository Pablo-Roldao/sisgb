import { Button, Container, Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const USER_URL = '/user';

const DashboardUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const location = useLocation();

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get(USER_URL);
      const usersFilter = response.data.filter((user) => {
        if (user.cpf !== auth?.cpf)
          return user;
      })
      setUsers(usersFilter);

    } catch (err) {
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => { }, [users]);

  async function deleteUser(cpf) {
    try {
      await axiosPrivate.post((USER_URL + '/delete'),
        JSON.stringify({
          "cpf": cpf
        })
      );
      const usersFilter = users.filter((user) => {
        if (user.cpf !== cpf) {
          if (user.cpf !== auth?.cpf)
            return user;
        }
      })
      setUsers(usersFilter);
    } catch (err) {
      console.error(err);
    }
  }

  const usersResult = users.map((user) => {
    return (
      <tr>
        <td>{user.cpf}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.currentReservationsLoansQuantity}</td>
        <td>{user.birthDate.split('T')[0]}</td>
        <td>
          <Link to='/updateUser' state={{ userData: user }} >
            <Button> {"✏️"}</Button>
          </Link>
        </td>
        <td>
          <Button onClick={() => deleteUser(user.cpf)}>
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
      />
      <Container fluid>
        <h1 className='text-center fw-bold'>Controle de usuários</h1>

        <Link to='/registerUser' >
          <Button> ➕ Cadastrar usuário</Button>
        </Link>

        <Table striped responsive>
          <thead>
            <tr>
              <th >CPF</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Nº E/R</th>
              <th>Data de nascimento</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {usersResult}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardUser;