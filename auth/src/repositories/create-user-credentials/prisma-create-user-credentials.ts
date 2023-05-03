import { prisma } from "../../database/prisma";
import { ICreateUserCredentialsRepository } from "../../services/create-user-credentials/protocols";

export class PrismaCreateUserCredentialsRepository
  implements ICreateUserCredentialsRepository
{
  async createUserCredentials(email: string, password: string) {
    return await prisma.credentials.create({
      data: {
        email,
        password,
      },
    });
  }
}
