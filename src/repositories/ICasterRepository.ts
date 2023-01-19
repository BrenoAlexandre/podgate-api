import { EStatus } from 'enums';
import { ICasterDocument, ICasterInput } from 'models/ICasterModel';

export default interface ICasterRepository {
  submitCasterRequest({
    userId,
    feedId,
    proofUrl,
  }: ICasterInput): Promise<ICasterDocument>;
  getCasterRequests(): Promise<ICasterDocument[]>;
  replyCasterRequest(
    casterId: string,
    feedId: string,
    requestStatus: EStatus
  ): Promise<ICasterDocument | null>;
  revokeCaster(
    casterId: string,
    feedId: string
  ): Promise<ICasterDocument | null>;
}
