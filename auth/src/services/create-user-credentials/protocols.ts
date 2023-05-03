import { Credential } from "../../models/Credential";

export interface ICreateUserCredentialsRepository {
  createUserCredentials(email: string, password: string): Promise<Credential>;
}
