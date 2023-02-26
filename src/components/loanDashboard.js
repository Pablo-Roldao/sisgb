import { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Footer from './Footer';
import NavbarComponent from './NavbarComponent';

const LOAN_URL = '/loan';

const LoanDashboard = () => {

    const [loans, setLoans] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getLoans = async () => {
            try {
                const response = await axiosPrivate.get(LOAN_URL);
                setLoans(response.data);
            } catch (err) {
                navigate('/', { state: { from: location }, replace: true });
            }
        }
        getLoans();
    }, []);

    const loansResult = loans.map((loan) => {
        return (
            <tr>
                <td>{loan._id}</td>
                <td>{loan.userCpf}</td>
                <td>{loan.bookIsbn}</td>
                <td>{loan.startDate}</td>
                <td>{loan.finishDate}</td>
            </tr>
        );
    })

    return (
        <>
            <NavbarComponent dashboard={true} />
            <Container fluid >
                <h1 className='text-center  p-5' id='emprestimos'>Empréstimos</h1>
                <Row>
                    <Col >
                        <Link to='/loanRegister'>
                            <Button> ➕ Novo Empréstimo</Button>
                        </Link>
                        <Button> ✏️ Editar Empréstimo</Button>
                        <Button> 🗑️ Deletar Empréstimo</Button>
                    </Col>
                </Row>

                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>CPF</th>
                            <th>ISBN</th>
                            <th>Data de início</th>
                            <th>Data de término</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loansResult}
                    </tbody>
                </Table>
            </Container>
            <Footer />
        </>
    )
}

export default LoanDashboard