import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;  
    login: (token: string, userId: number, username: string) => void;  
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [username, setUsername] = useState<string | null>(null); 
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');  
        console.log('Checking token in local storage:', token);  
         
        if (token) {
            console.log('User authenticated');
            setIsAuthenticated(true);  
            setUsername(storedUsername);  
        } else {
            setIsAuthenticated(false);  
            setUsername(null);  
        }
    }, []);

    useEffect(() => {
        console.log('Authentication state changed to:', isAuthenticated);
    }, [isAuthenticated]);

    const login = (token: string, userId: number, username: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId.toString());
        localStorage.setItem('username', username); 
        setIsAuthenticated(true); 
        setUsername(username); 
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');  
        setIsAuthenticated(false);  
        setUsername(null);  
        console.log('User logged out'); 
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    console.log('AuthContext',AuthContext);
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
