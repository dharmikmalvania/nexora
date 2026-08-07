import { hashPassword } from "../../lib/hash";
import { userRepository } from "../../repositories/user.repository";

interface RegisterUserInput {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export class AuthService {
  async register(data: RegisterUserInput) {
    const emailExists = await userRepository.findByEmail(data.email);

    if (emailExists) {
      throw new Error("Email already exists");
    }

    const usernameExists = await userRepository.findByUsername(data.username);

    if (usernameExists) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await userRepository.create({
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}

export const authService = new AuthService();