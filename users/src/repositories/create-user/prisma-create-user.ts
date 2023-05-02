import {
  ICreateUserRepository,
  createUserParams,
} from "../../controllers/create-user/protocols";
import { prisma } from "../../database/prisma";
import { User } from "../../models/User";

export class PrismaCreateUserRepository implements ICreateUserRepository {
  async createUser({ name, email, password }: createUserParams): Promise<User> {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
