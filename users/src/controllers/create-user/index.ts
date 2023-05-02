import { User } from "../../models/User";
import { IGetUserByEmailRepository } from "../../services/get-user-by-email/protocols";
import { generateHash } from "../../utils/bcrypt";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { badRequest, created, serverError } from "../utils";
import { ICreateUserRepository, createUserParams } from "./protocols";
import validator from "validator";

export class CreateUserController implements IController {
  constructor(
    private readonly createUserRepository: ICreateUserRepository,
    private readonly getUserByEmailRepository: IGetUserByEmailRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<createUserParams>
  ): Promise<HttpResponse<User | Object>> {
    try {
      const { body } = httpRequest;

      if (!body) {
        return badRequest("Missing body");
      }

      const requiredFields: string[] = ["name", "email", "password"];

      for (const field of requiredFields) {
        if (!body[field as keyof createUserParams]) {
          return badRequest(`Missing param: ${field}`);
        }
      }

      const emailIsValid = validator.isEmail(body.email);

      if (!emailIsValid) {
        return badRequest("Invalid email");
      }

      const userAlreadyExists =
        await this.getUserByEmailRepository.getUserByEmail(body.email);

      if (userAlreadyExists) {
        return badRequest("Email already in use");
      }

      const hashedPassword = await generateHash(body.password);

      const user = await this.createUserRepository.createUser({
        name: body.name,
        email: body.email,
        password: hashedPassword,
      });

      return created(user);
    } catch (error) {
      return serverError();
    }
  }
}
