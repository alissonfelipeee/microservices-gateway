import { PrismaGetUserByEmailRepository } from "./repositories/get-user-by-email/prisma-get-user-by-email";
import { GetUserByEmailService } from "./services/get-user-by-email/index";
import { PrismaCreateUserRepository } from "./repositories/create-user/prisma-create-user";
import express from "express";
import { config } from "dotenv";
import { CreateUserController } from "./controllers/create-user";

config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/users/create", async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
