'use client'

import { LoginForm } from '@/components/LoginForm';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const handleLogin = (data: { email: string; password: string }) => {
    // Here you would typically authenticate with your backend
    console.log('Login data:', data);
    
    // For demo purposes, redirect to events page
    router.push('/events');
  };

  return <LoginForm onLogin={handleLogin} />;
}