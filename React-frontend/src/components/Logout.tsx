// logout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { message, Button } from 'antd'; 

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); 
        message.success('You have successfully logged out.'); 
        navigate('/');  
    };

    return (
        <Button type="primary" onClick={handleLogout}  >
            Logout
        </Button>
    );
};

export default Logout;
