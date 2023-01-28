import { CustomError } from 'config/CustomError';
import { ISupportDocument } from 'models/ISupportModel';
import SupportRepository from 'repositories/implementations/SupportRepository';

export class GetSupportRequestsUseCase {
  constructor(private supportRepository: SupportRepository) {}

  public async execute(feedId: string): Promise<ISupportDocument[]> {
    const supportClaims = await this.supportRepository.getSupportRequests(
      feedId
    );

    if (!supportClaims) throw CustomError.notFound('No claims found');

    return supportClaims;
  }
}
