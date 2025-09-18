import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthLayout
      title="Join Eventure"
      subtitle="Create your account and start connecting with your campus community"
    >
      <SignupForm />
    </AuthLayout>
  );
}
