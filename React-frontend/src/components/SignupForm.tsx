import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Card } from 'antd';
import { signUp } from '../api/api';
import { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext'; 

const SignupForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { login } = useAuth(); 

    const handleSignup = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            const response = await signUp(values.username, values.password);
            console.log('response',response);
            if (response.status === 201) {
                const { token, userId, username } = response.data;
                login(token, userId,username);  
                message.success(`Signup successful! Welcome ${username}.`);
                navigate('/projects'); 
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    message.error('User already exists. Please try a different username.');
                } else {
                    message.error('Signup failed. Please check your details.');
                }
            } else {
                message.error('Signup failed due to an unknown error.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-form-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card title="User Signup" style={{ width: 400 }}>
                <Form form={form} onFinish={handleSignup} layout="vertical">
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Sign Up
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <a href="/">Already have an account? Login here</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default SignupForm;
