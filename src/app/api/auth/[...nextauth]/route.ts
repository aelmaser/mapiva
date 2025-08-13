// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/lib/prisma";
import { log } from "console";


export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },  
        secure: true, // TLS portu için
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url }) {
      log("💌 Sending email to", identifier);
      log("🔗 Magic link:", url);
    },
    }),
  ],
  pages: {
  signIn: '/auth/signin', // ✅ custom signin sayfasını tanımlar
},
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
