import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/lib/prismadb";
export async function GET(req: NextRequest) {
  try {
    const randomMovie = await prismadb.movie.count();

    const randomIndex = Math.floor(Math.random() * randomMovie);
    const pickOneMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(pickOneMovie[0], { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error in fetching random movie" },
      { status: 500 }
    );
  }
}
