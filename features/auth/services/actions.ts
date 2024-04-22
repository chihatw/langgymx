'use server';
import { signIn } from '@/auth';

export const signInAction = async (email: string, password: string) => {
  await signIn('credentials', { email, password });
};
