"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCallback, useMemo } from "react";
import { BsCheck } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";

type Props = {
  movieId: string;
};

const FavoriteButton = ({ movieId }: Props) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });
  const user = session?.user?.email;

  // const isFavorite = useMemo(() => {
  //   //@ts-ignore
  //   const list = user?.favoriteIds || "";
  //   return list.includes(movieId);
  // }, []);

  // const Icon = isFavorite ? BsCheck : HiPlus;

  const AddToFav = useCallback(async () => {
    const res = await fetch("/api/favoritelist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId: movieId, email: user }),
    });
    if (!res.ok) {
      console.log("can not add movie to favourite list");
    } else if (res.status === 409) {
      alert("Movies already exists in Favorite List");
    } else {
      alert("Can'not add movie");
    }
    const result = await res.json();
    return result;
  }, []);

  return (
    <div
      onClick={AddToFav}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <HiPlus className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
