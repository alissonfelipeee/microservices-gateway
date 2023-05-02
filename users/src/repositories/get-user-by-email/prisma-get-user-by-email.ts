import { prisma } from "../../database/prisma";
import { User } from "../../models/User";

export class PrismaGetUserByEmailRepository {
  async getUserByEmail(email: string): Promise<User> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
