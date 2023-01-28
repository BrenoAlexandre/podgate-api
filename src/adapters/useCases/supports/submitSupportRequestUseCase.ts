import { singleton } from 'tsyringe';
import SupportRepository from 'repositories/implementations/SupportRepository';
import { ISupportDocument } from 'models/ISupportModel';

@singleton()
export class SubmitSupportRequestUseCase {
  constructor(private supportRepository: SupportRepository) {}

  public async execute(data: {
    userId: string;
    feedId: string;
    receiptUrl: string;
  }): Promise<ISupportDocument> {
    const { userId, feedId, receiptUrl } = data;

    const newSupportClaim = await this.supportRepository.submitSupportRequest(
      userId,
      feedId,
      receiptUrl
    );

    return newSupportClaim;
  }
}
