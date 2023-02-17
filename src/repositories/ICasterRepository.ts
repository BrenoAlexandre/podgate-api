import { EStatus } from '../enums';
import { ObjectId } from 'mongodb';
import { ICasterDocument, ICasterInput } from 'models/ICasterModel';

export default interface ICasterRepository {
  submitCasterRequest({
    userId,
    feedId,
    proofUrl,
  }: ICasterInput): Promise<ICasterDocument>;
  getCasterRequests(): Promise<any[] | null>;
  findPodcastCaster(feedId: ObjectId): Promise<ICasterDocument[] | null>;
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
