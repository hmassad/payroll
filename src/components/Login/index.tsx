import { useFormik } from 'formik';
import { useState } from 'react';
import Image from 'next/image';

import { createSupabaseClient } from '../../../db';
import { FLAME_DOMAIN } from '../Register';

const factoryImg = '/assets/png/factory.png'

export const LoginForm = (): JSX.Element => {
  const supabase = createSupabaseClient();
  const [error, setError] = useState<null | string>(null);

  const formik = useFormik({
    initialValues: {
      user: '',
      password: ''
    },
    onSubmit: async (values) => {
      const { error, user } = await supabase.auth.signIn({
        email: values.user + FLAME_DOMAIN,
        password: values.password
      });
      if (error) return setError(error.message);
      if (user) return console.log(user);
    }
  });

  return (
    <div className="shadow-md p-6">
      <div className="my-5 text-4xl">
        <div className='flex justify-center mb-10'>
          <Image src={factoryImg} height={100} width={100} loading="lazy" />
        </div>
      </div>
      <form className="flex flex-col gap-5 justify-center" onSubmit={formik.handleSubmit}>
        <div className="flex flex-row gap-2 items-center">
          <input
            id="user"
            type="text"
            name="user"
            placeholder="handler"
            className="border border-gray-300 rounded-md p-2"
            onChange={formik.handleChange}
            value={formik.values.user}
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
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button className="bg-blue-500 p-5 rounded-lg text-white" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};
