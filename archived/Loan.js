import React from 'react';
import { Col, Container, Image, Row, Table } from 'react-bootstrap';

import styles from './Loan.module.css'

export default function Loan(props) {

    let authors = JSON.stringify(props.authors);
    authors = authors.replace("[\"", "");
    authors = authors.replace("\"]", "");
    authors = authors.replaceAll("\",\"", ", ");


    return (

        <Container key={props.userCpf}>
            <Row>
                <Col>
                    <h3><strong>{props.userCpf}</strong></h3>
                    <h3><strong>{props.bookIsbn}</strong></h3>
                    <h3><strong>{props.startDate}</strong></h3>
                    <h3><strong>{props.finishDate}</strong></h3>
                </Col>
            </Row>

        </Container>

    );
}