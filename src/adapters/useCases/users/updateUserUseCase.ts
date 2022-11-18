import { singleton } from 'tsyringe';
import UserRepository from '../../../services/implementations/userRepository';
import { IUpdateUserRequestDTO } from '../../controllers/users/DTOs/updateUserRequestDTO';

@singleton()
class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(data: IUpdateUserRequestDTO) {
    const { name, email, _id } = data;

    const updatedUser = await this.userRepository.update(_id, {
      name,
      email,
    });

    if (!updatedUser) {
      throw new Error('User not found.');
    }

    return updatedUser;
  }
}

export default UpdateUserUseCase;
