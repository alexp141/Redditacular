import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { generateUsername } from "unique-username-generator";
export async function GET(req: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error("Error creating user");
  }

  const existingUser = await prisma.user.findFirst({ where: { id: user.id } });

  if (existingUser) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const newUser = await prisma.user.create({
    data: {
      id: user.id,
      username: user.username ?? generateUsername("", 2, 19),
      email: user.email ?? "",
      firstName: user.given_name ?? "",
      lastName: user.family_name ?? "",
    },
  });

  return NextResponse.redirect(new URL("/", req.url));
}
