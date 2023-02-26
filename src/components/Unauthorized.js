import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Container>
            <h1>Não autorizado</h1>
            <br />
            <p>Você não tem permissão para acessar a página requisitada.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Voltar</button>
            </div>
        </Container>
    );
}

export default Unauthorized;