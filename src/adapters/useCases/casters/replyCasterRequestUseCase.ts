import { CustomError } from 'config/CustomError';
import { EStatus } from 'enums';
import { ICasterDocument } from 'models/ICasterModel';
import { ObjectId } from 'mongodb';
import CasterRepository from 'repositories/implementations/CasterRepository';

export class ReplyCasterRequestUseCase {
  constructor(private casterRepository: CasterRepository) {}

  public async execute(data: {
    casterId: string;
    feedId: string;
    requestStatus: EStatus;
  }): Promise<ICasterDocument> {
    const { casterId, feedId, requestStatus } = data;

    const alreadyClaimed = await this.casterRepository.findPodcastCaster(
      new ObjectId(feedId)
    );
    if (alreadyClaimed) throw CustomError.unprocess('Feed already claimed');

    const repliedClaim = await this.casterRepository.replyCasterRequest(
      casterId,
      feedId,
      requestStatus
    );

    if (!repliedClaim) throw CustomError.notFound('Claim not found');

    return repliedClaim;
  }
}
