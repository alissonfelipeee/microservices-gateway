import {
  AuthUserParams,
  AuthUserResponse,
} from "../../controllers/auth-user/protocols";
import { Credential } from "../../models/Credential";

export interface IAuthUserRepository {
  auth(params: AuthUserParams): Promise<AuthUserResponse | null>;
}

export interface IGetUserCredentialsByEmailRepository {
  getUserCredentialsByEmail(email: string): Promise<Credential | null>;
}
