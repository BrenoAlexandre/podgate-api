import { CustomError } from 'config/CustomError';
import IUserRepository from 'repositories/IUserRepository';
import { singleton } from 'tsyringe';
import { IDeleteUserRequestDTO } from '../../controllers/users/DTOs';

@singleton()
export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(data: IDeleteUserRequestDTO): Promise<void> {
    const { userId } = data;

    const result = await this.userRepository.deleteUserById(userId);

    if (!result) {
      throw CustomError.badRequest('User not found.');
    }
  }
}
