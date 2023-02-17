import { CustomError } from 'config/CustomError';
import { EStatus } from '../../../enums';
import { ICasterDocument } from 'models/ICasterModel';
import { ObjectId } from 'mongodb';
import CasterRepository from 'repositories/implementations/CasterRepository';
import { singleton } from 'tsyringe';
import FeedRepository from 'repositories/implementations/FeedRepository';

@singleton()
export class ReplyCasterRequestUseCase {
  constructor(
    private casterRepository: CasterRepository,
    private feedRepository: FeedRepository
  ) {}

  public async execute(data: {
    casterId: string;
    feedId: string;
    requestStatus: EStatus;
  }): Promise<ICasterDocument> {
    const { casterId, feedId, requestStatus } = data;

    if (requestStatus === 'APPROVED') {
      const alreadyClaimed = await this.casterRepository.findPodcastCaster(
        new ObjectId(feedId)
      );

      if (!!alreadyClaimed?.length)
        throw CustomError.unprocess('Feed already claimed');
    }

    const repliedClaim = await this.casterRepository.replyCasterRequest(
      casterId,
      feedId,
      requestStatus
    );

    if (!repliedClaim) throw CustomError.notFound('Claim not found');

    if (requestStatus === 'APPROVED') {
      const feed = await this.feedRepository.findFeedById(feedId);

      if (!feed) throw CustomError.notFound('Claimed feed not found');

      feed.claimFeed({ casterId: repliedClaim._id });
    }

    return repliedClaim;
  }
}
