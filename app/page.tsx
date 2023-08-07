import { redirect } from "next/navigation";

import { getServerSession } from "next-auth/next";

import { option } from "./api/auth/[...nextauth]/option";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";

export default async function Home() {
  const session = await getServerSession(option);
  if (!session) {
    redirect("/auth");
  }

  return (
    <div>
      <Navbar />
      <Billboard />
    </div>
  );
}
