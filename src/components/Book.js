import React from 'react';
import { Container, Image } from 'react-bootstrap';

export default function Book(props) {

    let authors = JSON.stringify(props.authors);
    authors = authors.replace("[\"", "");
    authors = authors.replace("\"]", "");
    authors = authors.replaceAll("\",\"", ", ");
    

    return (
        <Container key={props.isbn}>
            <Image src={props.imgSrc} fluid className='rounded'/>
            <h4>{props.title}</h4>
            <p>{authors}</p>
        </Container>
    );
}