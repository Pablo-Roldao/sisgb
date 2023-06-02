import React, { useRef, useState } from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import styles from './Book.module.css';

const RESERVATION_URL = '/reservation';

export default function Book(props) {

    let authors = JSON.stringify(props.book?.authors);
    authors = authors?.replace("\"", "");
    authors = authors?.replace("\"", "");

    const axiosPrivate = useAxiosPrivate();

    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    async function reserveBook(bookIsbn, userCpf) {
        try {
            await axiosPrivate.post(RESERVATION_URL,
                JSON.stringify({
                    "bookIsbn": bookIsbn,
                    "userCpf": userCpf
                }));
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg("Sem resposta do servidor!");
            } else if (err?.response?.status === 409) {
                setErrMsg("Livro ocupado!");
            } else {
                console.log(err);
                setErrMsg("Falha no registro! " + err);
            }
            errRef.current.focus();
        }
    }

    return (
        <Container key={props.book.isbn} className={styles.book}>
            <Image src={props.book.imgSrc} fluid className={styles.book__img} />
            <h2 className={styles.book__title}>{props.book.title}</h2>
            <p className={styles.book__authors}>{authors}</p>
            {success ? (
                <p className={styles.success}>Livro reservado com sucesso!</p>
            ) : (
                <div className={'text-center ' + styles.book__button_area}>
                    <Button
                        className={styles.book__reserve_button}
                        onClick={() => reserveBook(props.book.isbn, props.user?.cpf)}
                        disabled={props.book?.state !== 'free' || props.user?.currentReservationsLoansQuantity >= 3 ? true : false}
                    >
                        Reservar
                    </Button>
                </div>

            )
            }
        </Container >
    );
}