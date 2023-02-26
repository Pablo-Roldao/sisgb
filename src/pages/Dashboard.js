import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import NavbarComponent from '../components/NavbarComponent';

export default function Dashboard() {

  return (
    <>
      <NavbarComponent dashboardBook={true} />
      <h1>Dashboard</h1>
      <Footer />
    </>
  )


}