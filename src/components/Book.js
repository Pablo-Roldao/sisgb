import React from 'react';
import { Container, Image } from 'react-bootstrap';

import styles from './Book.module.css'

export default function Book(props) {

    let authors = JSON.stringify(props.authors);
    authors = authors.replace("[\"", "");
    authors = authors.replace("\"]", "");
    authors = authors.replaceAll("\",\"", ", ");
    

    return (
        <Container key={props.isbn} className={styles.portfoliowrap + ' p-2 m-2'}>
            <Image src={props.imgSrc} fluid className={styles.img} />
            <h5 className='fw-bold'>{props.title}</h5>
            <p>{authors}</p>
        </Container>
    );
}