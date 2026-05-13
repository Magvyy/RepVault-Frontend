import HomePage from '@/pages/HomePage';
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from '@/pages/authenticate/RegisterPage';
import LoginPage from '@/pages/authenticate/LoginPage';
import CreateSessionPage from '@/pages/sessions/components/CreateSessionPage';
import { ThemeProvider } from "@/components/theme-provider"
import Layout from './Layout';
import SessionsPage from '@/pages/sessions/components/SessionsPage';
import SessionTemplatePage from '@/pages/sessions/components/SessionTemplatePage';
import { ContextProvider } from './ContextProvider';
import ActiveSessionPage from '@/pages/sessions/components/ActiveSessionPage';
import SessionPage from '@/pages/sessions/components/SessionPage';
import UserPage from '@/pages/users/components/UserPage';
import ProtectedRoute from './ProtectedRoute';

export default function App() {

    return (
        <ContextProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/users/:id" element={<UserPage />} />
                            <Route path="/sessions/:id" element={<SessionPage />} />

                            // Protected routes
                            <Route path="/sessions/templates/create" element={
                                <ProtectedRoute>
                                    <CreateSessionPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/sessions/templates" element={
                                <ProtectedRoute>
                                    <SessionsPage />
                                </ProtectedRoute>
                                } />
                            <Route path="/sessions/templates/:id" element={
                                <ProtectedRoute>
                                    <SessionTemplatePage />
                                </ProtectedRoute>
                                } />
                            <Route path="/active" element={
                                <ProtectedRoute>
                                    <ActiveSessionPage />
                                </ProtectedRoute>
                                } />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        </ContextProvider>
    )
}