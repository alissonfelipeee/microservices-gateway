import { IGetUserByEmailRepository } from "./protocols";

export class GetUserByEmailService {
  constructor(
    private readonly getUserByEmailRepository: IGetUserByEmailRepository
  ) {}
  async execute(email: string) {
    return await this.getUserByEmailRepository.getUserByEmail(email);
  }
}
