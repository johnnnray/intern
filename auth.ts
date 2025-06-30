import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
            from: z.enum(['user', 'admin']), // ログイン画面の種別
          })
          .safeParse(credentials);
    
        if (!parsedCredentials.success) return null;
    
        const { email, password, from } = parsedCredentials.data;
    
        const user = await getUser(email);
        if (!user) return null;
    
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;
    
        //  ログイン画面が「admin」なのにroleが「user」→ 不許可
        if (from === 'admin' && user.role !== 'admin') return null;
    
        //  ログイン画面が「user」なのにroleが「admin」→ 不許可
        if (from === 'user' && user.role !== 'user') return null;
    
        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
    ],
});


