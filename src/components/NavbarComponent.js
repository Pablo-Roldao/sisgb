import React from 'react';
import { Container, Image, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NavbarComponent.module.css';

export default function NavbarComponent(props) {

    const navigate = useNavigate();

    const nav = [];

    if (props.about) { nav.push(<li key={'about'} className={'nav-item'}><Link className='nav-link' to='/about'>Sobre nós</Link></li>) };
    if (props.signUp) { nav.push(<li key={'SignUp'} className={'nav-item'}><Link className='nav-link' to='/signUp'>Cadastre-se</Link></li>); }

    if (props.adminDashboard) { nav.push(<li key={'adminDashboard'} className={'nav-item'}><Link to='/adminDashboard'>Dashboard</Link></li>); }
    if (props.dashboardFunctionary) { nav.push(<li key={'dashboardFunctionary'} className={'nav-item'}><Link to='/dashboardFunctionary'>Funcionários</Link></li>); }

    if (props.functionaryDashboard) { nav.push(<li key={'functionaryDashboard'} className={'nav-item'}><Link to='/functionaryDashboard'>Dashboard</Link></li>); }
    if (props.dashboardBook) { nav.push(<li key={'dashboardBook'} className={'nav-item'}><Link to='/dashboardBook'>Livros</Link></li>); }
    if (props.dashboardUser) { nav.push(<li key={'dashboardUser'} className={'nav-item'}><Link to='/dashboardUser'>Usuários</Link></li>); }
    if (props.dashboardLoan) { nav.push(<li key={'dashboardLoan'} className={'nav-item'}><Link to='/dashboardLoan'>Empréstimos</Link></li>); }
    if (props.dashboardReservation) { nav.push(<li key={'dashboardReservation'} className={'nav-item'}><Link to='/dashboardReservation'>Reservas</Link></li>); }

    if (props.userDashboard) { nav.push(<li key={'userDashboard'} className={'nav-item'}><Link to='/userDashboard'>Dashboard</Link></li>); }
    if (props.bookCollectionUser) { nav.push(<li key={'bookCollectionUser'} className={'nav-item'}><Link to='/bookCollectionUser'>Livros</Link></li>); }
    if (props.reservationsUser) { nav.push(<li key={'reservationsUser'} className={'nav-item'}><Link to='/reservationsUser'>Reservas</Link></li>); }
    if (props.loansUser) { nav.push(<li key={'loansUser'} className={'nav-item'}><Link to='/loansUser'>Empréstimos</Link></li>); }
    if (props.profile) { nav.push(<li key={'profile'} className={'nav-item'}><Link to='/profile' state={{ userCpf: props.userCpf }}>{props.profile}</Link></li>); }
    if (!props.logoutHide) { nav.push(<li key={'logout'} className={'nav-item'}><Link to='/'>Sair</Link></li>); }

    return (
        <nav className={'navbar navbar-expand-sm ' + styles.navbar}>
                <Link to='/' className={'navbar-brand ' + styles.navbar_brand}>
                    <Image fluid src='./logo192.png' width='192' height='192' className={styles.navbar_brand__image} />{' '}SisGB
                </Link>
                <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className={'collapse navbar-collapse + ' + styles.navbar__nav} id="navbarSupportedContent">
                    <ul className={'navbar-nav ' + styles.navbar__nav}>
                        {nav}
                    </ul>
                </div>
        </nav>
    )
}