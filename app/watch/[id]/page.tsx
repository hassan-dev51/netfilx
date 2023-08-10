"use client";
import { useState, useEffect } from "react";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const WatchMovie = ({ params }: Props) => {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const getMovie = async () => {
      const res = await fetch(`/api/movies/${params.id}`);
      if (!res.ok) {
        console.log("Can not fetch movie");
      }
      const result = await res.json();
      setData(result);
      return result;
    };
    getMovie();
  }, []);

  return (
    <>
      {data.map((video: any) => (
        <div className="h-screen w-screen bg-black">
          <div key={video.id}>
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70 ">
              <AiOutlineArrowLeft
                onClick={() => router.push("/")}
                className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
              />
              <p className="text-white text-1xl md:text-3xl font-bold">
                <span className="font-light">Watching:</span> {video?.title}
              </p>
            </nav>

            <video
              className="h-full w-full"
              autoPlay
              controls
              src={video.videoUrl}
            ></video>
          </div>
        </div>
      ))}
    </>
  );
};

export default WatchMovie;
