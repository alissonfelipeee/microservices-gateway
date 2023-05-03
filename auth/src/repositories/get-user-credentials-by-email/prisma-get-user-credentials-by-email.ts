import { prisma } from "../../database/prisma";
import { Credential } from "../../models/Credential";
import { IGetUserCredentialsByEmailRepository } from "../../services/auth-user/protocols";

export class PrismaGetUserCredentialsByEmailRepository
  implements IGetUserCredentialsByEmailRepository
{
  async getUserCredentialsByEmail(email: string): Promise<Credential | null> {
    return await prisma.credentials.findUnique({
      where: {
        email,
      },
    });
  }
}
