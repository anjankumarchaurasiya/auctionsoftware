// login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Card } from 'antd';
import { loginUser } from '../api/api';
import { useAuth } from '../context/AuthContext'; 

const LoginForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { login } = useAuth();  

    const handleLogin = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            const response = await loginUser(values.username, values.password);
            const { token, userId, username } = response.data;

 
            login(token, userId, username);

            message.success('Login successful!');
            navigate('/projects');
        } catch (error) {
            message.error('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card title="User Login" style={{ width: 400 }}>
                <Form form={form} onFinish={handleLogin} layout="vertical">
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <a href="/signup">Don't have an account? Register here</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginForm;
