"use client";

import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";

import { HiChevronDown } from "react-icons/hi2";
import { BsPlayBtn } from "react-icons/bs";
import { MdRemove } from "react-icons/md";
import { useRouter } from "next/navigation";
import FavoriteButton from "./FavoriteButton";

type Props = {
  title: string;
};
const FavouriteList = ({ title }: Props) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  const user = session?.user?.email;
  const RemoveMovie = async (movieId: string) => {
    const res = await fetch(`/api/favoritelist?email=${user}&id=${movieId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("movie Deleted succuessfully");
    } else {
      alert("can'nt delete movie");
    }
  };

  useEffect(() => {
    const getList = async () => {
      if (user) {
        const res = await fetch(`/api/favoritelist?user=${user}`);
        if (!res.ok) {
          console.log("Failed to fetch list ");
        }
        const data = await res.json();
        setFavoriteMovies(data);
      }
    };
    getList();
  }, []);
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {favoriteMovies.length ? (
            favoriteMovies.map((data: any) => (
              <div
                className="group bg-zinc-900 col-span relative h-[12vw]"
                key={data.id}
              >
                <img
                  // onClick={redirectToWatch}
                  src={data.thumbnailUrl}
                  alt="Movie"
                  draggable={false}
                  className="
                            cursor-pointer
                            object-cover
                            transition
                            duration
                            shadow-xl
                            rounded-md
                            group-hover:opacity-90
                            sm:group-hover:opacity-0
                            delay-300
                            w-full
                            h-[12vw]
                          "
                />
                <div
                  className="
          opacity-0
          absolute
          top-0
          transition
          duration-200
          z-10
          invisible
          sm:visible
          delay-300
          w-full
          scale-0
          group-hover:scale-110
          group-hover:-translate-y-[6vw]
          group-hover:translate-x-[2vw]
          group-hover:opacity-100
          "
                >
                  <img
                    //   onClick={redirectToWatch}
                    src={data.thumbnailUrl}
                    alt="Movie"
                    draggable={false}
                    className="
      cursor-pointer
      object-cover
      transition
      duration
      shadow-xl
      rounded-t-md
      w-full
      h-[12vw]
    "
                  />
                  <div
                    className="
      z-10
      bg-zinc-800
      p-2
      lg:p-4
      absolute
      w-full
      transition
      shadow-md
      rounded-b-md
      "
                  >
                    <div className="flex flex-row items-center gap-3">
                      <div
                        onClick={() => router.push(`/watch/${data.id}`)}
                        className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                      >
                        <BsPlayBtn className="text-black w-4 lg:w-6" />
                      </div>
                      <div
                        onClick={() => RemoveMovie(data.id)}
                        className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
                      >
                        <MdRemove className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
                      </div>
                      <div
                        //   onClick={() => openModal(data?.id)}
                        className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
                      >
                        <HiChevronDown className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
                      </div>
                    </div>
                    <p className="text-green-400 font-semibold mt-4">
                      New <span className="text-white">2023</span>
                    </p>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                      <p className="text-white text-[10px] lg:text-sm">
                        {data.duration}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
                      <p>{data.genre}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>Checking for your Favourite List</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouriteList;
