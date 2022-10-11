import { FormikProps, useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { createSupabaseClient, PrismaUser, SupabaseClient } from '../../../db';
// import { saveUser } from '../../services';

const factoryImg = '/assets/png/factory.png'

export const FLAME_DOMAIN = '@flamefactory.io';

export const Register = (): JSX.Element => {
  const supabase: SupabaseClient = createSupabaseClient();
  const [error, setError] = useState<null | string>(null);

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
    //   const payload: PrismaUser = {
    //     // We can find a better way of doing this
    //     id: Math.floor(Math.random() * 1000000),
    //     email: values.user + FLAME_DOMAIN,
    //     username: values.user,
    //     // role: Role.USER,
    //     // created_at: new Date(),
    //     // updated_at: new Date()
    //   };
      // Auth handler
      const { error, user } = await supabase.auth.signUp(
        {
          email: values.user + FLAME_DOMAIN,
          password: values.password
        },
        {
          data: {
            // role: Role.USER,
          }
        }
      );
      if (error) return setError(error.message);
      // DB handler
    //   if (user) return await saveUser(payload);
    }
  });

  return (
    <div className="shadow-md p-6">
      <div className='flex justify-center mb-10'>
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
      <div className='my-4'>
        <Link href='/login'>
          <a className="text-blue-500">Already registered?</a>
        </Link>
      </div>
    </div>
  );
};
