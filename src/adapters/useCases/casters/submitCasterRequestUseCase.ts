import { ObjectId } from 'mongodb';
import { CustomError } from 'config/CustomError';
import { ICasterDocument } from 'models/ICasterModel';
import CasterRepository from 'repositories/implementations/CasterRepository';
import UserRepository from 'repositories/implementations/UserRepository';
import { singleton } from 'tsyringe';

@singleton()
export class SubmitCasterRequestUseCase {
  constructor(
    private casterRepository: CasterRepository,
    private userRepository: UserRepository
  ) {}

  public async execute(data: {
    userId: string;
    feedId: string;
    proofUrl: string;
  }): Promise<ICasterDocument> {
    const { userId, feedId, proofUrl } = data;

    const alreadyClaimed = await this.casterRepository.findPodcastCaster(
      new ObjectId(feedId)
    );
    if (!!alreadyClaimed?.length)
      throw CustomError.unprocess('Feed already claimed');

    const newCasterClaim = await this.casterRepository.submitCasterRequest({
      userId: new ObjectId(userId),
      feedId: new ObjectId(feedId),
      proofUrl,
    });

    const user = await this.userRepository.findUserById(userId);
    user?.addCasterKey(newCasterClaim._id);

    return newCasterClaim;
  }
}
