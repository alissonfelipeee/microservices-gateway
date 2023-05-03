import { CreateUserController } from "../src/controllers/create-user";
import {
  InMemoryGetUserByEmailRepository,
  InMemoryRepository,
} from "./in-memory-database";
import { userExample } from "./utils";

const inMemoryCreateUserRepository = new InMemoryRepository();
const inMemoryGetUserByEmailRepository = new InMemoryGetUserByEmailRepository();
const createUserController = new CreateUserController(
  inMemoryCreateUserRepository,
  inMemoryGetUserByEmailRepository
);

describe("Create User", () => {
  it("should create a new user", async () => {
    const { statusCode, body } = await createUserController.handle({
      body: userExample,
    });

    expect(body.data).toHaveProperty("id");
    expect(statusCode).toBe(201);
  });

  it("should not create a new user because missing body", async () => {
    const { statusCode, body } = await createUserController.handle({});

    expect(body.message).toBe("Missing body");
    expect(statusCode).toBe(400);
  });

  it("should not create a new user because missing param or invalid param", async () => {
    const { statusCode, body } = await createUserController.handle({
      body: { ...userExample, name: "" },
    });

    expect(body.message).toBe("Missing param: name");
    expect(statusCode).toBe(400);
  });

  it("should not create a new user because email is invalid", async () => {
    const { statusCode, body } = await createUserController.handle({
      body: { ...userExample, email: "johndoe" },
    });

    expect(body.message).toBe("Invalid email");
    expect(statusCode).toBe(400);
  });

  it("should not create a new user because email already exists", async () => {
    const { statusCode, body } = await createUserController.handle({
      body: userExample,
    });

    expect(body.message).toBe("Email already in use");
    expect(statusCode).toBe(400);
  });

  it("should not create a new user because ocurred internal error", async () => {
    jest
      .spyOn(inMemoryCreateUserRepository, "createUser")
      .mockImplementationOnce(() => {
        throw new Error("Error");
      });

    const { statusCode, body } = await createUserController.handle({
      body: { ...userExample, email: "jonhdoe2@gmail.com" },
    });

    expect(body.message).toBe("Internal server error");
    expect(statusCode).toBe(500);
  });
});
