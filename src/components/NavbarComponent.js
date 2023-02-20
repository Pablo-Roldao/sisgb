import React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import styles from '../pages/Home.module.css'

export default function NavbarComponent(props) {
    
    const nav = [];
    if (props.about) {
        nav.push(<Nav.Link  href='/about'>Sobre nós</Nav.Link>);
    }
    if (props.bookCollection) {
        nav.push(<Nav.Link  href='/bookCollection'>Acervo</Nav.Link>);
    }
    if (props.signUp) {
        nav.push(<Nav.Link  href='/signUp'>Cadastre-se</Nav.Link>);
    }

    return (
        <Navbar id='navbar' className={styles.nav}>
            <Container >
                <Navbar.Brand href='/'  >
                    <Image fluid src='https://icon-library.com/images/icon-for-books/icon-for-books-1.jpg' width='100px' />{' '}SisGB
                </Navbar.Brand>
                <Nav>
                    {nav}
                </Nav>
            </Container>
        </Navbar>
    )
}