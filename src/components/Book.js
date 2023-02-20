import React from 'react';
import { Container, Image } from 'react-bootstrap';

export default function Book(props) {
    return (
        <Container>
            <Image src={props.imgSrc} fluid className='rounded'/>
            <h4>{props.title}</h4>
            <p>{props.authors}</p>
        </Container>
    );
}