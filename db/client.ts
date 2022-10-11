import {
  createClient,
  SupabaseClient,
  ApiError,
  User,
  Session,
  PostgrestError
} from '@supabase/supabase-js';

import { PrismaClient, Prisma, User as PrismaUser } from '@prisma/client';

let supabase: SupabaseClient;
let prisma: PrismaClient;

const createSupabaseClient = (useServiceKey: boolean = false) => {
  if (supabase === undefined) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
    supabase = createClient(supabaseUrl, useServiceKey ? supabaseServiceKey : supabaseAnonKey, {
      autoRefreshToken: true,
      persistSession: false
    });
  }
  return supabase;
};

const createPrismaClient = () => {
  if (prisma === undefined) {
    prisma = new PrismaClient();
  }
  return prisma;
};



export { createSupabaseClient, SupabaseClient, createPrismaClient, PrismaClient, Prisma };
export type { ApiError, User, Session, PostgrestError, PrismaUser };
