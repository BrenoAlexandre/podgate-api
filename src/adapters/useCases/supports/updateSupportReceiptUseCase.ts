import { CustomError } from 'config/CustomError';
import { ISupportDocument } from 'models/ISupportModel';
import SupportRepository from 'repositories/implementations/SupportRepository';
import { singleton } from 'tsyringe';

@singleton()
export class UpdateSupportReceiptUseCase {
  constructor(private supportRepository: SupportRepository) {}

  public async execute(data: {
    feedId: string;
    supportId: string;
    newReceiptUrl: string;
  }): Promise<ISupportDocument> {
    const { feedId, supportId, newReceiptUrl } = data;

    const support = await this.supportRepository.updateSupportReceipt(
      feedId,
      supportId,
      newReceiptUrl
    );

    if (!support) throw CustomError.notFound('Support list not found');

    return support;
  }
}
