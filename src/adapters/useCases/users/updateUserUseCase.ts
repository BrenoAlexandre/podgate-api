import { singleton } from 'tsyringe';
import { CustomError } from 'config/CustomError';
import { validateEmail } from 'regex/emailValidation';
import UserRepository from 'repositories/implementations/UserRepository';
import { IUpdateUserInput } from '../../../interfaces/UserUseCases';

@singleton()
export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  private validate(email: string) {
    const errors = [];

    if (email && !validateEmail(email)) errors.push('Invalid email format.');

    if (errors.length > 0) {
      throw CustomError.badRequest('Invalid user data:', errors);
    }
  }

  public async execute(data: IUpdateUserInput) {
    const { _id, name, lastName, email } = data;

    if (email) this.validate(email);

    const updatedUser = await this.userRepository.updateUserById(_id, {
      name,
      lastName,
      email,
    });

    if (!updatedUser) {
      throw CustomError.badRequest('User not found.');
    }

    return updatedUser;
  }
}
