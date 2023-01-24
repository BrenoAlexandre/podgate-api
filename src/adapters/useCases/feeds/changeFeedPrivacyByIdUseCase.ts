import { singleton } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { CustomError } from 'config/CustomError';
import FeedRepository from 'repositories/implementations/FeedRepository';
import { IFeedDocument } from 'models/IFeedModel';

@singleton()
export class ChangeFeedPrivacyByIdUseCase {
  constructor(private feedRepository: FeedRepository) {}

  public async execute(data: {
    feedId: string;
    userId: string;
    isPrivate: boolean;
  }): Promise<IFeedDocument> {
    const { feedId, isPrivate, userId } = data;

    const feed = await this.feedRepository.changeFeedPrivacy(
      feedId,
      new ObjectId(userId),
      isPrivate
    );
    if (!feed) throw CustomError.badRequest('Unable to find feed.');

    return await feed.updatePrivacy(isPrivate);
  }
}
