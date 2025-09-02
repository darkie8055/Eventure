import { SignupForm } from '@/components/SignupForm';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (data: any, role: 'student' | 'community_lead') => {
    // Here you would typically register with your backend
    console.log('Signup data:', { ...data, role });
    
    // For demo purposes, redirect to events page
    navigate('/events');
  };

  return <SignupForm onSignup={handleSignup} />;
}