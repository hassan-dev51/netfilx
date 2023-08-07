"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated" && !session) {
      router.push("/auth");
    }
  }, [status, session, router]);

  return (
    <div>
      <h1>Netfilx clone</h1>
      {!session && (
        <div>
          <Link href="/auth">Please sign in to continue</Link>
        </div>
      )}{" "}
      <button onClick={() => signOut()}> {session && <h1>Sign Out</h1>}</button>
    </div>
  );
}
