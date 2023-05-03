import { createUserParams } from "../src/controllers/create-user/protocols";
import { User } from "../src/models/User";

const users: User[] = [];

export class InMemoryRepository {
  private users: User[] = users;

  async createUser(user: createUserParams): Promise<User> {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }
}

export class InMemoryGetUserByEmailRepository {
  private users: User[] = users;

  async getUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }
}
