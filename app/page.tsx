"use client";

import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <h1>Netfilx clone</h1>

      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
