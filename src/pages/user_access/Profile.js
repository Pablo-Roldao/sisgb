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

const USER_URL = '/user';

export default function Profile() {

  const [user, setUser] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(USER_URL);
        setUser(response.data);
      } catch (err) {
        navigate('/', { state: { from: location }, replace: true });
      }
    }
    getUser();
  }, []);

  const userName = user.map((user) => {
    return (
      <h6>{user.name}</h6>
    );
  })
  const userMail = user.map((user) => {
    return (
      <h6>{user.email}</h6>
    );
  })
  const userCpf = user.map((user) => {
    return (
      <h6>{user.cpf}</h6>
    );
  })



  return (
    <>
      <NavbarComponent />
      <section className={styles.welcome}>
        <h1 className='text-center text-white p-4'> Perfil</h1>
        <MDBContainer className="py-5">



          <MDBRow>

            <MDBCol lg="12">
              <MDBCard className={styles.card}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted"> {userName}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userMail}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Cpf</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userCpf}</MDBCardText>
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