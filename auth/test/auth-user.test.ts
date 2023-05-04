import bcrypt from "bcrypt";
import {
  InMemoryGetUserCredentialsByEmailRepository,
  InMemoryRepository,
} from "./in-memory-database";
import { AuthUserService } from "../src/services/auth-user";
import { AuthUserController } from "../src/controllers/auth-user";
import { AuthUserParams } from "../src/controllers/auth-user/protocols";

const inMemoryRepository = new InMemoryRepository();
const inMemoryGetUserCredentialsByEmailRepository =
  new InMemoryGetUserCredentialsByEmailRepository();

const authUserService = new AuthUserService(
  inMemoryGetUserCredentialsByEmailRepository
);
const authUserController = new AuthUserController(authUserService);

const credential = {
  email: "johndoe@gmail.com",
  password: "123456",
};

describe("Auth User", () => {
  beforeAll(async () => {
    const salt = await bcrypt.genSalt(10);

    await inMemoryRepository.createCredential({
      email: credential.email,
      password: await bcrypt.hash(credential.password, salt),
    });
  });

  it("should auth user", async () => {
    const { body, statusCode } = await authUserController.handle({
      body: credential,
    });

    expect(body.message).toBe("User authenticated successfully");
    expect(statusCode).toBe(200);
  });

  it("should not auth user because body is missing", async () => {
    const { body, statusCode } = await authUserController.handle({});

    expect(body.message).toBe("Missing body");
    expect(statusCode).toBe(400);
  });

  it("should not auth user because email is missing", async () => {
    const { body, statusCode } = await authUserController.handle({
      body: {
        password: credential.password,
      } as AuthUserParams,
    });

    expect(body.message).toBe("Missing param: email");
    expect(statusCode).toBe(400);
  });

  it("should not auth user because password is missing", async () => {
    const { body, statusCode } = await authUserController.handle({
      body: {
        email: credential.email,
      } as AuthUserParams,
    });

    expect(body.message).toBe("Missing param: password");
    expect(statusCode).toBe(400);
  });

  it("should not auth user because credentials are invalid", async () => {
    const { body, statusCode } = await authUserController.handle({
      body: {
        email: "johndoe2@gmail.com",
        password: credential.password,
      },
    });

    expect(body.message).toBe("Invalid credentials");
    expect(statusCode).toBe(401);
  });

  it("should not auth user because password is incorrect", async () => {
    const { body, statusCode } = await authUserController.handle({
      body: {
        email: credential.email,
        password: "1234567",
      },
    });

    expect(body.message).toBe("Invalid credentials");
    expect(statusCode).toBe(401);
  });

  it("should not auth user because ocurred an internal error", async () => {
    jest
      .spyOn(
        inMemoryGetUserCredentialsByEmailRepository,
        "getUserCredentialsByEmail"
      )
      .mockImplementationOnce(() => {
        throw new Error("Internal server error");
      });
    const { body, statusCode } = await authUserController.handle({
      body: credential,
    });

    expect(body.message).toBe("Internal server error");
    expect(statusCode).toBe(500);
  });
});
