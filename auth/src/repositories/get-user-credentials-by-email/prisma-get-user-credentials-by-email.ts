import { prisma } from "../../database/prisma";
import { Credential } from "../../models/Credential";

export class PrismaGetUserCredentialsByEmailRepository {
  async getUserCredentialsByEmail(email: string): Promise<Credential | null> {
    return await prisma.credentials.findUnique({
      where: {
        email,
      },
    });
  }
}
