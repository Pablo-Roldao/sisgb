import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

import styles from '../../components/Dashboard.module.css';

import UpdateSvg from '../../components/UpdateSvg';
import DeleteSvg from '../../components/DeleteSvg';
import Footer from '../../components/Footer';
import NavbarComponent from '../../components/NavbarComponent';

const FUNCTIONARY_URL = '/user';

const DashboardFunctionary = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const location = useLocation();

  const [functionaries, setFunctionaries] = useState([]);
  const [filteredFunctionaries, setFilteredFunctionaries] = useState([]);
  const [search, setSearch] = useState('');

  const getFunctionaries = async () => {
    try {
      const response = await axiosPrivate.get(FUNCTIONARY_URL);
      const functionariesFilter = response.data.filter((functionary) => {
        if (functionary.cpf !== auth?.cpf)
          if (functionary.roles.some(role => role.code === 1984))
            return functionary;
      })
      setFunctionaries(functionariesFilter);
      setFilteredFunctionaries(functionariesFilter);
    } catch (err) {
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    getFunctionaries();
  }, []);

  useEffect(() => { }, [filteredFunctionaries]);

  useEffect(() => {
    if (!search) {
      setFilteredFunctionaries(functionaries);
    } else {
      const filterFunctionaries = functionaries.filter((functionary) => {
        if (
          functionary.cpf.includes(search) ||
          functionary.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
          functionary.email.toLowerCase().includes(search.toLocaleLowerCase())
        )
          return functionary;
      })
      setFilteredFunctionaries(filterFunctionaries);
    }

  }, [search]);

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

  const functionariesResult = filteredFunctionaries.map((functionary) => {
    return (
      <tr key={functionary.cpf}>
        <td>{functionary.cpf}</td>
        <td>{functionary.name}</td>
        <td>{functionary.email}</td>
        <td>{functionary.currentReservationsLoansQuantity}</td>
        <td>{functionary.birthDate.split('T')[0]}</td>
        <td>
          <Link to='/updateFunctionary' state={{ functionaryData: functionary }}  >
            <Button className={styles.update_button}>
              <UpdateSvg />
            </Button>
          </Link>
        </td>
        <td>
          <Button onClick={() => deleteFunctionary(functionary.cpf)} className={styles.delete_button}>
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
        dashboardLoan={auth?.roles.includes(1984)}
        dashboardReservation={auth?.roles.includes(1984)}
      />
      <Container fluid className={styles.dashboard}>
        <h1 className='text-center fw-bold'>Controle de funcionários</h1>

        <Row>
          <Col sm>
            <Link to='/registerFunctionary'>
              <Button className={styles.register_button}>+ Cadastrar funcionário</Button>
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