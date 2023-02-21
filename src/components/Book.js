import React from 'react';
import { Container, Image } from 'react-bootstrap';

import styles from './Book.module.css'

export default function Book(props) {

    let authors = JSON.stringify(props.authors);
    authors = authors.replace("[\"", "");
    authors = authors.replace("\"]", "");
    authors = authors.replaceAll("\",\"", ", ");
    

    return (

        <Container key={props.isbn} className={styles.portfoliowrap}>
            <Image src={props.imgSrc} fluid className={styles.img} />
            <h4 className={styles.h4}>{props.title}</h4>
            <p>{authors}</p>
        </Container>
    );
}