import {
  AuthUserParams,
  AuthUserResponse,
} from "../../controllers/auth-user/protocols";
import { compareHash } from "../../utils/bcrypt";
import { generateToken } from "../../utils/generateToken";
import { IGetUserCredentialsByEmailRepository } from "./protocols";

export class AuthUserService {
  constructor(
    private readonly getUserCredentialsByEmailRepository: IGetUserCredentialsByEmailRepository
  ) {}

  async auth(params: AuthUserParams): Promise<AuthUserResponse | null> {
    const { email, password } = params;

    const user =
      await this.getUserCredentialsByEmailRepository.getUserCredentialsByEmail(
        email
      );

    if (!user) {
      return null;
    }

    const comparePassword = await compareHash(password, user.password);

    if (!comparePassword) {
      return null;
    }

    const token = generateToken(user.id, user.email);

    return {
      email: user.email,
      token,
    };
  }
}
