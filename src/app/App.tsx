import HomePage from '@/pages/HomePage';
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '@/features/navbar/components/NavBar';
import RegisterPage from '@/pages/authenticate/RegisterPage';
import LoginPage from '@/pages/authenticate/LoginPage';
import CreateSessionPage from '@/pages/sessions/components/CreateSessionPage';

export default function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/sessions/create" element={<CreateSessionPage />} />
      </Routes>
    </BrowserRouter>
  )
}