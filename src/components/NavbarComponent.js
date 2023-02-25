import React from 'react';
import { Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './NavbarComponent.module.css'

export default function NavbarComponent(props) {

    const nav = [];
    if (props.about) {
        nav.push(<Nav.Link key={'about'}><Link to='/about'>Sobre nós</Link></Nav.Link>);
    }
    if (props.bookCollection) {
        nav.push(<Nav.Link key={'bookCollection'}><Link to='/bookCollection'>Acervo</Link></Nav.Link>);
    }
    if (props.signUp) {
        nav.push(<Nav.Link key={'signUp'}><Link to='/signUp'>Cadastre-se</Link></Nav.Link>);
    }

    if (props.contoleLoan) {
        nav.push(<Nav.Link key={'loan'}><Link to='/dashboard'>Controle de Empréstimos</Link></Nav.Link>);
    }
    if (props.contoleLoan) {
        nav.push(<Nav.Link key={'loan'}><Link to='/bookDsh'>Controle de Livros</Link></Nav.Link>);
    }    if (props.contoleLoan) {
        nav.push(<Nav.Link key={'loan'}><Link to='/dashboard'>Controle de Funcionários</Link></Nav.Link>);
    }    if (props.contoleLoan) {
        nav.push(<Nav.Link key={'loan'}><Link to='/dashboard'>Controle de Reserva</Link></Nav.Link>);
    }
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