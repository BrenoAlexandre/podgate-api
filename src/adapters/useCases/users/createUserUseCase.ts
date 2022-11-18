import { singleton } from 'tsyringe';
import UserRepository from '../../../services/implementations/userRepository';
import { ICreateUserRequestDTO } from '../../controllers/users/DTOs/createUserRequestDTO';
import { ICreateUserResponseDTO } from '../../controllers/users/DTOs/createUserResponseDTO';

@singleton()
class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(
    data: ICreateUserRequestDTO
  ): Promise<ICreateUserResponseDTO> {
    const result = await this.userRepository.create(data);

    if (!result) {
      throw new Error('Unable to create user.');
    }

    return result;
  }
}

export default CreateUserUseCase;
