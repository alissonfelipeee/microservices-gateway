import { User } from "../../models/User";

export interface createUserParams {
  name: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: createUserParams): Promise<User>;
}
