import { singleton } from 'tsyringe';
import UserRepository from '../../../services/implementations/userRepository';
import { IGetUserRequestDTO } from '../../controllers/users/DTOs/getUserRequestDTO';
import { IGetUserResponseDTO } from '../../controllers/users/DTOs/getUserResponseDTO';

@singleton()
class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    userId,
  }: IGetUserRequestDTO): Promise<IGetUserResponseDTO> {
    const result = await this.userRepository.getOne(userId);

    if (!result) {
      throw new Error('User not found.');
    }

    return result;
  }
}

export default GetUserUseCase;
