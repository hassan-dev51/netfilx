import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exits" },
        { status: 422 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Can'nt post request" },
      { status: 500 }
    );
  }
}
