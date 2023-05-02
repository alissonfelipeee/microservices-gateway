import { prisma } from "../../database/prisma";
import { User } from "../../models/User";
import { IGetUserByEmailRepository } from "../../services/get-user-by-email/protocols";

export class PrismaGetUserByEmailRepository
  implements IGetUserByEmailRepository
{
  async getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
