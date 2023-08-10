import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
type Params = {
  params: {
    id: string;
  };
};
export async function GET(req: NextRequest, { params }: Params) {
  const id = params.id;

  try {
    if (!id) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    } else {
      const movies = await prismadb.movie.findMany({
        where: {
          id: id,
        },
      });
      return NextResponse.json(movies, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong on server" },
      { status: 500 }
    );
  }
}
