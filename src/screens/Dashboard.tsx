import { Role } from '@prisma/client';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';

import { hasRole, useSession } from '../hooks';
import { routes } from '../routes';

export const Dashboard = () => {
  const { user } = useSession();
  const router: NextRouter = useRouter();
  const { HOME } = routes;

  useEffect(() => {
    if (!user) {
      router.push(HOME);
    }
  }, [user]);

  const canSeeAdminDashboard = hasRole(user, Role.ADMIN);
  const isContractor = hasRole(user, Role.USER);

  // Dashboard component
  // We will switch here between the admin and contractor dashboard
  // Example
  // if (canSeeAdminDashboard) {
  //   return <AdminDashboard />;
  // } else if (isContractor) {
  //   return <ContractorDashboard />;
  // } else {
  //   return <div>Not authorized</div>;

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};
