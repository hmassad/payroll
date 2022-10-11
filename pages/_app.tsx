import '../styles/globals.css';
import Head from 'next/head';

import type { AppProps } from 'next/app';

import { UserProvider } from '../src/hooks';
import { createSupabaseClient, SupabaseClient } from '../db';

const supabase: SupabaseClient = createSupabaseClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Payroll</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="description" content="Payroll's mission is to provide " />
      </Head>
      <UserProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
