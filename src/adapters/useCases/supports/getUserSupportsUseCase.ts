import { CustomError } from 'config/CustomError';
import SupportRepository from 'repositories/implementations/SupportRepository';
import { singleton } from 'tsyringe';

@singleton()
export class GetUserSupportsUseCase {
  constructor(private supportRepository: SupportRepository) {}

  public async execute(userId: string): Promise<any[]> {
    const supportClaims = await this.supportRepository.getUserSupports(userId);

    if (!supportClaims) throw CustomError.notFound('No supports found');

    return supportClaims;
  }
}
