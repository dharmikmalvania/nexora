import { AuthService } from "./auth.service.js";

export class AuthController {
  constructor(public readonly service: AuthService = new AuthService()) {}
}