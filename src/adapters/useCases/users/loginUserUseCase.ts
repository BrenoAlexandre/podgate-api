import { singleton } from 'tsyringe';
import { ILoginUserRequestDTO } from 'adapters/controllers/users/DTOs';
import { CustomError } from 'config/CustomError';
import { validateEmail } from 'regex/emailValidation';
import UserRepository from 'repositories/implementations/UserRepository';
import { ILoginInput, IUserDocument } from 'models/IUserModel';
import { signJwt } from 'services/jwt';

@singleton()
export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  private validate(email: string, password: string) {
    const errors = [];

    if (!email) errors.push(`User must have an email.`);
    if (!validateEmail(email)) errors.push('Invalid email format.');
    if (!password) errors.push(`Password cannot be null.`);

    if (errors.length > 0) {
      throw CustomError.badRequest('Invalid user data:', errors);
    }
  }

  public async execute(data: ILoginUserRequestDTO): Promise<string> {
    const { email, password } = data;

    this.validate(email, password);

    const userInput: ILoginInput = {
      email,
      password,
    };

    const result = await this.userRepository.loginUser(userInput);

    if (!result) {
      throw CustomError.authorization('Invalid login.');
    }

    delete result.password;

    const authorization = signJwt(result.toObject(), { expiresIn: 15000 });

    return authorization;
  }
}
