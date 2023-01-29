import { singleton } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { CustomError } from 'config/CustomError';
import FeedRepository from 'repositories/implementations/FeedRepository';
import { IFeedDocument } from 'models/IFeedModel';

@singleton()
export class UpdatePrivateFeedUseCase {
  constructor(private feedRepository: FeedRepository) {}

  public async execute(data: {
    feedId: string;
    attachTo: string;
    userId: string;
    isPrivate: boolean;
  }): Promise<IFeedDocument> {
    const { feedId, attachTo, userId, isPrivate } = data;

    const feed = await this.feedRepository.claimFeed(
      feedId,
      new ObjectId(attachTo),
      new ObjectId(userId),
      isPrivate
    );
    if (!feed) throw CustomError.badRequest('Unable to find feed.');

    return feed;
  }
}
