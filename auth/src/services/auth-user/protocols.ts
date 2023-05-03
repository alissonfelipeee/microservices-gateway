import { Credential } from "../../models/Credential";

export interface IGetUserCredentialsByEmailRepository {
  getUserCredentialsByEmail(email: string): Promise<Credential | null>;
}
