import { CustomError } from 'config/CustomError';
import { ISupportDocument } from 'models/ISupportModel';
import SupportRepository from 'repositories/implementations/SupportRepository';
import { singleton } from 'tsyringe';

@singleton()
export class RevokeSupportStatusUseCase {
  constructor(private supportRepository: SupportRepository) {}

  public async execute({
    feedId,
    supportId,
  }: {
    supportId: string;
    feedId: string;
  }): Promise<ISupportDocument> {
    const revokedSupport = await this.supportRepository.revokeSupport(
      supportId,
      feedId
    );

    if (!revokedSupport) throw CustomError.notFound('Support list not found');

    return revokedSupport;
  }
}
