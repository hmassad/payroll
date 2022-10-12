import {  withPageAuth } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { Dashboard } from '../src/screens';
import { createSupabaseClient, SupabaseClient } from '../db';

const supabase: SupabaseClient = createSupabaseClient();

export default function () {
  return <Dashboard />;
}

export const getServerSideProps: GetServerSideProps = withPageAuth({
  authRequired: true,
  redirectTo: '/',
  async getServerSideProps(ctx) {

    const ledger = await supabase.from('ledger').select('*');

    return {
      props: {
        ledger,
     }
    };
  }
});
