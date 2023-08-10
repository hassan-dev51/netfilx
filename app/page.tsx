import { redirect } from "next/navigation";

import { getServerSession } from "next-auth/next";

import { option } from "./api/auth/[...nextauth]/option";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import FavouriteList from "@/components/FavouriteList";

export default async function Home() {
  const session = await getServerSession(option);
  if (!session) {
    redirect("/auth");
  }

  return (
    <div>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending" />
        <FavouriteList title="My List" />
      </div>
    </div>
  );
}
