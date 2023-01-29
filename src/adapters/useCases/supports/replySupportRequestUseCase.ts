import { CustomError } from 'config/CustomError';
import { EStatus } from '../../../enums';
import { ISupportDocument } from 'models/ISupportModel';
import SupportRepository from 'repositories/implementations/SupportRepository';

export class ReplySupportRequestUseCase {
  constructor(private supportRepository: SupportRepository) {}

  public async execute(data: {
    supportId: string;
    feedId: string;
    requestStatus: EStatus;
  }): Promise<ISupportDocument> {
    const { supportId, feedId, requestStatus } = data;

    const repliedSupport = await this.supportRepository.replySupportRequest(
      supportId,
      feedId,
      requestStatus
    );

    if (!repliedSupport) throw CustomError.notFound('Support claim not found');

    return repliedSupport;
  }
}
