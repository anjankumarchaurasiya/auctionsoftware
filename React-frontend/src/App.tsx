import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Projects from './components/ProjectList';
import SignupForm from './components/SignupForm';
import ProtectedRoute from './components/ProtectedRoute'; 
import { AuthProvider } from './context/AuthContext';  

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route  path="/signup"  element={ <SignupForm /> }  />
                    <Route 
                        path="/projects" 
                        element={
                            <ProtectedRoute>
                                <Projects />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
