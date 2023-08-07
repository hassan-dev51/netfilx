"use client";
import { useEffect, useState } from "react";

const Billboard = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const getMovie = async () => {
      try {
        const url = "/api/randommovie";
        const res = await fetch(url);
        if (!res.ok) {
          console.log("can'not fetch movies");
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log("error in bilborad");
      }
    };
    getMovie();
  }, []);

  return (
    <div className="relative h-[56vw]">
      <video
        src={data?.videoUrl}
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
      ></video>
    </div>
  );
};

export default Billboard;
