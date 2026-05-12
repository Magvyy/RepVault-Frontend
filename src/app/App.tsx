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
import ContextProvider from './ContextProvider';
import ActiveSessionPage from '@/pages/sessions/components/ActiveSessionPage';
import SessionPage from '@/pages/sessions/components/SessionPage';
import UserPage from '@/pages/users/components/UserPage';

export default function App() {

  return (
    <ContextProvider>
        <Layout>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <div className="w-full h-full overflow-auto scrollbar-hide">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/sessions/templates/create" element={<CreateSessionPage />} />
                            <Route path="/sessions/templates" element={<SessionsPage />} />
                            <Route path="/sessions/:id" element={<SessionPage />} />
                            <Route path="/sessions/templates/:id" element={<SessionTemplatePage />} />
                            <Route path="/active" element={<ActiveSessionPage />} />
                            <Route path="/users/:id" element={<UserPage />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </Layout>
    </ContextProvider>
  )
}