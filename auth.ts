import { signInWithEmailAndPassword } from 'firebase/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authClient } from './firebase/client';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // redirect が起きるところで try catch を使うとエラーになる
        // https://bel-itigo.com/nextjs-redirect-not-working/

        const userCredential = await signInWithEmailAndPassword(
          authClient,
          email,
          password
        );
        if (!userCredential.user.uid) return null;
        return { id: userCredential.user.uid };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: ({ session, token }) => {
      session.user.id = token.id as string;
      return session;
    },
  },
  trustHost: true, // これなに ?
});
