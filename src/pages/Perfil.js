import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';  
import NavbarComponent from '../components/NavbarComponent';

import styles from './Perfil.module.css'
import Footer from '../components/Footer';


export default function Profile() {

  const USER_URL = '/user';
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
    <section  className={styles.welcome}>
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