import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({
    req,
  });

  if (!session) {
    throw new Error("You are not signed in");
  }
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};
export default serverAuth;
