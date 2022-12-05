import { CustomError } from 'config/CustomError';
import { validateEmail } from 'regex/emailValidation';
import IUserRepository from 'repositories/IUserRepository';
import { singleton } from 'tsyringe';
import { IUpdateUserRequestDTO } from '../../controllers/users/DTOs';

@singleton()
export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  private validate(name: string, lastName: string, email: string) {
    const errors = [];

    if (!name || !lastName) errors.push('User must have a name and last name.');

    if (!email) errors.push('User must have an email.');
    if (!validateEmail(email)) errors.push('Invalid email format.');

    if (errors.length > 0) {
      throw CustomError.badRequest('Invalid user data:', errors);
    }
  }

  public async execute(data: IUpdateUserRequestDTO) {
    const { _id, name, lastName, email } = data;

    this.validate(name, lastName, email);

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
