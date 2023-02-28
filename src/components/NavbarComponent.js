import React from 'react';
import { Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './NavbarComponent.module.css'

export default function NavbarComponent(props) {

    const nav = [];

    if (props.about) { nav.push(<Nav.Item key={'about'}><Link to='/about'>Sobre nós</Link></Nav.Item>) };
    if (props.signUp){ nav.push(<Nav.Item key={'SignUp'}><Link to='/signUp'>Cadastre-se</Link></Nav.Item>); }

    if (props.adminDashboard){ nav.push(<Nav.Item key={'adminDashboard'}><Link to='/adminDashboard'>Dashboard</Link></Nav.Item>); }
    if (props.dashboardFunctionary){ nav.push(<Nav.Item key={'dashboardFunctionary'}><Link to='/dashboardFunctionary'>Funcionários</Link></Nav.Item>); }

    if (props.functionaryDashboard){ nav.push(<Nav.Item key={'functionaryDashboard'}><Link to='/functionaryDashboard'>Dashboard</Link></Nav.Item>); }
    if (props.dashboardBook)  { nav.push(<Nav.Item key={'dashboardBook'}><Link to='/dashboardBook'>Livros</Link></Nav.Item>); }
    if (props.dashboardUser)  { nav.push(<Nav.Item key={'dashboardUser'}><Link to='/dashboardUser'>Usuários</Link></Nav.Item>); }
    if (props.dashboardLoan) { nav.push(<Nav.Item key={'dashboardLoan'}><Link to='/dashboardLoan'>Empréstimos</Link></Nav.Item>); }
    if (props.dashboardReservation) { nav.push(<Nav.Item key={'dashboardReservation'}><Link to='/dashboardReservation'>Reservas</Link></Nav.Item>); }

    if (props.userDashboard) { nav.push(<Nav.Item key={'userDashboard'}><Link to='/userDashboard'>Dashboard</Link></Nav.Item>); }
    if (props.bookCollectionUser)  { nav.push(<Nav.Item key={'bookCollectionUser'}><Link to='/bookCollectionUser'>Livros</Link></Nav.Item>); }
    if (props.reservationsUser)  { nav.push(<Nav.Item key={'reservationsUser'}><Link to='/reservationsUser'>Reservas</Link></Nav.Item>); }
    if (props.loansUser)  { nav.push(<Nav.Item key={'loansUser'}><Link to='/loansUser'>Empréstimos</Link></Nav.Item>); }
    if (props.profile)  { nav.push(<Nav.Item key={'profile'}><Link to='/profile'>Perfil</Link></Nav.Item>); }


    return (
        <Navbar id='navbar' className={styles.navbar}>
            <Container>
                <Row className={styles.navbar_row}>
                    <Col sm={4} className={styles.brand_col}>
                        <Navbar.Brand>
                            <Link to='/'>
                                <Image fluid src='https://icon-library.com/images/icon-for-books/icon-for-books-1.jpg' width='100px' />{' '}SisGB
                            </Link>
                        </Navbar.Brand>
                    </Col>
                    <Col sm={8}>
                        <Nav className={styles.navbar_nav} justify={true}>
                            {nav}
                        </Nav>
                    </Col>
                </Row>

            </Container>
        </Navbar>
    )
}