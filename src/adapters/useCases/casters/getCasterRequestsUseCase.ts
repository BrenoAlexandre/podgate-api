import { ICasterDocument } from 'models/ICasterModel';
import CasterRepository from 'repositories/implementations/CasterRepository';

export class GetCasterRequestsUseCase {
  constructor(private casterRepository: CasterRepository) {}

  public async execute(): Promise<ICasterDocument[]> {
    const casterClaims = await this.casterRepository.getCasterRequests();

    return casterClaims;
  }
}
