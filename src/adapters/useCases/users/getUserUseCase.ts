import { singleton } from 'tsyringe';
import {
  IGetUserRequestDTO,
  IGetUserResponseDTO,
} from 'adapters/controllers/users/DTOs';
import UserRepository from 'repositories/implementations/UserRepository';
import { CustomError } from 'config/CustomError';

@singleton()
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    userId,
  }: IGetUserRequestDTO): Promise<IGetUserResponseDTO> {
    const result = await this.userRepository.findUserById(userId);

    if (!result) {
      throw CustomError.badRequest('User not found.');
    }

    return result;
  }
}
