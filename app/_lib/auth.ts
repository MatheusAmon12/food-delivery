import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { db } from "./prisma";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id };
      return session;
    },
    async signIn({ user, account }) {
      const email = user.email ?? undefined;

      if (email) {
        const existingUser = await db.user.findUnique({ where: { email } });

        if (existingUser) {
          if (account) {
            const existingAccount = await db.account.findUnique({
              where: {
                provider_providerAccountId: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                },
              },
            });

            if (!existingAccount) {
              await db.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token ?? undefined,
                  refresh_token: account.refresh_token ?? undefined,
                  expires_at: account.expires_at ?? undefined,
                  token_type: account.token_type ?? undefined,
                  scope: account.scope ?? undefined,
                  id_token: account.id_token ?? undefined,
                  session_state: account.session_state ?? undefined,
                },
              });
            }
          }
        }
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
