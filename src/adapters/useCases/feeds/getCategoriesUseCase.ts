import { singleton } from 'tsyringe';
import { CustomError } from 'config/CustomError';
import FeedRepository from 'repositories/implementations/FeedRepository';
import { getCategoriesResponseDTO } from 'adapters/controllers/feeds/DTOs';

@singleton()
export class GetCategoriesUseCase {
  constructor(private feedRepository: FeedRepository) {}

  public async execute(): Promise<getCategoriesResponseDTO[]> {
    const result = await this.feedRepository.fetchCategories();

    if (!result) {
      throw CustomError.badRequest('Unable to find category.');
    }

    return result;
  }
}
