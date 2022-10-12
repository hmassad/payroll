import { GetServerSideProps } from 'next';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

import Image from 'next/image';

const factoryPath = '/public/assets/png/factory.png';

export const Confirm = () => {
  return (
    <div>
      <Image layout="fill" src={factoryPath} />
      <h1 className="text-xl text-primary font-bold">Confirm</h1>
      <p className="text-lg font-semibold">Check your email for a confirmation link.</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  authRequired: true,
  redirectTo: '/',
  async getServerSideProps(ctx) {
    return {
      props: {}
    };
  }
});
