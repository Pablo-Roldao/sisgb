import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import BookCollection from './pages/BookCollection';
import Unauthorized from './components/Unauthorized';

import RequireAuth from './components/RequireAuth';

import Profile from './pages/Perfil';

import Dashboard from './pages/Dashboard';
import DashboardBook from "./components/DashboardBook";
import RegisterBook from "./components/RegisterBook";
import UpdateBook from "./components/UpdateBook";

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
        <Route path='/signup' element={<SignUp />} />
        <Route path='/bookCollection' element={<BookCollection />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        {/*rotas protegidas*/}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Functionary]} />}>
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/dashboardBook' element={<DashboardBook />} />
          <Route path='/registerBook' element={<RegisterBook />} />
          <Route path='/updateBook' element={<UpdateBook />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
