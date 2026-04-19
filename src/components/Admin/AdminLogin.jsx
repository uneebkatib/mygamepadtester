'use client'

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${Theme.primarySoft}, ${Theme.background});
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoginCard = styled.div`
  background-color: ${Theme.backgroundLight};
  border-radius: 12px;
  box-shadow: ${Theme.shadowHeavy} 0 20px 40px;
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid ${Theme.borderLight};
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: ${Theme.primary};
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${Theme.textPrimary};
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid ${Theme.inputBorder};
  border-radius: 6px;
  font-size: 1rem;
  background-color: ${Theme.inputBackground};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${Theme.inputFocus};
    box-shadow: 0 0 0 3px ${Theme.glow};
  }
  
  &::placeholder {
    color: ${Theme.textMuted};
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, ${Theme.primary}, ${Theme.primaryHover});
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(218, 119, 86, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials
      if (username === 'uneebkatib' && password === 'Informbay@1') {
        // Store authentication token
        localStorage.setItem('adminAuth', JSON.stringify({
          username,
          timestamp: new Date().getTime()
        }));
        
        router.push('/katib/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <h1>Admin Panel</h1>
        </Logo>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </InputGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin;

