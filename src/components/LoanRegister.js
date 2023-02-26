import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Footer from "./Footer";
import NavbarComponent from "./NavbarComponent";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import styles from './LoanRegister.module.css';

const LOAN_URL = '/loan';

const LoanRegister = () => {

    const axiosPrivate = useAxiosPrivate();

    const { register, handleSubmit } = useForm();

    const [isbn, setIsbn] = useState('');
    const [cpf, setCpf] = useState('');

    const isbnRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [isbn, cpf]);

    const onSubmit = async (data) => {
        const { finishDate } = data;

        const dateObject = new Date();
        const today = dateObject.toISOString().split('T')[0];

        try {
            const response = axiosPrivate.post(LOAN_URL,
                JSON.stringify({
                    isbn,
                    cpf,
                    startDate: today,
                    finishDate
                }));
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg("Sem resposta do servidor!");
            } else if (err?.response?.status === 409) {
                setErrMsg("Livro ocupado!");
            } else if (err?.response?.status === 423) {
                setErrMsg("Número de empréstimos/reservas já atingiu o máximo permitido!");
            } else {
                setErrMsg("Falha no registro! " + err);
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <NavbarComponent dashboard={true} />
            <Container>
                <h2>Registrar empréstimo</h2>
                <p ref={errRef} className={errMsg ? styles.err_msg : styles.offscreen} aria-live="assertive">{errMsg}</p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>ISBN do livro</Form.Label>
                        <Form.Control type='text' ref={isbnRef} name='isbn' placeholder='Insira o ISBN do livro...'
                            {...register("isbn")} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>CPF do usuário</Form.Label>
                        <Form.Control type='text' name='cpf' placeholder='Insira o CPF do usuário...'
                            {...register("cpf")} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data de término</Form.Label>
                        <Form.Control type='date' name='finishDate' placeholder='Insira a data de término...'
                            {...register("finishDate")} required />
                    </Form.Group>
                    <Row>
                        <Col sm>
                            <Link to='/loanDashboard'>
                                <Button>Cancelar</Button>
                            </Link>
                        </Col>
                        <Col sm>
                            <Button type='submit'>Registrar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Footer />
        </>
    )
}

export default LoanRegister