import { Router, Request, Response } from "express";
import { PrismaGetUserCredentialsByEmailRepository } from "../repositories/get-user-credentials-by-email/prisma-get-user-credentials-by-email";
import { AuthUserService } from "../services/auth-user";
import { AuthUserController } from "../controllers/auth-user";

export const authRouter = Router().post(
  "/",
  async (req: Request, res: Response) => {
    const prismaGetUserCredentialsByEmailRepository =
      new PrismaGetUserCredentialsByEmailRepository();
    const authUserService = new AuthUserService(
      prismaGetUserCredentialsByEmailRepository
    );
    const authUserController = new AuthUserController(authUserService);

    const { body, statusCode } = await authUserController.handle({
      body: req.body,
    });

    res.status(statusCode).json(body);
  }
);
