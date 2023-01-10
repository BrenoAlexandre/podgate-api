import { singleton } from 'tsyringe';
import { CustomError } from 'config/CustomError';
import FeedRepository from 'repositories/implementations/FeedRepository';
import { IFeedDocument } from 'models/IFeedModel';

@singleton()
export class GetFeedsByCategoryUseCase {
  constructor(private feedRepository: FeedRepository) {}

  public async execute(data: { category: string }): Promise<IFeedDocument[]> {
    const { category } = data;

    const result = await this.feedRepository.fetchFeedsByCategory(category);

    if (!result) {
      throw CustomError.badRequest('Unable to find category.');
    }

    return result;
  }
}
