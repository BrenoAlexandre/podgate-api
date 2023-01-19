import { singleton } from 'tsyringe';
import { CustomError } from 'config/CustomError';
import FeedRepository from 'repositories/implementations/FeedRepository';
import { IFeedDocument } from 'models/IFeedModel';
import { Schema } from 'mongoose';

@singleton()
export class ChangeFeedPrivacyByIdUseCase {
  constructor(private feedRepository: FeedRepository) {}

  private validate = ({
    feed,
    userId,
  }: {
    feed: IFeedDocument;
    userId: Schema.Types.ObjectId;
  }) => {
    const errors = [];

    if (feed?.casterId !== userId)
      errors.push(`You don't have the permission required to do this.`);

    if (errors.length > 0) {
      throw CustomError.authorization('Change feed privacy error:', errors);
    }
  };

  public async execute(data: {
    feedId: string;
    isPrivate: boolean;
    userId: Schema.Types.ObjectId;
  }): Promise<IFeedDocument> {
    const { feedId, isPrivate, userId } = data;

    const feed = await this.feedRepository.findFeedById(feedId);
    if (!feed) throw CustomError.badRequest('Unable to find feed.');

    this.validate({ feed, userId });

    return await feed.updatePrivacy(isPrivate);
  }
}
