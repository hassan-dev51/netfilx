import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    console.log(email, password, name);

    if (email === null) throw new Error("invalid email");
    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
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
        name,
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    console.log(newUser);
    return NextResponse.json({ newUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Can'nt post request", error },
      { status: 500 }
    );
  }
}
