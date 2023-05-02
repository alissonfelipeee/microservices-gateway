import { prisma } from "../../database/prisma";
import { User } from "../../models/User";

export class PrismaCreateUserRepository {
  async createUser({ name, email, password }: User): Promise<User> {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
