import { singleton } from 'tsyringe';
import SupportRepository from 'repositories/implementations/SupportRepository';
import { ISupportDocument } from 'models/ISupportModel';
import { ObjectId } from 'mongodb';
import UserRepository from 'repositories/implementations/UserRepository';
import { CustomError } from 'config/CustomError';

@singleton()
export class SubmitSupportRequestUseCase {
  constructor(
    private supportRepository: SupportRepository,
    private userRepository: UserRepository
  ) {}

  public async execute(data: {
    userId: string;
    feedId: string;
    receiptUrl: string;
  }): Promise<ISupportDocument> {
    const { userId, feedId, receiptUrl } = data;

    const newSupportClaim = await this.supportRepository.submitSupportRequest(
      userId,
      new ObjectId(feedId),
      receiptUrl
    );

    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw CustomError.badRequest('Unable to find user');
    }

    if (!user.supportsId) {
      user.addSupportsKey(newSupportClaim._id);
    }

    return newSupportClaim;
  }
}
