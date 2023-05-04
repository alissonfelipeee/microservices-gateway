import { HttpRequest, HttpResponse, IController } from "../protocols";
import { badRequest, ok, serverError, unauthorized } from "../utils";
import { IAuthUserRepository } from "./protocols";
import { AuthUserParams, AuthUserResponse } from "./protocols";

export class AuthUserController implements IController {
  constructor(private readonly authUserService: IAuthUserRepository) {}
  async handle(
    httpRequest: HttpRequest<AuthUserParams>
  ): Promise<HttpResponse<AuthUserResponse | Object>> {
    try {
      const { body } = httpRequest;

      if (!body) {
        return badRequest("Missing body");
      }

      const { email, password } = body;

      if (!email) return badRequest("Missing param: email");
      if (!password) return badRequest("Missing param: password");

      const auth = await this.authUserService.auth({ email, password });

      if (!auth) return unauthorized("Invalid credentials");

      return ok("User authenticated successfully", auth);
    } catch (error) {
      return serverError();
    }
  }
}
