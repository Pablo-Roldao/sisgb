import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import styles from './Footer.module.css';

export default class Footer extends Component {
    render() {
        return (
            <Container id='footer' className={styles.footer + ' text-center p-3'} >
                <p>&copy; Todos os direitos reservados a <strong>Paulo Cardoso, Pablo Santos e Maria Pontes.</strong></p>
            </Container>
        );
    }
}