import { redirect } from "next/navigation";

import { getServerSession } from "next-auth/next";

import { option } from "./api/auth/[...nextauth]/option";

export default async function Home() {
  const session = await getServerSession(option);
  if (!session) {
    redirect("/auth");
  }

  return (
    <div>
      <h1>Netfilx clone</h1>
      <p>Welcom Mr {session?.user?.name}</p>
      <p>Your Email Mr {session?.user?.email}</p>
    </div>
  );
}
