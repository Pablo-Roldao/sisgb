import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import RequireAuth from './components/RequireAuth';

import About from './pages/public_pages/About';
import Home from './pages/public_pages/Home';
import SignUp from './pages/public_pages/SignUp';
import Unauthorized from './pages/public_pages/Unauthorized';

import AdminDashboard from './pages/admin_access/AdminDashboard';
import DashboardFunctionary from './pages/admin_access/DashboardFuncionary';
import RegisterFunctionary from './pages/admin_access/RegisterFuncionary';
import UpdateFunctionary from './pages/admin_access/UpdateFunctionary';

import DashboardBook from './pages/functionary_access/DashboardBook';
import DashboardLoan from './pages/functionary_access/DashboardLoan';
import DashboardReservation from './pages/functionary_access/DashboardReservation';
import DashboardUser from './pages/functionary_access/DashboardUser';
import FunctionaryDashboard from './pages/functionary_access/FunctionaryDashboard';
import RegisterBook from './pages/functionary_access/RegisterBook';
import RegisterLoan from './pages/functionary_access/RegisterLoan';
import RegisterReservation from './pages/functionary_access/RegisterReservation';
import RegisterUser from './pages/functionary_access/RegisterUser';
import UpdateBook from './pages/functionary_access/UpdateBook';
import UpdateLoan from './pages/functionary_access/UpdateLoan';
import UpdateReservation from './pages/functionary_access/UpdateReservation';
import UpdateUser from './pages/functionary_access/UpdateUser';

import LoansUser from './pages/user_access/LoansUser';
import Profile from './pages/user_access/Profile';
import ReservationsUser from './pages/user_access/ReservationsUser';
import UserDashboard from './pages/user_access/UserDashboard';



const ROLES = {
  'User': 2001,
  'Functionary': 1984,
  'Admin': 5150
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*rotas públicas*/}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        {/*rotas protegidas*/}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path='/adminDashboard' element={<AdminDashboard />} />

          <Route path='/dashboardFunctionary' element={<DashboardFunctionary />} />
          <Route path='/registerFunctionary' element={<RegisterFunctionary />} />
          <Route path='/updateFunctionary' element={<UpdateFunctionary />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Functionary]} />}>
          <Route path='/functionaryDashboard' element={<FunctionaryDashboard />} />

          <Route path='/dashboardBook' element={<DashboardBook />} />
          <Route path='/registerBook' element={<RegisterBook />} />
          <Route path='/updateBook' element={<UpdateBook />} />

          <Route path='/dashboardUser' element={<DashboardUser />} />
          <Route path='/registerUser' element={<RegisterUser />} />
          <Route path='/updateUser' element={<UpdateUser />} />

          <Route path='/dashboardLoan' element={<DashboardLoan />} />
          <Route path='/registerLoan' element={<RegisterLoan />} />
          <Route path='/updateLoan' element={<UpdateLoan />} />

          <Route path='/dashboardReservation' element={<DashboardReservation />} />
          <Route path='/registerReservation' element={<RegisterReservation />} />
          <Route path='/updateReservation' element={<UpdateReservation />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Functionary, ROLES.User]} />}>
          <Route path='/userDashboard' element={<UserDashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/reservationsUser' element={<ReservationsUser />} />
          <Route path='/loansUser' element={<LoansUser />} />
        </Route>


      </Route>
    </Routes>
  );
}

export default App;
