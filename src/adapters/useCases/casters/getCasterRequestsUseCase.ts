import { CustomError } from 'config/CustomError';
import { ICasterDocument } from 'models/ICasterModel';
import CasterRepository from 'repositories/implementations/CasterRepository';
import { singleton } from 'tsyringe';

@singleton()
export class GetCasterRequestsUseCase {
  constructor(private casterRepository: CasterRepository) {}

  public async execute(): Promise<ICasterDocument[]> {
    const casterClaims = await this.casterRepository.getCasterRequests();

    if (!casterClaims)
      throw CustomError.notFound('Unable to find caster claims');

    return casterClaims;
  }
}
