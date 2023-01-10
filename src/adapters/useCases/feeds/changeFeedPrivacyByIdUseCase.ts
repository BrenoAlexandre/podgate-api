import { singleton } from 'tsyringe';
import { CustomError } from 'config/CustomError';
import FeedRepository from 'repositories/implementations/FeedRepository';
import { IFeedDocument } from 'models/IFeedModel';

@singleton()
export class ChangeFeedPrivacyByIdUseCase {
  constructor(private feedRepository: FeedRepository) {}

  public async execute(data: { feedId: string }): Promise<IFeedDocument> {
    const { feedId } = data;

    //! change privacy
    const result = await this.feedRepository.findFeedById(feedId);

    if (!result) {
      throw CustomError.badRequest('Unable to find feed.');
    }

    return result;
  }
}
