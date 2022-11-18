import { singleton } from 'tsyringe';
import UserRepository from '../../../services/implementations/userRepository';
import { IDeleteUserRequestDTO } from '../../controllers/users/DTOs/deleteUserRequestDTO';

@singleton()
class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(data: IDeleteUserRequestDTO): Promise<void> {
    const { userId } = data;

    const result = await this.userRepository.delete(userId);

    if (!result) {
      throw new Error('User not found.');
    }
  }
}

export default DeleteUserUseCase;
