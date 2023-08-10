import { NextRequest, NextResponse } from "next/server";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const userName = searchParams.get("user");

  try {
    const userData = await prismadb.user.findUnique({
      where: {
        email: userName || "",
      },
    });

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: userData?.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoriteMovies, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went Wrong in Fetching favourite movie list",
    });
  }
}
export async function POST(req: NextRequest) {
  const { movieId, email } = await req.json();
  try {
    const existingId = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (existingId) {
      const user = await prismadb.user.update({
        where: {
          email: email,
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Movie already Exits" },
        { status: 409 }
      );
    }
  } catch (error) {
    console.log(error, "favorite list post request error");
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("email");
  const movieId = searchParams.get("id");

  try {
    const userData = await prismadb.user.findUnique({
      where: {
        email: userEmail || "",
      },
    });

    if (!userData) {
      throw new Error("User not found");
    }

    const updatedList = userData.favoriteIds.filter((id) => id !== movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: userEmail || "",
      },
      data: {
        favoriteIds: updatedList,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error, "Error in deleting favorite movie");
    return NextResponse.json(
      { message: "Cannot remove favorite movie" },
      { status: 500 }
    );
  }
}
