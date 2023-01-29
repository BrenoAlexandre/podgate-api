import { EStatus } from '../enums';
import { ISupportDocument } from 'models/ISupportModel';

export default interface ISupportRepository {
  submitSupportRequest(
    userId: string,
    feedId: string,
    receiptUrl: string
  ): Promise<ISupportDocument>;
  getSupportRequests(feedId: string): Promise<ISupportDocument[]>;
  replySupportRequest(
    supportId: string,
    feedId: string,
    requestStatus: EStatus
  ): Promise<ISupportDocument | null>;
  updateSupportReceipt(
    supportId: string,
    feedId: string,
    newReceiptUrl: string
  ): Promise<ISupportDocument | null>;
  revokeSupport(
    supportId: string,
    feedId: string
  ): Promise<ISupportDocument | null>;
}
