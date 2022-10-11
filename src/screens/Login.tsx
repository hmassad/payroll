import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FLAME_DOMAIN } from '../components/Register';

import { useSession } from '../../src/hooks';
import routes from '../../src/routes';
import { LoginForm } from '../components/Login';

export const Login = () => {
  const { user, isLoading } = useSession();
  const router = useRouter();

  const { DASHBOARD } = routes;

  useEffect(() => {
    if (!isLoading && user && user.email?.endsWith(FLAME_DOMAIN)) {
      router.push(DASHBOARD);
    }
  }, [user]);

  return (
    <div className="container w-full flex flex-col justify-center items-center h-screen">
      <LoginForm />
    </div>
  );
};
