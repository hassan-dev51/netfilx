import { PrismaClient } from "@prisma/client";

//we declear the type of prismadb here
declare global {
  namespace globalThis {
    var prismadb: PrismaClient;
  }
}
