import { singleton } from 'tsyringe';
import { CustomError } from 'config/CustomError';
import FeedRepository from 'repositories/implementations/FeedRepository';
import { IFeedDocument } from 'models/IFeedModel';

@singleton()
export class ChangeFeedPrivacyByIdUseCase {
  constructor(private feedRepository: FeedRepository) {}

  public async execute(data: {
    feedId: string;
    isPrivate: boolean;
  }): Promise<IFeedDocument> {
    const { feedId, isPrivate } = data;

    const result = await this.feedRepository.changeFeedPrivacy(
      feedId,
      isPrivate
    );

    if (!result) {
      throw CustomError.badRequest('Unable to find feed.');
    }

    return result;
  }
}
