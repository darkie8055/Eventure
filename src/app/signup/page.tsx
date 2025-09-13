'use client'

import { SignupForm } from '@/components/SignupForm';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  const handleSignup = (data: any, role: 'student' | 'community_lead') => {
    // Here you would typically register with your backend
    console.log('Signup data:', { ...data, role });
    
    // For demo purposes, redirect to events page
    router.push('/events');
  };

  return <SignupForm onSignup={handleSignup} />;
}