import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";

import { option } from "../api/auth/[...nextauth]/option";

const Profile = async () => {
  const session = await getServerSession(option);
  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&#39;s watching? {session.user?.name}
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <Link href="/">
            <Image
              src={session?.user?.image || "/images/default-blue.png"}
              alt={session?.user?.name || ""}
              width={300}
              height={300}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
