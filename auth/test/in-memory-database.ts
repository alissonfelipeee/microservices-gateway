import { AuthUserParams } from "../src/controllers/auth-user/protocols";
import { Credential } from "../src/models/Credential";

const credentials: Credential[] = [];

export class InMemoryRepository {
  private credentials: Credential[] = credentials;

  async createCredential(params: AuthUserParams): Promise<Credential> {
    const newCredential = { ...params, id: this.credentials.length + 1 };
    this.credentials.push(newCredential);
    return newCredential;
  }
}

export class InMemoryGetUserCredentialsByEmailRepository {
  private credentials: Credential[] = credentials;

  async getUserCredentialsByEmail(email: string): Promise<Credential | null> {
    const credential = this.credentials.find(
      (credential) => credential.email === email
    );
    return credential || null;
  }
}
