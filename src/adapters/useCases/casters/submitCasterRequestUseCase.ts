import { singleton } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { CustomError } from 'config/CustomError';
import { ICasterDocument } from 'models/ICasterModel';
import CasterRepository from 'repositories/implementations/CasterRepository';

@singleton()
export class SubmitCasterRequestUseCase {
  constructor(private casterRepository: CasterRepository) {}

  public async execute(data: {
    userId: string;
    feedId: string;
    proofUrl: string;
  }): Promise<ICasterDocument> {
    const { userId, feedId, proofUrl } = data;

    const alreadyClaimed = await this.casterRepository.findPodcastCaster(
      new ObjectId(feedId)
    );
    if (alreadyClaimed) throw CustomError.unprocess('Feed already claimed');

    const newCasterClaim = await this.casterRepository.submitCasterRequest({
      userId: new ObjectId(userId),
      feedId: new ObjectId(feedId),
      proofUrl,
    });

    return newCasterClaim;
  }
}
