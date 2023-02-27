import React from 'react';
import { Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './NavbarComponent.module.css'

export default function NavbarComponent(props) {

    const nav = [];

    if (props.about) { nav.push(<Nav.Link key={'about'}><Link to='/about'>Sobre nós</Link></Nav.Link>) };
    if (props.signUp){ nav.push(<Nav.Link key={'SignUp'}><Link to='/signUp'>Cadastre-se</Link></Nav.Link>); }

    if (props.adminDashboard){ nav.push(<Nav.Link key={'adminDashboard'}><Link to='/adminDashboard'>Dashboard</Link></Nav.Link>); }
    if (props.dashboardFunctionary){ nav.push(<Nav.Link key={'dashboardFunctionary'}><Link to='/dashboardFunctionary'>Funcionários</Link></Nav.Link>); }

    if (props.functionaryDashboard){ nav.push(<Nav.Link key={'functionaryDashboard'}><Link to='/functionaryDashboard'>Dashboard</Link></Nav.Link>); }
    if (props.dashboardBook)  { nav.push(<Nav.Link key={'dashboardBook'}><Link to='/dashboardBook'>Livros</Link></Nav.Link>); }
    if (props.dashboardUser)  { nav.push(<Nav.Link key={'dashboardUser'}><Link to='/dashboardUser'>Usuários</Link></Nav.Link>); }
    if (props.dashboardLoan) { nav.push(<Nav.Link key={'dashboardLoan'}><Link to='/dashboardLoan'>Empréstimos</Link></Nav.Link>); }
    if (props.dashboardReservation) { nav.push(<Nav.Link key={'dashboardReservation'}><Link to='/dashboardReservation'>Reservas</Link></Nav.Link>); }

    if (props.bookCollectionUser)  { nav.push(<Nav.Link key={'bookCollectionUser'}><Link to='/bookCollectionUser'>Livros</Link></Nav.Link>); }
    if (props.reservationsuser)  { nav.push(<Nav.Link key={'reservationsUser'}><Link to='/reservationsUser'>Reservas</Link></Nav.Link>); }
    if (props.loansUser)  { nav.push(<Nav.Link key={'loansUser'}><Link to='/loansUser'>Empréstimos</Link></Nav.Link>); }
    if (props.profile)  { nav.push(<Nav.Link key={'profile'}><Link to='/profile'>Perfil</Link></Nav.Link>); }


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
                        <Nav className={styles.navbar_nav}>
                            {nav}
                        </Nav>
                    </Col>
                </Row>

            </Container>
        </Navbar>
    )
}