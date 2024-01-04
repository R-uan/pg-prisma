import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const ContactRepository = prisma.contact;
export { ContactRepository };
