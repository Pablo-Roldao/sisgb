import React from 'react';
import { Container, Image, Table } from 'react-bootstrap';

import styles from './Loan.module.css'

export default function Loan(props) {

    let authors = JSON.stringify(props.authors);
    authors = authors.replace("[\"", "");
    authors = authors.replace("\"]", "");
    authors = authors.replaceAll("\",\"", ", ");
    

    return (

        <Container key={props.isbn}>
            <Table>
    <tbody>
        <tr>
                <td>{props.id}</td>
                <td>{props.isbn}</td>
                <td>{props.cpf}</td>
        </tr>
    </tbody>
            </Table>
        </Container>
    );
}