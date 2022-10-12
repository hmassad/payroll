import { useUser, UserProvider as SupabaseUserProvider } from '@supabase/auth-helpers-react';
import { UserState } from '@supabase/auth-helpers-shared';
import { User as SupabaseUser } from '@supabase/supabase-js';

const constants = {
  UNDEFINED: 'undefined',
  STRING: 'string'
};

const { UNDEFINED, STRING } = constants;

export const UserProvider: (props: any) => JSX.Element = SupabaseUserProvider;

export const useSession: () => UserState = useUser;

export interface User extends SupabaseUser {}

export const hasRole = (user: User | null, role: string | string[]) => {
  if (!user) return false;
  return typeof role !== UNDEFINED && user && user.user_metadata.role
    ? user.user_metadata.role === role
    : false;
};
