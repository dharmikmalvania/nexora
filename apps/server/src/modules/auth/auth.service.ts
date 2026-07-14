import { AuthRepository } from "./auth.repository.js";

export class AuthService {
  constructor(public readonly repository: AuthRepository = new AuthRepository()) {}
}