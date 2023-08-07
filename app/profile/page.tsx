import { redirect } from "next/navigation";

import { getServerSession } from "next-auth/next";

import { option } from "../api/auth/[...nextauth]/option";

const Profile = async () => {
  const session = await getServerSession(option);
  if (!session) {
    redirect("/auth");
  }

  return <div>Profile</div>;
};

export default Profile;
