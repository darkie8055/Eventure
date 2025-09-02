import { LoginForm } from '@/components/LoginForm';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (data: { email: string; password: string }) => {
    // Here you would typically authenticate with your backend
    console.log('Login data:', data);
    
    // For demo purposes, redirect to events page
    navigate('/events');
  };

  return <LoginForm onLogin={handleLogin} />;
}