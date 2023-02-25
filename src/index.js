import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import BookCollection from './pages/BookCollection';
import Dashboard from './pages/Dashboard';
import './index.css';
import Profile from './pages/Perfil';
import BookCollectionDsh from './pages/BookCollectionDsh';
import { AuthProvider } from './current/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/bookCollection' element={<BookCollection />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/BookDsh' element={<BookCollectionDsh />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);