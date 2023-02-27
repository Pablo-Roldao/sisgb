import React from 'react';
import { Container, Image } from 'react-bootstrap';

import styles from './Book.module.css'

export default function Book(props) {

    let authors = JSON.stringify(props.authors);
    authors = authors.replace("[\"", "");
    authors = authors.replace("\"]", "");
    authors = authors.replaceAll("\",\"", ", ");


    return (
        <Container key={props.isbn} className={styles.book}>
            <Image src={props.imgSrc} fluid />
            <h3><strong>{props.title}</strong></h3>
            <p>{authors}</p>
        </Container>
    );
}