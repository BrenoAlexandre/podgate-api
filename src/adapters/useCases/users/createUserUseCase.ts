import { singleton } from 'tsyringe';
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from 'adapters/controllers/users/DTOs';
import { CustomError } from 'config/CustomError';
import { validateEmail } from 'regex/emailValidation';
import UserRepository from 'repositories/implementations/UserRepository';
import { ICreateUserInput } from 'interfaces/UserUseCases';

@singleton()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  private validate({
    name,
    lastName,
    email,
    password,
    passwordConfirmation,
  }: ICreateUserInput) {
    const errors = [];

    if (!name || !lastName) errors.push('User must have a name and last name.');

    if (!email) errors.push(`User must have an email.`);
    if (!validateEmail(email)) errors.push('Invalid email format.');

    if (!password) errors.push(`Password Cannot be null.`);
    if (!passwordConfirmation)
      errors.push(`Password confirmation Cannot be null.`);
    if (password !== passwordConfirmation)
      errors.push(`User password doesn't match it's confirmation.`);

    if (errors.length > 0) {
      throw CustomError.badRequest('Invalid user data:', errors);
    }
  }

  public async execute(
    data: ICreateUserInput
  ): Promise<ICreateUserResponseDTO> {
    const { name, lastName, email, password } = data;

    this.validate(data);

    const userInput = {
      name,
      lastName,
      email,
      password,
    };

    const result = await this.userRepository.save(userInput);

    if (!result) {
      throw CustomError.badRequest('Unable to create user.');
    }

    return result;
  }
}
