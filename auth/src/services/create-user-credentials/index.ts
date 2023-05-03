import { Credential } from "../../models/Credential";
import { ICreateUserCredentialsRepository } from "./protocols";

export class CreateUserCredentialsService {
  constructor(
    private readonly createUserCredentialsRepository: ICreateUserCredentialsRepository
  ) {}

  async execute(email: string, password: string): Promise<Credential> {
    try {
      const userCredentials =
        await this.createUserCredentialsRepository.createUserCredentials(
          email,
          password
        );

      return userCredentials;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
