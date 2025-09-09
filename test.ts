import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const res = await prisma.$queryRaw`SELECT 1+1 AS result`;
  console.log(res);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
