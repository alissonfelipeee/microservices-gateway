import { Router, Request, Response } from "express";
import { PrismaCreateUserRepository } from "../repositories/create-user/prisma-create-user";
import { PrismaGetUserByEmailRepository } from "../repositories/get-user-by-email/prisma-get-user-by-email";
import { CreateUserController } from "../controllers/create-user";

export const router = Router().post(
  "/create",
  async (req: Request, res: Response) => {
    const prismaCreateUserRepository = new PrismaCreateUserRepository();
    const prismaGetUserByEmailRepository = new PrismaGetUserByEmailRepository();
    const createUserController = new CreateUserController(
      prismaCreateUserRepository,
      prismaGetUserByEmailRepository
    );

    const { statusCode, body } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).json(body);
  }
);
