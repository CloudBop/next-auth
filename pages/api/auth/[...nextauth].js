import NextAuth from "next-auth";
import Providers from "next-auth/providers";
// import { isTargetLikeServerless } from "next/dist/next-server/server/config";
import { veryifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
// config next auth
export default NextAuth({
  session: {
    //
    jwt: true
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase(credentials);

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email
        });

        if (!user) {
          client.close();
          throw new Error("No user found.");
        }

        const isValid = await veryifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in.");
        }
        client.close();
        return { email: user.email };
      }
    })
  ]
});
