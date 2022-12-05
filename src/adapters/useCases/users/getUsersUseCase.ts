import { singleton } from 'tsyringe';
import { CustomError } from 'config/CustomError';
import UserRepository from 'repositories/implementations/UserRepository';
import { IUserDocument } from 'models/IUserModel';

@singleton()
export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(): Promise<IUserDocument[]> {
    const result = await this.userRepository.findUsers();

    if (!result) {
      throw CustomError.badRequest('Users not found.');
    }

    return result;
  }
}
