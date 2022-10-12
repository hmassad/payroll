import { FormikProps, useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { createSupabaseClient, PrismaUser, SupabaseClient } from '../../../db';
import { Role } from '@prisma/client';
import { useRouter } from 'next/router';
import { routes } from '../../routes';
const factoryImg = '/assets/png/factory.png';

export const FLAME_DOMAIN = '@flamefactory.io';

const { CONFIRM } = routes;

export const Register = (): JSX.Element => {
  const supabase: SupabaseClient = createSupabaseClient();
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();
  interface RegisterValues {
    user: string;
    password: string;
  }

  const { handleSubmit, handleChange, values }: FormikProps<RegisterValues> = useFormik({
    initialValues: {
      user: '',
      password: ''
    },
    onSubmit: async (values: RegisterValues) => {
      // Auth handler
      const { error, user } = await supabase.auth.signUp(
        {
          email: values.user + FLAME_DOMAIN,
          password: values.password
        },
        {
          data: {
            role: Role.USER
          }
        }
      );
      if (error) return setError(error.message);
      if (user) return router.push(CONFIRM);
    }
  });

  return (
    <div className="shadow-md p-6">
      <div className="flex justify-center mb-10">
        <Image src={factoryImg} height={100} width={100} loading="lazy" />
      </div>

      <form className="flex flex-col gap-5 justify-center" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-2 items-center">
          <input
            id="user"
            type="text"
            name="user"
            placeholder="handler"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleChange}
            value={values.user}
          />
          <p>{FLAME_DOMAIN}</p>
        </div>
        <div>{error}</div>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          className="border border-gray-300 rounded-md p-2"
          onChange={handleChange}
          value={values.password}
        />
        <button className="bg-blue-500 p-5 rounded-lg text-white" type="submit">
          Sign up
        </button>
      </form>
      {/*  Already registered button to /login */}
      <div className="my-4">
        <Link href="/login">
          <a className="text-blue-500">Already registered?</a>
        </Link>
      </div>
    </div>
  );
};
