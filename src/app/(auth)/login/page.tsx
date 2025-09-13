'use client'

import { LoginForm } from '@/components/auth/LoginForm';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const handleLogin = (data: { email: string; password: string }) => {
  // Demo role detection based on credentials
  if (data.email === 'student@college.edu' && data.password === 'password123') {
    router.push('/student-dashboard');
  } else if (data.email === 'lead@college.edu' && data.password === 'password123') {
    router.push('/community-dashboard');
  } else {
    // Default fallback, could show error or redirect to events
    router.push('/events');
  }
};

  return <LoginForm onLogin={handleLogin} />;
}
