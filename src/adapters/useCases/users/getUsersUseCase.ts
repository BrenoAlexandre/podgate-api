import { singleton } from 'tsyringe';
import UserRepository from '../../../services/implementations/userRepository';

@singleton()
class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute() {
    const users = await this.userRepository.getMany();

    if (!users) {
      throw new Error('No users found.');
    }

    return users;
  }
}

export default GetUsersUseCase;
