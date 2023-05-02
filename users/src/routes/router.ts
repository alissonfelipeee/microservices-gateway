import { Router, Request, Response } from "express";
import { PrismaCreateUserRepository } from "../repositories/create-user/prisma-create-user";
import { PrismaGetUserByEmailRepository } from "../repositories/get-user-by-email/prisma-get-user-by-email";
import { CreateUserController } from "../controllers/create-user";
import { sendMessage } from "../kafka/producer";

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

    if (statusCode === 201) {
      await sendMessage("User created successfully", body.data);
    }

    res.status(statusCode).json(body);
  }
);
