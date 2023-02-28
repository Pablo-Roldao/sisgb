import {
  MDBCard, MDBCardBody, MDBCardText, MDBCol,
  MDBContainer,
  MDBRow
} from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponent';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Footer from '../../components/Footer';
import styles from './Profile.module.css';

const USER_URL = '/user/get-by-cpf';

export default function Profile() {

  const [user, setUser] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosPrivate.post(USER_URL,
          JSON.stringify({
            "cpf": location.state?.userCpf
          })
        );
        setUser(response.data);
      } catch (err) {
        navigate('/', { state: { from: location }, replace: true });
      }
    }
    getUser();
  }, []);

  return (
    <>
      <NavbarComponent 
        userDashboard={true}
        reservationsUser={true}
        loansUser={true}
      />
      <section className={styles.profile}>
        <h1>Perfil</h1>
        <MDBContainer>
          <MDBRow>

            <MDBCol lg="12">
              <MDBCard className={styles.card}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="6">
                      <MDBCardText>Nome</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                      <MDBCardText className="text-muted"> {user.name}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="6">
                      <MDBCardText>CPF</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                      <MDBCardText className="text-muted"> {user.cpf}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="6">
                      <MDBCardText>E-mail</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                      <MDBCardText className="text-muted"> {user.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="6">
                      <MDBCardText>Data de nascimento</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                      <MDBCardText className="text-muted"> {user?.birthDate?.split('T')[0]}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="6">
                      <MDBCardText>Endereço</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                      <MDBCardText className="text-muted"> {user.addres}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="6">
                      <MDBCardText>Reservas/Empréstimos em andamento</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                      <MDBCardText className="text-muted">{user.currentReservationsLoansQuantity}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

            </MDBCol>
          </MDBRow>
        </MDBContainer>



      </section>
      <Footer />
    </>

  );
}