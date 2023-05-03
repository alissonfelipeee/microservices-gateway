import { prisma } from "../../database/prisma";

export class PrismaCreateUserCredentialsRepository {
  async createUserCredentials(email: string, password: string) {
    return await prisma.credentials.create({
      data: {
        email,
        password,
      },
    });
  }
}
